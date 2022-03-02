/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 */

// Import Modules
import { MOActor } from './actor.js';
import { MOItem } from './item.js';
import { MOItemSheet } from './item-sheet.js';
import { MOActorSheet } from './actor-sheet.js';
import { preloadHandlebarsTemplates } from './templates.js';
import { createWorldbuildingMacro } from './macro.js';
import { MOToken, MOTokenDocument } from './token.js';

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once('init', async function () {
  console.log(`Initializing Marching Order System`);

  /**
   * Set an initiative formula for the system. This will be updated later.
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20',
    decimals: 2,
  };

  game.marchingOrder = {
    MOActor,
    createWorldbuildingMacro,
    useEntity: foundry.utils.isNewerVersion(
      '9',
      game.version ?? game.data.version
    ),
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = MOActor;
  CONFIG.Item.documentClass = MOItem;
  CONFIG.Token.documentClass = MOTokenDocument;
  CONFIG.Token.objectClass = MOToken;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('foundryvtt-marching-order', MOActorSheet, {
    makeDefault: true,
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('foundryvtt-marching-order', MOItemSheet, {
    makeDefault: true,
  });

  // Register system settings
  game.settings.register('foundryvtt-marching-order', 'macroShorthand', {
    name: 'SETTINGS.SimpleMacroShorthandN',
    hint: 'SETTINGS.SimpleMacroShorthandL',
    scope: 'world',
    type: Boolean,
    default: true,
    config: true,
  });

  // Register initiative setting.
  game.settings.register('foundryvtt-marching-order', 'initFormula', {
    name: 'SETTINGS.SimpleInitFormulaN',
    hint: 'SETTINGS.SimpleInitFormulaL',
    scope: 'world',
    type: String,
    default: '1d20',
    config: true,
    onChange: formula => _simpleUpdateInit(formula, true),
  });

  // Retrieve and assign the initiative formula setting.
  const initFormula = game.settings.get(
    'foundryvtt-marching-order',
    'initFormula'
  );
  _simpleUpdateInit(initFormula);

  /**
   * Update the initiative formula.
   * @param {string} formula - Dice formula to evaluate.
   * @param {boolean} notify - Whether or not to post nofications.
   */
  function _simpleUpdateInit(formula, notify = false) {
    const isValid = Roll.validate(formula);
    if (!isValid) {
      if (notify)
        ui.notifications.error(
          `${game.i18n.localize(
            'MarchingOrder.NotifyInitFormulaInvalid'
          )}: ${formula}`
        );
      return;
    }
    CONFIG.Combat.initiative.formula = formula;
  }

  /**
   * Slugify a string.
   */
  Handlebars.registerHelper('slugify', function (value) {
    return value.slugify({ strict: true });
  });

  // Preload template partials
  await preloadHandlebarsTemplates();
});

/**
 * Macrobar hook.
 */
Hooks.on('hotbarDrop', (bar, data, slot) =>
  createWorldbuildingMacro(data, slot)
);

/**
 * Adds the actor template context menu.
 */
Hooks.on('getActorDirectoryEntryContext', (html, options) => {
  const idAttr = game.marchingOrder.useEntity ? 'entityId' : 'documentId';
  // Define an actor as a template.
  options.push({
    name: game.i18n.localize('MarchingOrder.DefineTemplate'),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const actor = game.actors.get(li.data(idAttr));
      return !actor.isTemplate;
    },
    callback: li => {
      const actor = game.actors.get(li.data(idAttr));
      actor.setFlag('foundryvtt-marching-order', 'isTemplate', true);
    },
  });

  // Undefine an actor as a template.
  options.push({
    name: game.i18n.localize('MarchingOrder.UnsetTemplate'),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const actor = game.actors.get(li.data(idAttr));
      return actor.isTemplate;
    },
    callback: li => {
      const actor = game.actors.get(li.data(idAttr));
      actor.setFlag('foundryvtt-marching-order', 'isTemplate', false);
    },
  });
});

/**
 * Adds the item template context menu.
 */
Hooks.on('getItemDirectoryEntryContext', (html, options) => {
  const idAttr = game.marchingOrder.useEntity ? 'entityId' : 'documentId';
  // Define an item as a template.
  options.push({
    name: game.i18n.localize('MarchingOrder.DefineTemplate'),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const item = game.items.get(li.data(idAttr));
      return !item.isTemplate;
    },
    callback: li => {
      const item = game.items.get(li.data(idAttr));
      item.setFlag('foundryvtt-marching-order', 'isTemplate', true);
    },
  });

  // Undefine an item as a template.
  options.push({
    name: game.i18n.localize('MarchingOrder.UnsetTemplate'),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const item = game.items.get(li.data(idAttr));
      return item.isTemplate;
    },
    callback: li => {
      const item = game.items.get(li.data(idAttr));
      item.setFlag('foundryvtt-marching-order', 'isTemplate', false);
    },
  });
});

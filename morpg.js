import { morpg } from './module/config.js';
import MORPGCombat from './module/MORPGCcombat.js';
import MORPGCombatTracker from './module/MORPGCombatTracker.js';
import MORPGRogueSheet from './module/sheets/MORPGRogueSheet.js';
import MORPGItemSheet from './module/sheets/MORPGItemSheet.js';
import MORPGItem from './module/MORPGItem.js';
import MORPGActor from './module/MORPGActor.js';
import MORPGMonsterSheet from './module/sheets/MORPGMonsterSheet.js';

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    // Monster sheet
    'systems/morpg/templates/partials/monster-stats.hbs',
    'systems/morpg/templates/partials/monster-actions.hbs',
    'systems/morpg/templates/partials/monster-bullshit.hbs',
    'systems/morpg/templates/partials/monster-special.hbs',
    // Inventory item
    'systems/morpg/templates/partials/monster-inventory-item.hbs',
    'systems/morpg/templates/partials/rogue-inventory-item.hbs',
    // Rogue sheet
    'systems/morpg/templates/partials/rogue-stats.hbs',
    'systems/morpg/templates/partials/rogue-actions.hbs',
    'systems/morpg/templates/partials/rogue-bullshit.hbs',
    'systems/morpg/templates/partials/rogue-top-half.hbs',
    'systems/morpg/templates/partials/rogue-equipment.hbs',
  ];

  return loadTemplates(templatePaths);
}

function registerSystemSettings() {
  //
  game.settings.register('morpg', 'name of Settings', {
    //describes setting
    config: true,
    scope: 'client', // or world. World is only for GMs and applies to everyone
    name: 'SETTINGS.placeholder', // start with SETTINGS for localization
    hint: 'SETTINGS.placeholder', // gives more details
    type: Boolean, // string, number
    default: true,
  });
}

Hooks.once('init', function () {
  console.log(`MARCHING ORDER | Initialising Marching Order system`);

  CONFIG.morpg = morpg;
  CONFIG.Item.documentClass = MORPGItem;
  CONFIG.Actor.documentClass = MORPGActor;
  CONFIG.Combat.documentClass = MORPGCombat;
  CONFIG.ui.combat = MORPGCombatTracker;

  // Tells system to use custom classes for actors and items
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('morpg', MORPGItemSheet, {
    makedefault: true,
  });

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('morpg', MORPGRogueSheet, {
    types: ['Rogue'],
    makeDefault: true,
  });
  Actors.registerSheet('morpg', MORPGMonsterSheet, {
    types: ['Monster'],
    makeDefault: true,
  });

  preloadHandlebarsTemplates();

  registerSystemSettings();

  Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
});

Hooks.on(
  'dropActorSheetData',
  function (parentActor, sheet, { type, sourceId }) {
    // console.log(`new thing added to sheet`);
    // console.log(parentActor, type, sourceId);
  }
);

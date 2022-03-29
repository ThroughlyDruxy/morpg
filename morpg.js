import { morpg } from './module/config.js';
import MORPGRogueSheet from './module/sheets/MORPGRogueSheet.js';
import MORPGItemSheet from './module/sheets/MORPGItemSheet.js';
import MORPGItem from './module/MORPGItem.js';
import MORPGActor from './module/MORPGActor.js';
import MORPGMonsterSheet from './module/sheets/MORPGMonsterSheet.js';

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    // Chat
    'systems/morpg/templates/chat/action.hbs',
    'systems/morpg/templates/chat/stat-roll.hbs',
    'systems/morpg/templates/dice/roll.hbs',
    'templates/dice/roll.html',
    // Monster sheet
    'systems/morpg/templates/partials/monster-stats.hbs',
    'systems/morpg/templates/partials/monster-actions.hbs',
    'systems/morpg/templates/partials/monster-bullshit.hbs',
    'systems/morpg/templates/partials/monster-special.hbs',
    // Inventory item
    'systems/morpg/templates/partials/inventory-item.hbs',
    // Items
    'systems/morpg/templates/sheets/action-sheet.hbs',
    'systems/morpg/templates/sheets/bullshit-sheet.hbs',
    'systems/morpg/templates/sheets/equipment-sheet.hbs',
    'systems/morpg/templates/sheets/special-sheet.hbs',
    //
  ];

  return loadTemplates(templatePaths);
}

Hooks.once('init', function () {
  console.log(`MARCHING ORDER | Initialising Marching Order system`);

  CONFIG.morpg = morpg;
  CONFIG.Item.documentClass = MORPGItem;
  CONFIG.Actor.documentClass = MORPGActor;

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

  Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
});

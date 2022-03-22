import { morpg } from './module/config.js';
import MORPGRogueSheet from './module/sheets/MORPGRogueSheet.js';
import MORPGItemSheet from './module/sheets/MORPGItemSheet.js';
import MORPGItem from './module/MORPGItem.js';
import MORPGActor from './module/MORPGActor.js';
import MORPGMonsterSheet from './module/sheets/MORPGMonsterSheet.js';

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    'systems/morpg/templates/partials/monster-stats.hbs',
    'systems/morpg/templates/partials/monster-actions.hbs',
    'systems/morpg/templates/partials/monster-bullshit.hbs',
    'systems/morpg/templates/partials/monster-special.hbs',
    'systems/morpg/templates/partials/inventory-item.hbs',
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
  Actors.registerSheet('morpg', MORPGRogueSheet, { makeDefault: true });
  Actors.registerSheet('morpg', MORPGMonsterSheet, { makeDefault: true });

  preloadHandlebarsTemplates();

  Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
});

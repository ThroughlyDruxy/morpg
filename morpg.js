import { morpg } from './module/config.js';
import MORPGItemSheet from './module/sheets/MORPGItemSheet.js';

Hooks.once('init', function () {
  console.log(`MARCHING ORDER | Initialising Marching Order system`);

  CONFIG.morpg = morpg;

  // Tells system to use custom classes for actors and items
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('morpg', MORPGItemSheet, {
    makedefault: true,
  });
});

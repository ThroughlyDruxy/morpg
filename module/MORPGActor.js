import { morpgUtilities } from './utils.js';

export default class MORPGActor extends Actor {
  async prepareDerivedData() {
    await super.prepareDerivedData();

    let actor = this.data;

    if (actor.type === 'Rogue') {
      // Get number of torches from all torch items
      actor.data.torches.quantity =
        morpgUtilities.itemManagement.numberOfTorches(actor);
      actor.data.inventory.slots.total = 
    }
  }
}

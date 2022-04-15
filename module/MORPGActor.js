import { morpgUtilities } from './utils.js';

export default class MORPGActor extends Actor {
  async prepareDerivedData() {
    await super.prepareDerivedData();

    let actor = this.data;

    if (actor.type === 'Rogue') {
      // Get number of torches from all torch items
      actor.data.torches.quantity =
        morpgUtilities.itemManagement.numberOfTorches(actor);

      // sets inventory capacity and gets current cap
      actor.data.slots = {
        current: morpgUtilities.itemManagement.inventoryCurrent(actor),
        max: actor.data.hasBackpack ? 13 : 10,
      };
    }
  }
}

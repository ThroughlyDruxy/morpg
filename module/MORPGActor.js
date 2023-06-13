import { morpgUtilities } from './utils.js';

export default class MORPGActor extends Actor {
  async prepareDerivedData() {
    await super.prepareDerivedData();

    let actor = this.system;

    if (actor.type === 'Rogue') {
      // Get number of torches from all torch items
      try {
        actor.system.torches.quantity =
          morpgUtilities.itemManagement.numberOfTorches(actor);
      } catch (error) {}

      // sets inventory capacity and gets current cap
      actor.system.slots = {
        current: morpgUtilities.itemManagement.inventoryCurrent(actor),
        max: actor.system.hasBackpack ? 13 : 10,
      };
    }
  }
}

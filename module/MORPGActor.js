import { morpgUtilities } from './utils.js';

export default class MORPGActor extends Actor {
  async prepareDerivedData() {
    console.log(`prepareDerivedData()`);
    super.prepareDerivedData();

    let actor = this.data;

    if (actor.type === 'Rogue') {
      actor.data.torches.quantity =
        morpgUtilities.itemManagement.numberOfTorches(actor);
    }
  }
}

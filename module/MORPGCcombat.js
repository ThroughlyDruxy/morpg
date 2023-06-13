/**
 *
 */

export default class MORPGCombat extends Combat {
  async rollInitiative(ids, formulaopt, updateTurnopt, messageOptionsopt) {
    console.error(`MORPG || rollInitiative called`);
    await super.rollInitiative(
      ids,
      formulaopt,
      updateTurnopt,
      messageOptionsopt
    );
  }
}

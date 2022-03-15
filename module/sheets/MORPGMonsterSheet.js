export default class MORPGMonsterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 800,
      height: 700,
      template: `systems/morpg/templates/sheets/monster-sheet.hbs`,
      classes: ['morpg', 'sheet', 'monster'],
    });
  }

  getData() {
    const baseData = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: baseData.actor,
      data: baseData.actor.data.data,
      config: CONFIG.morpg,
    };

    return sheetData;
  }
}

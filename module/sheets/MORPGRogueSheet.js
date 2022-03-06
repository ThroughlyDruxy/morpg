export default class MORPGRogueSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: `systems/morpg/templates/sheets/rogue-sheet.hbs`,
      class: ['morpg', 'sheet', 'rogue'],
    });
  }

  getData() {
    const data = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: data.actor,
      data: data.actor.data.data,
      config: CONFIG.morpg,
    };

    return sheetData;
  }
}

export default class MORPGItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 585,
      height: 300,
      classes: ['morpg', 'sheet', 'item'],
    });
  }

  get template() {
    return `systems/morpg/templates/sheets/${this.item.type}-sheet.hbs`;
  }

  getData() {
    const data = super.getData();
    /* let sheetData = {
      owner: this.item.isOwner,
      editable: this.isEditable,
      item: data.item,
      system: data.item.system,
      config: CONFIG.morpg,
    }; */
    data.config = CONFIG.morpg;

    return data;
  }
}

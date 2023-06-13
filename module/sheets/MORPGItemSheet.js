export default class MORPGItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
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
    let sheetData = {
      owner: this.item.isOwner,
      editable: this.isEditable,
      item: data.item,
      data: data.item.system,
      config: CONFIG.morpg,
    };

    return sheetData;
  }
}

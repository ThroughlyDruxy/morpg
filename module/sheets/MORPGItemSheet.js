export default class MORPGItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 500,
      height: 300,
      template: `systems/morpg/templates/sheets/item-sheet.hbs`,
      classes: ['morpg', 'sheet', 'item'],
    });
  }
  // get template() {
  //   return `systems/morpg/templates/sheets/item-sheet.hbs`;
  // }

  getData() {
    const data = super.getData();
    let sheetData = {
      owner: this.item.isOwner,
      editable: this.isEditable,
      item: data.item,
      data: data.item.data.data,
      config: CONFIG.morpg,
    };

    return sheetData;
  }
}

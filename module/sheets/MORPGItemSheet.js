export default class MORPGItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 500,
      height: 300,
      classes: ['morpg', 'sheet', 'item'],
    });
  }

  get template() {
    return `systems/morpg/templates/sheets/${this.item.data.type}-sheet.hbs`;
  }

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

// Hooks.on('preCreateItem', function (data) {
//   const itemData = data.data;
//   console.log(itemData);

//   if (itemData.type === 'Actions') {
//     data.update([{ id: 'data.id', 'data.img': 'icons/svg/sword.svg' }]);
//   } else if (itemData.type === 'Bullshit') {
//     data.update([{ 'itemData.img': 'icons/svg/hazard.svg' }]);
//   }
// });

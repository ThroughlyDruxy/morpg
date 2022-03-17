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

  /** @override */
  async _preCreate(createData, options, userId) {
    await super._preCreate(createData, options, userId);
    const updateData = {};

    console.log(`MARCHING ORDER | custom _preCreate triggered`);

    if (createData.type === 'Actions') {
      updateData.img = 'icons/svg/sword.svg';
      console.log(`Item is an Action`);
    } else if (createData.type === 'Bullshit') {
      updateData.img = 'icons/svg/hazard.svg';
      console.log(`Item is a Bullshit`);
    }

    await this.data.update(updateData);
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

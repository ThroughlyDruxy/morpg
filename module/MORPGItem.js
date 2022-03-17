export default class MORPGItem extends Item {
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

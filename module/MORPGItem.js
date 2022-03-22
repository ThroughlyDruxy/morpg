export default class MORPGItem extends Item {
  /** @override */
  async _preCreate(createData, options, userId) {
    await super._preCreate(createData, options, userId);
    const updateData = {};

    if (createData.type === 'Action') {
      updateData.img = 'icons/svg/sword.svg';
    } else if (createData.type === 'Bullshit') {
      updateData.img = 'icons/svg/hazard.svg';
    }

    await this.data.update(updateData);
  }
}

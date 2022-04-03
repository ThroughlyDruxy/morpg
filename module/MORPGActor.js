export default class MORPGActor extends Actor {
  // /**
  //  * Before an actor is created sets default values.
  //  * @override
  //  * @param {*} createData
  //  * @param {*} options
  //  * @param {*} userId
  //  */
  // async _preCreate(createData, options, userId) {
  //   await super._preCreate(createData, options, userId);
  //   const updateData = {};
  //   if (createData.type === 'Action') {
  //     updateData.img = 'icons/svg/sword.svg';
  //   } else if (createData.type === 'Bullshit') {
  //     updateData.img = 'icons/svg/hazard.svg';
  //   } else if (createData.type === 'Special') {
  //     updateData.img = 'icons/svg/explosion.svg';
  //   }
  //   await this.data.update(updateData);
}

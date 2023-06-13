export default class MORPGItem extends Item {
  /**
   * Before item is created determines image based on item type and pre-fills fields like cooldown and trigger range with zeros.
   * @override
   * @param {*} createData
   * @param {*} options
   * @param {*} userId
   */

/*   async _preCreate(createData, options, userId) {
    await super._preCreate(createData, options, userId);
    const updateData = {
      name: createData.name,
      _id: createData._id,
      system: {
        cooldown: {},
        triggerRange: {},
      },
    };

    if (createData.type === 'Action') {
      updateData.img = 'icons/svg/sword.svg';
    } else if (createData.type === 'Bullshit') {
      updateData.img = 'icons/svg/hazard.svg';
    } else if (createData.type === 'Special') {
      updateData.img = 'icons/svg/explosion.svg';
    }

    console.log(createData._id);
    await this.update(updateData);
    // await this.update(updateData);
  } */

  ** try just updating the item with the various stuff returned from another function

  /**
   * Sends template for item to chat without roll
   */
  async sendItemToChat() {
    const chatTemplate = 'systems/morpg/templates/chat/action.hbs';
    let templateData = {
      actorName: this.parent.name,
      ...this,
      owner: this.actor.id,
    };

    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: await renderTemplate(chatTemplate, templateData),
    };
    chatData.roll = true;
    ChatMessage.create(chatData);
  }
}

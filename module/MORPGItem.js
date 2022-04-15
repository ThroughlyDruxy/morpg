export default class MORPGItem extends Item {
  /**
   * Before item is created determines image based on item type and pre-fills fields like cooldown and trigger range with zeros.
   * @override
   * @param {*} createData
   * @param {*} options
   * @param {*} userId
   */
  async _preCreate(createData, options, userId) {
    await super._preCreate(createData, options, userId);
    const updateData = {
      data: {
        cooldown: {},
        triggerRange: {},
      },
    };

    if (createData.type === 'Action') {
      updateData.img = 'icons/svg/sword.svg';
      updateData.data.cooldown.min = 0;
      updateData.data.cooldown.max = 0;
      updateData.data.cooldown.value = 0;
      updateData.data.triggerRange.min = 0;
      updateData.data.triggerRange.max = 0;
    } else if (createData.type === 'Bullshit') {
      updateData.img = 'icons/svg/hazard.svg';
    } else if (createData.type === 'Special') {
      updateData.img = 'icons/svg/explosion.svg';
    } else if (createData.type === 'Equipment') {
      updateData.data.quantity = 1;
      updateData.data.cost = 0;
      updateData.data.slots = 1;
    }

    await this.data.update(updateData);
  }

  /**
   * Sends template for item to chat without roll
   */
  async sendItemToChat() {
    const chatTemplate = 'systems/morpg/templates/chat/action.hbs';
    let templateData = {
      actorName: this.parent.data.name,
      ...this.data,
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

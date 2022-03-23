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

  chatTemplate = {
    action: 'systems/morpg/templates/chat/action.hbs',
  };

  async roll() {
    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
    };
    let cardData = {
      ...this.data,
      owner: this.actor.id,
    };
    //                            should be this.chatTemplate[this.type], cardData
    chatData.content = await renderTemplate(this.chatTemplate.action, cardData);
    chatData.roll = true;
    return ChatMessage.create(chatData);
  }
}

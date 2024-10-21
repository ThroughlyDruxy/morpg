import { morpgUtilities } from '../utils.js';
import * as Dice from '../dice.js';

export default class MORPGMonsterSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 650,
      height: 600,
      template: `systems/morpg/templates/sheets/monster-sheet.hbs`,
      classes: ['morpg', 'sheet', 'monster'],
    });
  }

  getData() {
    const data = super.getData();
    /* let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: baseData.actor,
      data: baseData.actor.system,
      config: CONFIG.morpg,
    }; */
    data.config = CONFIG.morpg;

    return data;
  }

  activateListeners(html) {
    html
      .find('.item-edit')
      .click(morpgUtilities.itemManagement.editItem.bind(this));
    html
      .find('.item-delete')
      .click(morpgUtilities.itemManagement.deleteItem.bind(this));
    html
      .find('.name')
      .click(morpgUtilities.itemManagement.collapseDescription.bind(this));

    html
      .find('.item-new')
      .click(morpgUtilities.itemManagement.newItem.bind(this));

    // Owner only
    if (this.actor.isOwner) {
      html.find('.range-button').click(this._onItemRoll.bind(this));
      html.find('.stat-button').click(this._statRoll.bind(this));
      html.find('.actions-button').click(this._onActionRoll.bind(this));
      html.find('.bullshit-button').click(this._onBullshitRoll.bind(this));
    }

    super.activateListeners(html);
  }

  /**
   * Calls Dice.StatRoll() when a stat is clicked for a roll.
   * @param {*} event HTML element that is clicked
   */
  _statRoll(event) {
    const statName = event.currentTarget.innerHTML.toLowerCase();
    // const actor = this.actor;

    if (statName === 'health') {
      Dice.StatRoll({
        actor: this.actor,
        statModifier: this.actor.system.health.value,
        statName: statName,
        halfRoll: event.shiftKey,
      });
    } else {
      Dice.StatRoll({
        actor: this.actor,
        statModifier: this.actor.system[statName],
        statName: statName,
        halfRoll: event.shiftKey,
      });
    }
  }

  /**
   * Calls Dice.ActionRoll
   * @param {*} event HTML element that is clicked
   */
  _onActionRoll(event) {
    Dice.ActionRoll({ actor: this.actor });
  }

  /**
   * Calls Dice.ActionRoll
   * @param {*} event HTML element that is clicked
   */
  _onBullshitRoll(event) {
    Dice.BullshitRoll({ actor: this.actor });
  }

  /**
   * gets item ID, and prints it to chat via sendItemToChat();
   * @param {*} event HTML element that is clicked
   */
  _onItemRoll(event) {
    const element = event.currentTarget;
    const itemID = $(element).siblings('.name')[0].id;
    const item = this.actor.getEmbeddedDocument('Item', itemID);
    item.sendItemToChat();
  }
}

import { morpgUtilities } from '../utils.js';
import * as Dice from '../dice.js';

export default class MORPGMonsterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 650,
      height: 600,
      template: `systems/morpg/templates/sheets/monster-sheet.hbs`,
      classes: ['morpg', 'sheet', 'monster'],
    });
  }

  getData() {
    const baseData = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: baseData.actor,
      data: baseData.actor.data.data,
      config: CONFIG.morpg,
    };

    return sheetData;
  }

  activateListeners(html) {
    // html.find(cssSelector).event(this._someCallBack.bind(this)); // template

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

  _statRoll(event) {
    const statName = event.currentTarget.innerHTML.toLowerCase();

    if (statName === 'health') {
      Dice.StatRoll({
        statModifier: this.actor.data.data.health.value,
        halfRoll: event.shiftKey,
        maxHealth: event.altKey,
      });
    } else {
      Dice.StatRoll({
        statModifier: this.actor.data.data[statName],
        halfRoll: event.shiftKey,
      });
    }
  }

  _onActionRoll(event) {
    console.log(`_onActionRoll triggered`);
    Dice.ActionRoll();
  }

  _onBullshitRoll(event) {
    console.log(`_onBullshitRoll triggered`);
  }

  _onItemRoll(event) {
    const element = event.currentTarget;
    const itemID = $(element).siblings('.name')[0].id;
    const item = this.actor.getEmbeddedDocument('Item', itemID);
    item.roll();
  }
}

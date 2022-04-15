import { morpgUtilities } from '../utils.js';
import * as Dice from '../dice.js';

export default class MORPGRogueSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 715,
      height: 800,
      template: `systems/morpg/templates/sheets/rogue-sheet.hbs`,
      classes: ['morpg', 'sheet', 'rogue'],
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'actions',
        },
      ],
    });
  }

  getData() {
    const data = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: data.actor,
      data: data.actor.data.data,
      config: CONFIG.morpg,
    };

    return sheetData;
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
      html.find('.bullshit-button').click(this._onBullshitRoll.bind(this));
      html.find('.burn-torch').click(this._onBurnTorch.bind(this));
      html.find('.item-roll').click(this._onItemRoll.bind(this));
      html.find('.new-torch').click(this._onLightNewTorch.bind(this));
      html.find('.stat-button').click(this._onStatRoll.bind(this));
      html.find('.range-button').click(this._onItemRoll.bind(this));
    }

    //-------------------------------------//
    super.activateListeners(html);
  }

  /**
   * Calls Dice.ActionRoll
   * @param {*} event HTML element that is clicked
   */
  _onBullshitRoll(event) {
    Dice.BullshitRoll({ actor: this.actor });
  }

  /**
   * Reduces torch quantity by 1 and refills torch duration.
   * @param {*} event HTML element that is clicked
   */
  _onLightNewTorch(event) {
    // decrease torch quantity by 1 and update actor
    const updateData = {
      data: {
        torches: {
          quantity: this.actor.data.data.torches.quantity,
          duration: {
            one: this.actor.data.data.torches.duration.one,
            two: this.actor.data.data.torches.duration.two,
            three: this.actor.data.data.torches.duration.three,
            four: this.actor.data.data.torches.duration.four,
          },
        },
      },
    };

    updateData.data.torches.quantity = this.actor.data.data.torches.quantity;

    if (updateData.data.torches.quantity > 0) {
      --updateData.data.torches.quantity;
      updateData.data.torches.duration.one = true;
      updateData.data.torches.duration.two = true;
      updateData.data.torches.duration.three = true;
      updateData.data.torches.duration.four = true;
    } else {
      ui.notifications.warn(
        `${this.actor.name} ` +
          game.i18n.localize(`morpg.notifications.outOfTorches`)
      );
    }

    // get number or torch items
    morpgUtilities.itemManagement.torchItemDelete(this.actor);

    this.actor.update(updateData);
  }

  /**
   * Reduces torch duration by one or sacrifices whole torch on alt+click
   * @param {*} event HTML element that is clicked
   */
  _onBurnTorch(event) {
    const updateData = {
      data: {
        torches: {
          quantity: this.actor.data.data.torches.quantity,
          duration: {
            one: this.actor.data.data.torches.duration.one,
            two: this.actor.data.data.torches.duration.two,
            three: this.actor.data.data.torches.duration.three,
            four: this.actor.data.data.torches.duration.four,
          },
        },
      },
    };

    if (updateData.data.torches.duration.four) {
      updateData.data.torches.duration.four = false;
    } else if (updateData.data.torches.duration.three) {
      updateData.data.torches.duration.three = false;
    } else if (updateData.data.torches.duration.two) {
      updateData.data.torches.duration.two = false;
    } else if (updateData.data.torches.duration.one) {
      updateData.data.torches.duration.one = false;
    } else {
      ui.notifications.warn(
        `${this.actor.name}'s ` +
          game.i18n.localize('morpg.notifications.torchedBurnedOut')
      );
    }

    this.actor.update(updateData);
  }

  /**
   * Calls Dice.StatRoll() when a stat is clicked for a roll.
   * @param {*} event HTML element that is clicked
   */
  _onStatRoll(event) {
    let statName = event.currentTarget.innerHTML.toLowerCase();
    let statMod = 0;

    if (statName === 'health') {
      statMod = this.actor.data.data.health.value;
    } else if (statName === 'current luck') {
      statName = 'luck';
      statMod = this.actor.data.data.luck.value;
    } else {
      statMod = this.actor.data.data[statName];
    }

    Dice.StatRoll({
      actor: this.actor,
      statModifier: statMod,
      statName: statName,
      halfRoll: event.shiftKey,
    });
  }

  /**
   * gets item ID, and prints it to chat via sendItemToChat();
   * @param {*} event HTML element that is clicked
   */
  _onItemRoll(event) {
    const itemID = event.currentTarget.closest('.item').dataset.id;
    const item = this.actor.getEmbeddedDocument('Item', itemID);
    item.sendItemToChat();
  }
}

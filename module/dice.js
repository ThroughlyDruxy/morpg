import { morpgUtilities } from '/systems/morpg/module/utils.js';

/**
 * Basic stat roll for Physical Defense Health Magic and Resolve
 * @param {object} actor
 * @param {number} statModifier
 * @param {string} statName
 * @param {boolean} halfRoll
 */
export async function StatRoll({
  actor = null,
  statModifier = null,
  statName = null,
  halfRoll = false,
} = {}) {
  const chatTemplate = 'systems/morpg/templates/chat/stat-roll.hbs';

  let rollFormula = '1d6 + @statModifier';
  if (halfRoll) {
    rollFormula = 'ceil((1d6 + @statModifier)/2)';
  }

  let rollData = {
    statModifier: statModifier,
  };

  let rollResult = new Roll(rollFormula, rollData).roll({ async: false });
  let renderedRoll = await rollResult.render();

  let templateData = {
    ...actor.system,
    statName: statName,
    roll: renderedRoll,
    owner: actor.id,
  };

  let r = await new Roll('1d20').roll({ async: true });

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: await renderTemplate(chatTemplate, templateData),
    sound: CONFIG.sounds.dice,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    rolls: [r],
  };

  ChatMessage.create(chatData);
}

/**
 * Rolls and prints to chat the correct chat card with the result from the Bullshit die
 * @param {object} actor the actor that is rolling the bullshit die
 */
export async function ActionRoll({ actor = null, event = null }) {
  const chatTemplate = 'systems/morpg/templates/chat/action-roll.hbs';
  const rollResult = new Roll('1d6').roll({ async: false });
  const renderedRoll = await rollResult.render();

  let templateData = {
    actorName: actor.data.name,
    roll: renderedRoll,
    owner: actor.id,
    isBullshitResult: true, // required to show correct data and reuse template with Bullshit rolls
  };

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    sound: CONFIG.sounds.dice,
  };

  const items = actor.items;
  let itemID = '';

  if (actor.type === 'Monster') {
    itemID = morpgUtilities.rolls.randomAction(items).get(rollResult._total);
  } else if (actor.type === 'Rogue') {
    const element = event.currentTarget;
    itemID = $(element).closest('.delete-edit-actions').siblings('.name')[0].id;
  }

  templateData.item = actor.getEmbeddedDocument('Item', itemID);
  chatData.content = await renderTemplate(chatTemplate, templateData);
  ChatMessage.create(chatData);
}

/**
 * Rolls and prints to chat the correct chat card with the result from the Bullshit die
 * @param {object} actor the actor that is rolling the bullshit die
 */
export async function BullshitRoll({ actor = null }) {
  const chatTemplate = 'systems/morpg/templates/chat/action-roll.hbs';
  const rollResult = new Roll('1d6').roll({ async: false });
  const renderedRoll = await rollResult.render();

  let templateData = {
    actorName: actor.data.name,
    roll: renderedRoll,
    owner: actor.id,
  };

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    sound: CONFIG.sounds.dice,
  };

  const bullshitMap = new Map();
  const items = actor.items;

  items.forEach((item) => {
    if (item.data.type === 'Bullshit') {
      bullshitMap.set(item.system.trigger, item.data._id);
    }
  });

  const itemID = bullshitMap.get(rollResult._total);
  templateData.item = actor.getEmbeddedDocument('Item', itemID);
  if (bullshitMap.has(rollResult._total)) {
    templateData.isBullshitResult = true;
    chatData.content = await renderTemplate(chatTemplate, templateData);
  } else {
    templateData.isBullshitResult = false;
    templateData.actionType = 'Bullshit';
    chatData.content = await renderTemplate(chatTemplate, templateData);
  }
  ChatMessage.create(chatData);
}

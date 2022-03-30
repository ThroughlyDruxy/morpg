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
    ...actor.data,
    statName: statName,
    roll: renderedRoll,
    owner: actor.id,
  };

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: await renderTemplate(chatTemplate, templateData),
  };

  ChatMessage.create(chatData);
}

/**
 *
 * @param {object} param0 actor that is rolling the bullshit die
 */
export async function BullshitRoll({ actor = null }) {
  const chatTemplate = {
    bullshit: 'systems/morpg/templates/chat/action-roll.hbs',
    noBullshit: 'systems/morpg/templates/chat/no-bullshit.hbs',
  };

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
  };

  const bullshitMap = new Map();
  const items = actor.items;

  items.forEach((item) => {
    if (item.data.type === 'Bullshit') {
      bullshitMap.set(item.data.data.trigger, item.data._id);
    }
  });

  const itemID = bullshitMap.get(rollResult._total);
  templateData.item = actor.getEmbeddedDocument('Item', itemID);
  if (bullshitMap.has(rollResult._total)) {
    chatData.content = await renderTemplate(
      chatTemplate.bullshit,
      templateData
    );
  } else {
    templateData.actionType = 'Bullshit';
    chatData.content = await renderTemplate(
      chatTemplate.noBullshit,
      templateData
    );
  }
  ChatMessage.create(chatData);
}

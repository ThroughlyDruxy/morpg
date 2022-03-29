export async function StatRoll({
  actor = null,
  statModifier = null,
  statName = null,
  halfRoll = false,
} = {}) {
  const messageTemplate = 'systems/morpg/templates/chat/stat-roll.hbs';

  let rollFormula = '1d6 + @statModifier';
  if (halfRoll) {
    rollFormula = 'ceil((1d6 + @statModifier)/2)';
  }

  let rollData = {
    statModifier: statModifier,
  };

  let rollResult = new Roll(rollFormula, rollData).roll({ async: false });
  let renderedRoll = await rollResult.render();
  console.log('rollResult', rollResult);
  console.log('renderedRoll', renderedRoll);

  let templateData = {
    ...actor.data,
    statName: statName,
    roll: renderedRoll,
  };

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: await renderTemplate(messageTemplate, templateData),
  };

  ChatMessage.create(chatData);
}

export function ActionRoll() {
  let rollFormula = '1d6';
}

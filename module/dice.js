export function StatRoll({
  statModifier = null,
  halfRoll = false,
  maxHealth = false,
} = {}) {
  let rollFormula = '1d6 + @statModifier';

  if (halfRoll) {
    rollFormula = 'ceil((1d6 + @statModifier)/2)';
  }

  let rollData = {
    statModifier: statModifier,
  };
  const messageData = {
    speaker: ChatMessage.getSpeaker(),
  };
  new Roll(rollFormula, rollData).roll({ async: false }).toMessage(messageData);
}

export function ActionRoll() {
  let rollFormula = '1d6';
}

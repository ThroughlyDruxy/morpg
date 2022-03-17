export const morpg = {};

morpg.items = {
  equipment: {
    cost: 'morpg.items.equipment.cost',
    slots: 'morpg.items.equipment.slots',
    quantity: 'morpg.items.equipment.quantity',
  },
  bullshit: {
    type: {
      none: 'morpg.items.bullshit.type.none',
      quality: 'morpg.items.bullshit.type.quality',
      flaw: 'morpg.items.bullshit.type.flaw',
    },
    trigger: 'morpg.items.bullshit.trigger',
    isAttack: 'morpg.items.bullshit.isAttack',
  },
  actions: {
    cooldown: 'morpg.items.actions.cooldown',
    triggerRange: 'morpg.items.actions.triggerRange',
  },
};

morpg.stats = {
  physical: 'morpg.baseStats.physical',
  defense: 'morpg.baseStats.defense',
  health: 'morpg.baseStats.health',
  magic: 'morpg.baseStats.magic',
  resolve: 'morpg.baseStats.resolve',
};

morpg.headers = {
  special: 'morpg.special',
  actions: 'morpg.actions',
  bullshit: 'morpg.bullshit',
};

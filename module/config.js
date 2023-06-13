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
  attackTypes: {
    none: 'morpg.sheet.noAttackMod',
    physical: 'morpg.baseStats.physical',
    magic: 'morpg.baseStats.magic',
  },
};

morpg.stats = {
  aware: 'morpg.baseStats.aware',
  coin: 'morpg.baseStats.coin',
  defense: 'morpg.baseStats.defense',
  escape: 'morpg.baseStats.escape',
  health: 'morpg.baseStats.health',
  luckCurrent: 'morpg.baseStats.luckCurrent',
  luckMax: 'morpg.baseStats.luckMax',
  magic: 'morpg.baseStats.magic',
  physical: 'morpg.baseStats.physical',
  price: 'morpg.baseStats.price',
  resolve: 'morpg.baseStats.resolve',
  tinker: 'morpg.baseStats.tinker',
};

morpg.headers = {
  special: 'morpg.special',
  actions: 'morpg.actions',
  bullshit: 'morpg.bullshit',
};

morpg.sheet = {
  createItem: 'morpg.sheet.createItem',
  position: {
    // notInMarchingOrder: 'morpg.sheet.notInParty',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
  },
};

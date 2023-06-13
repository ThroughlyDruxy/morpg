// import { morpg } from './config';

export const morpgUtilities = {};

function getItemId(element) {
  return $(element).closest('.delete-edit-actions').siblings('.name')[0].id;
}

/**
 * Get the target Range for an action and put it into an array
 * @param {number} min
 * @param {number} max
 * @returns {array} rangeArr An array with all the numbers that should trigger the action
 */
function getActionRange(min, max) {
  let rangeArr = [];
  if (min === max) {
    rangeArr.push(min);
    return rangeArr;
  } else {
    for (let i = min; i <= max; i++) {
      rangeArr.push(i);
    }
    return rangeArr;
  }
}

morpgUtilities.itemManagement = {
  /**
   * Toggle the visibility of the block show/hide
   * @param event
   * @returns {*}
   */
  collapseDescription: function (event) {
    event.preventDefault();
    const element = event.currentTarget;
    const editorWrapper = $(element).closest('ul').children('.toggle-editor');
    $(editorWrapper).toggleClass('active');
    $(editorWrapper).find('.editor-content').show();
    $(editorWrapper).find('.tox-tinymce').hide();
  },
  /**
   * Delete item from actor
   * @param event
   * @returns {*}
   */
  deleteItem: async function (event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = getItemId(element);

    return await this.actor.deleteEmbeddedDocuments('Item', [itemId]);
  },
  /**
   * Edit item sheet
   * @param event
   * @returns {*}
   */
  editItem: function (event) {
    event.preventDefault();
    const element = event.currentTarget;

    const itemId = getItemId(element);
    const item = this.actor.items.get(itemId);
    item.sheet.render(true);
  },
  /**
   * Edit item sheet
   * @param event
   * @returns {*}
   */
  newItem: async function (event) {
    event.preventDefault();
    const element = event.currentTarget;
    const actor = this.actor;

    Item.createDialog(
      {},
      {
        width: 320,
        left: window.innerWidth - 630,
        top: GamepadButton.offsetTop,
        parent: actor,
      }
    );
  },
  /**
   * Returns number of torches based on quantity of torches in inventory.
   * @param {*} actor
   * @returns numberOfTorches
   */
  numberOfTorches: function (actor) {
    let numberOfTorches = 0;
    let actorItems = actor.items;

    actorItems.forEach((element) => {
      let itemName = element.data.name;
      if (
        itemName === 'Torch' ||
        itemName === 'torch' ||
        itemName === 'Torches' ||
        itemName === 'torches'
      ) {
        numberOfTorches += element.system.quantity;
      }
    });
    return numberOfTorches;
  },

  inventoryCurrent: function (actor) {
    let actorItems = actor.items;
    let occupiedSlots = 0;

    actorItems.forEach((element) => {
      if (element.type === 'Equipment') {
        occupiedSlots += element.system.quantity * element.system.slots;
      }
    });
    return occupiedSlots;
  },
};

morpgUtilities.rolls = {
  /**
   *
   * @param {*} items array of items from actor
   */
  randomAction: function (items) {
    const actionMap = new Map();
    items.forEach((item) => {
      if (item.type === 'Action') {
        const rangeArr = getActionRange(
          item.system.triggerRange.min,
          item.system.triggerRange.max
        );

        rangeArr.forEach((trigger) => {
          actionMap.set(trigger, item._id);
        });
      }
    });
    return actionMap;
  },
};

// morpgUtilities.torches = {
//   setTorches: function ({ actor = null, event = null }) {},
// };

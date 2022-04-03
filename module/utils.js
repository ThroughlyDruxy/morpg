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
};

morpgUtilities.rolls = {
  /**
   *
   * @param {*} items array of items from actor
   */
  randomAction: function (items) {
    const actionMap = new Map();
    items.forEach((item) => {
      if (item.data.type === 'Action') {
        const rangeArr = getActionRange(
          item.data.data.triggerRange.min,
          item.data.data.triggerRange.max
        );

        rangeArr.forEach((trigger) => {
          actionMap.set(trigger, item.data._id);
        });
      }
    });
    return actionMap;
  },
};

// morpgUtilities.torches = {
//   setTorches: function ({ actor = null, event = null }) {},
// };

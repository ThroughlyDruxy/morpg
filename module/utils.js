export const morpgUtilities = {};

function getItemId(element) {
  return $(element).closest('.delete-edit-actions').siblings('.name')[0].id;
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
   * TDelete item from
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

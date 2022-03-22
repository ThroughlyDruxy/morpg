export default class MORPGMonsterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 650,
      height: 600,
      template: `systems/morpg/templates/sheets/monster-sheet.hbs`,
      classes: ['morpg', 'sheet', 'monster'],
    });
  }

  getData() {
    const baseData = super.getData();
    let sheetData = {
      owner: this.actor.isOwner,
      editable: this.isEditable,
      actor: baseData.actor,
      data: baseData.actor.data.data,
      config: CONFIG.morpg,
    };

    return sheetData;
  }

  activateListeners(html) {
    // html.find(cssSelector).event(this._someCallBack.bind(this)); // template

    // deletes item from sheet
    html.find('.item-edit').click(this._editItem.bind(this));
    html.find('.item-delete').click(this._deleteItem.bind(this));
    html.find('.name').click(this._collapseDescription.bind(this));

    super.activateListeners(html);
  }

  getItemId(element) {
    return $(element).closest('.delete-edit-actions').siblings('.name')[0].id;
  }

  _editItem(event) {
    event.preventDefault();
    const element = event.currentTarget;

    const itemId = this.getItemId(element);
    const item = this.actor.items.get(itemId);
    item.sheet.render(true);
  }

  _deleteItem(event) {
    event.preventDefault();
    const element = event.currentTarget;

    this.actor.deleteEmbeddedDocuments('Item', [this.getItemId(element)]);
  }

  _collapseDescription(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const editorWrapper = $(element).closest('ul').children('.toggle-editor');
    $(editorWrapper).toggleClass('active');
    $(editorWrapper).find('.editor-content').show();
    $(editorWrapper).find('.tox-tinymce').hide();
  }
}

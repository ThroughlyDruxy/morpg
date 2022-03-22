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
    html.find('.item-delete').click(this._deleteItem.bind(this));
    html.find('.name').click(this._collapseDescription.bind(this));

    super.activateListeners(html);
  }

  _deleteItem(event) {
    event.preventDefault();
    let element = event.currentTarget;
  }

  _collapseDescription(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let editorWrapper = $(element).closest('ul').children('.actions-editor');
    $(editorWrapper).toggleClass('active');
    $(editorWrapper).find('.editor-content').show();
    $(editorWrapper).find('.tox-tinymce').hide();
  }
}

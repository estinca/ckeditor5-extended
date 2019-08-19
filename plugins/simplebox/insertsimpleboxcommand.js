import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSimpleBoxCommand extends Command {
    execute() {
        this.editor.model.change(writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent(createSimpleBox(writer));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'simpleBox');

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox(writer) {
    const simpleBox = writer.createElement('simpleBox');
    const simpleBoxTitle = writer.createElement('simpleBoxTitle');
    const simpleBoxBody = writer.createElement('simpleBoxBody');

    writer.append(simpleBoxTitle, simpleBox);
    writer.append(simpleBoxBody, simpleBox);

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement('paragraph', simpleBoxBody);

    return simpleBox;
}

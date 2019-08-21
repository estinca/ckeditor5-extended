
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertAlert extends Command {
    execute() {
        this.editor.model.change(writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent(createAlert(writer));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'alert');

        this.isEnabled = allowedIn !== null;
    }
}

function createAlert(writer) {
    const alert = writer.createElement('alert');

    const alertContent = writer.createElement('alertContent');

    writer.append(alertContent, alert);

    writer.appendElement('paragraph', alertContent);

    return alert;
}
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertContainerCommand extends Command {
    execute() {
        this.editor.model.change(writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent(createContainer(writer));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'container');

        this.isEnabled = allowedIn !== null;
    }
}

function createContainer(writer) {
    const container = writer.createElement('container');
    const content = writer.createElement('content');

    writer.append(content, container);
    
    writer.appendElement('paragraph', content);

    return container;
}

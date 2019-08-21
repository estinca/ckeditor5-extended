import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {
    toWidget, toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertContainerCommand from './insertcontainercommand';


export default class ContainerEditing extends Plugin {

    static get requires() { // ADDED
        return [Widget];
    }

    init() {
        console.log('ContainerEditing#init() got called');

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertContainer', new InsertContainerCommand(this.editor));

    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('container', {
            isObject: true,
            allowIn: '$root',
            allowWhere: '$block',
            allowContentOf: '$root'
        });

        schema.register('content', {
            isLimit: true,

            allowIn: 'container',

            allowContentOf: '$root'

            // allowContentOf: '$root'
        });

    }

    _defineConverters() { // MODIFIED
        const conversion = this.editor.conversion;

        // <container> converters
        conversion.for('upcast').elementToElement({
            model: 'container',
            view: {
                name: 'div',
                classes: 'container'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'container',
            view: {
                name: 'div',
                classes: 'container'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'container',
            view: (modelElement, viewWriter) => {
                const div = viewWriter.createContainerElement('div', {
                    class: 'container'
                });

                return toWidget(div, viewWriter, {
                    label: 'container widget'
                });
            }
        });

        conversion.for('upcast').elementToElement({
            model: 'content',
            view: {
                name: 'div',
                classes: 'content'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'content',
            view: {
                name: 'div',
                classes: 'content'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'content',
            view: (modelElement, viewWriter) => {
                const div = viewWriter.createContainerElement('div', {
                    class: 'content'
                });

                return toWidgetEditable(div, viewWriter, {
                    label: 'content widget'
                });
            }
        });

    }

}
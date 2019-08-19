import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InsertSimpleBoxCommand from './insertsimpleboxcommand';
import {
    toWidget,
    toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

export default class SimpleBoxEditing extends Plugin {

    static get requires() { // ADDED
        return [Widget];
    }


    init() {
        console.log('SimpleBoxEditing#init() got called');

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertSimpleBox', new InsertSimpleBoxCommand(this.editor));

    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('simpleBox', {
            isObject: true,

            allowWhere: '$block'
        });


        schema.register('simpleBoxTitle', {
            isLimit: true,

            allowIn: 'simpleBox',

            allowContentOf: '$block'
        });


        schema.register('simpleBoxBody', {
            isLimit: true,

            allowIn: 'simpleBox',

            allowContentOf: '$root'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('simpleBoxBody') && childDefinition.name == 'simpleBox') {
                return false;
            }
        });

    }

    _defineConverters() { // MODIFIED
        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for('upcast').elementToElement({
            model: 'simpleBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'simpleBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'simpleBox',
            view: (modelElement, viewWriter) => {
                const section = viewWriter.createContainerElement('section', {
                    class: 'simple-box'
                });

                return toWidget(section, viewWriter, {
                    label: 'simple box widget'
                });
            }
        });

        // <simpleBoxTitle> converters
        conversion.for('upcast').elementToElement({
            model: 'simpleBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'simpleBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'simpleBoxTitle',
            view: (modelElement, viewWriter) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement('h1', {
                    class: 'simple-box-title'
                });

                return toWidgetEditable(h1, viewWriter);
            }
        });

        // <simpleBoxBody> converters
        conversion.for('upcast').elementToElement({
            model: 'simpleBoxBody',
            view: {
                name: 'div',
                classes: 'simple-box-body'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'simpleBoxBody',
            view: {
                name: 'div',
                classes: 'simple-box-body'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'simpleBoxBody',
            view: (modelElement, viewWriter) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement('div', {
                    class: 'simple-box-body'
                });

                return toWidgetEditable(div, viewWriter);
            }
        });
    }
}
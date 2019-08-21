import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import {
    toWidget,
    toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import InsertAlert from "./insertalert";

export default class AlertEditing extends Plugin {

    static get requires() { // ADDED
        return [Widget];
    }

    init() {
        console.log('AlertEditing#init called');

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertAlert', new InsertAlert(this.editor));
    }

    _defineSchema() { // ADDED
        const schema = this.editor.model.schema;

        schema.register('alert', {
            isObject: true,

            allowWhere: '$block'
        });

        schema.register('alertContent', {
            isLimit: true,

            allowIn: 'alert',

            allowContentOf: '$root'

        });

    }

    _defineConverters() { // ADDED
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement({
            model: 'alert',
            view: {
                name: 'div',
                classes: ['alert', 'alert-primary']
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: 'alert',
            view: {
                name: 'div',
                classes: ['alert', 'alert-primary']
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'alert',
            view: (modelElement, viewWriter) => {
                const div = viewWriter.createContainerElement('div', {
                    class: 'alert alert-primary'
                });

                return toWidget(div, viewWriter, {
                    label: 'alert widget'
                });
            }
        });

        conversion.for('upcast').elementToElement({
            model: 'alertContent',
            view: {
                name: 'div',
                classes: 'alert-content'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'alertContent',
            view: {
                name: 'div',
                classes: 'alert-content'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'alertContent',
            view: (modelElement, viewWriter) => {
                const div = viewWriter.createContainerElement('div', {
                    class: 'alert-content'
                });

                return toWidgetEditable(div, viewWriter, {
                    label: 'alertContent widget'
                });
            }
        });

    }
}
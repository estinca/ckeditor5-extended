import  Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AlertEditing from './alertediting';
import AlertUI from './alertui';

export default class Alert extends Plugin {
    static get requires() {
        return [AlertEditing, AlertUI];
    }
}
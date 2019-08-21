import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ContainerEditing from './containerediting';
import ContainerUI from './containerui';

export default class Container extends Plugin {
    static get requires() {
        return [ContainerEditing, ContainerUI];
    }
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ContainerIcon from '../../assets/img/container.svg';
export default class ContainerUI extends Plugin {
    init() {
        console.log('Container#init() got called');

        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('container', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get('insertContainer');

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView(locale);

            buttonView.set({
            
                icon: ContainerIcon,
                // label: 'Container',
                withText: true,
                tooltip: 'Container'
            });

            // Bind the state of the button to the command.
            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () => editor.execute('insertContainer'));

            return buttonView;
        });
    }
}
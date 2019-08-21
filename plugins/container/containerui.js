import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

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
            
                icon: `<svg xmlns="http://www.w3.org/2000/svg" 
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:krita="http://krita.org/namespaces/svg/krita"
                            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                            width="184.32pt"
                            height="184.32pt"
                            viewBox="0 0 184.32 184.32"
                            class="ck ck-icon ck-button__icon">
                        <defs/>
                        <path id="border" transform="translate(18, 17.28)" fill="none" stroke="#000000" stroke-width="3.0312" 
                            stroke-linecap="square" stroke-linejoin="bevel" d="M0 0L146.88 0C146.88 49.2 146.88 98.4 146.88 147.6L0 147.6Z"/>
                        </svg>`,
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
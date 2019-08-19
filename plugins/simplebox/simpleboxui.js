import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class SimpleBoxUI extends Plugin {
    init() {
        console.log('SimpleBoxUI#init() got called');

        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('simpleBox', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get('insertSimpleBox');

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView(locale);

            buttonView.set({
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
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
                        
                        <path id="delimiter" transform="translate(19.6010005789313, 18.3282083335462)" fill="#ffffff" fill-rule="evenodd" 
                            stroke="#ffffff" stroke-width="0.216" stroke-linecap="square" stroke-linejoin="bevel" 
                            d="M0.51639 0.260468L144.331 0L144.589 145.341L0 145.862C0 145.862 0.17213 97.3282 0.51639 0.260468Z"/>                        <path id="shape2" transform="translate(17.8190914353921, 58.2938848386399)" fill="none" stroke="#000000" 
                            stroke-width="0.936" stroke-linecap="square" stroke-linejoin="bevel" 
                            d="M0 0.254558L147.644 0C147.644 0 98.4293 0.0848528 0 0.254558Z"/>

                        <path id="long-line1" transform="translate(26.9831956021652, 36.4018582180153)" fill="none" stroke="#000000" 
                            stroke-width="2.8296" stroke-linecap="square" stroke-linejoin="bevel" d="M0 0.763675L104.114 0"/>
                        <path id="long-line2" transform="translate(26.9831956021652, 82.7314959500347)" fill="none" stroke="#000000" 
                            stroke-width="2.8296" stroke-linecap="square" stroke-linejoin="bevel" d="M0 0L104.624 0"/>
                        <path id="short-line1" transform="translate(36.4018582180153, 102.332496528966)" fill="none" stroke="#000000" 
                            stroke-width="2.8296" stroke-linecap="square" stroke-linejoin="bevel" d="M0 0.509117L55.7581 0"/>
                        <path id="short-line2" transform="translate(36.4018582180153, 124.224523149591)" fill="none" stroke="#000000" 
                            stroke-width="2.8296" stroke-linecap="square" stroke-linejoin="bevel" d="M0 0L55.7581 0"/>
                        </svg>`,
                withText: true,
                tooltip: 'Simple Box'
            });

            // Bind the state of the button to the command.
            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () => editor.execute('insertSimpleBox'));

            return buttonView;
        });
    }
}
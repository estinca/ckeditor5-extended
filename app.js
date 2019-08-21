import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import SimpleBox from './plugins/simplebox/simplebox';
import Container from './plugins/container/container';
import Alert from './plugins/alert/alert';

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [
            Essentials, Paragraph, Heading, List, Bold, Italic,
            SimpleBox, Alert, Container, Alignment, FontSize, Underline,
        ],
        toolbar: [
            'heading', 
            '|',
            'alignment', 'fontSize',
            '|',
            'bold', 'italic', 'underline',
            '|',
            'numberedList', 'bulletedList',
            '|',
            'container', 'simpleBox',
            'alert',
            
        
        ],
        alignment: {
            options: ['left', 'center', 'right', 'justify']
        },
        fontSize: {
            options: ['tiny', 'small', 'default', 'big', 'huge', 'xhuge']
        }
    })
    .then(editor => {
        console.log('Editor was initialized', editor);

        CKEditorInspector.attach(editor);

        // Expose for playing in the console.
        window.editor = editor;
    })
    .catch(error => {
        console.error(error.stack);
    });
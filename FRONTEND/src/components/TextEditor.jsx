import { Editor } from '@tinymce/tinymce-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function TextEditor({ name, content, handleChange }) {
    const editorKey = import.meta.env.VITE_EDITOR_API;
    const toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video',],

        // [{ 'header': 1 }, { 'header': 2 }],              // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const modules = {
        toolbar: toolbarOptions,
    };
    return (
        // <Editor
        //     apiKey={editorKey}
        //     value={content}
        //     onEditorChange={setContent}
        //     initialValue=""
        //     init={{
        //         height: '100%',
        //         menubar: 'edit view insert format tools table help', // ← no “file”
        //         toolbar:
        //             'undo redo | blocks | bold italic underline | ' +
        //             'alignleft aligncenter alignright | bullist numlist | ' +
        //             'link image | codesample table | removeformat',
        //         branding: false,
        //         promotion: false,
        //         resize: false,
        //         plugins: [
        //              'lists', 'link', 'image', 'table',
        //             'codesample', 'charmap', 'searchreplace',
        //             'autolink', 'visualblocks', 'wordcount'
        //         ].join(' '),
        //         content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }'
        //     }}
        // />
        <div className="bg-white ">
            <ReactQuill
                preserveWhitespace={false}
                placeholder='Write something...'
                modules={modules}
                // name={name}
                onChange={(value) => handleChange({ target: { name, value } })}
                value={content}
                theme="snow"
            />
        </div >
    );
}

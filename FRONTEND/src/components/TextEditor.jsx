import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({ content, setContent }) {
    const editorKey = import.meta.env.VITE_EDITOR_API;
    return (
        <Editor
            apiKey={editorKey}
            value={content}
            onEditorChange={setContent}
            initialValue=""
            init={{
                height: '100%',
                menubar: 'edit view insert format tools table help', // ← no “file”
                toolbar:
                    'undo redo | blocks | bold italic underline | ' +
                    'alignleft aligncenter alignright | bullist numlist | ' +
                    'link image | codesample table | removeformat',
                branding: false,
                promotion: false,
                resize: false,
                plugins: [
                     'lists', 'link', 'image', 'table',
                    'codesample', 'charmap', 'searchreplace',
                    'autolink', 'visualblocks', 'wordcount'
                ].join(' '),
                autoresize_bottom_margin: 16,
                content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
}

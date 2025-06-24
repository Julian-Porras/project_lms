import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({ name, content, handleChange }) {
    const editorKey = import.meta.env.VITE_EDITOR_API;
    return (
        <Editor
            tagName={name}
            apiKey={editorKey}
            value={content}
            onEditorChange={handleChange}
            initialValue={content}
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
                content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
}

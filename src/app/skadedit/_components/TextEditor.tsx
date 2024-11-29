'use client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
      [{ size: ['extra-small', 'small', 'medium', 'large'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
};
interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}
const TextEditor = ({ value, onChange }: TextEditorProps) => {
  // const [value, setValue] = useState('');
  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </>
  );
};

export default TextEditor;

// // components/TiptapEditor.tsx
// import React from 'react';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';

// interface TiptapEditorProps {
//   value: string;
//   onChange: (html: string) => void;
// }

// const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: value,
//     onUpdate({ editor }) {
//       onChange(editor.getHTML());
//     },
//   });

//   return (
//     <div className="border rounded p-2 min-h-[200px]">
//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default TiptapEditor;
// tiptapeditor.tsx// tiptapeditor.tsx

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';

import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';


interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
  // const editor = useEditor({
  //   extensions: [StarterKit, Underline],
  //   content: value,
  //   onUpdate: ({ editor }) => {
  //     onChange(editor.getHTML());
  //   },
  // });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Editor Content:', html); // check if <ul>, <ol>, <blockquote>, <a> tags are there
      onChange(html);
    },
  });
  

  if (!editor) return <div>Loading...</div>;

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();

  const getButtonStyle = (isActive: boolean) =>
    `px-3 py-2 h-[34px] mx-2  ${isActive ? 'bg-neutral-200' : 'hover:bg-gray-100'}`;

  return (
    <div
      className="drop-shadow-sm"
      style={{
        height: 119,
        borderRadius: '8px',
        border: '1.2px solid #E5E5E7',
      }}
    >
      {/* Toolbar */}
      <div
        className="pb-2 flex justify-between"
        style={{
          // padding: '0px 20px',
          height: 34,
          backgroundColor: '#F8F9FB',
          borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
        }}
      >
        <button type="button" 
          onClick={toggleItalic}
          className={getButtonStyle(editor.isActive('italic'))}
        >
          {/* Italic Icon */}
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.41333 2.40625H12.58" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.41333 14.4062H9.58" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.5 2.40625L6.5 14.4063" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button type="button" 
          onClick={toggleBold}
          className={getButtonStyle(editor.isActive('bold'))}
        >
          {/* Bold Icon */}
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.25317 3.40621C3.25317 2.67288 3.85317 2.07288 4.58651 2.07288H7.99984C9.74651 2.07288 11.1665 3.49288 11.1665 5.23954C11.1665 6.98621 9.74651 8.40621 7.99984 8.40621H3.25317V3.40621Z" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.25317 8.40625H9.58651C11.3332 8.40625 12.7532 9.82625 12.7532 11.5729C12.7532 13.3196 11.3332 14.7396 9.58651 14.7396H4.58651C3.85317 14.7396 3.25317 14.1396 3.25317 13.4063V8.40625V8.40625Z" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button type="button" 
          onClick={toggleUnderline}
          className={getButtonStyle(editor.isActive('underline'))}
        >
          {/* Underline Icon */}
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33325 14.4062H12.6666" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33325 2.40625V7.07292C3.33325 9.65292 5.41992 11.7396 7.99992 11.7396C10.5799 11.7396 12.6666 9.65292 12.6666 7.07292V2.40625" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className='px-3 py-2 mr-2 '>
  <svg width="1" height="15" viewBox="0 0 1 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.5" y1="0.90625" x2="0.5" y2="13.9062" stroke="#9F9F9F" strokeLinecap="round"/>
</svg>

  </span>
        {/* Blockquote */}
        
  <button type="button" 
    onClick={() => editor.chain().focus().toggleBlockquote().run()}
    className={getButtonStyle(editor.isActive('blockquote'))}
  >
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99992 15.073H9.99992C13.3333 15.073 14.6666 13.7396 14.6666 10.4063V6.40629C14.6666 3.07296 13.3333 1.73962 9.99992 1.73962H5.99992C2.66659 1.73962 1.33325 3.07296 1.33325 6.40629V10.4063C1.33325 13.7396 2.66659 15.073 5.99992 15.073Z" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.66675 8.51294H6.45341C6.92675 8.51294 7.24675 8.87294 7.24675 9.30627V10.2996C7.24675 10.733 6.92675 11.093 6.45341 11.093H5.46008C5.02675 11.093 4.66675 10.733 4.66675 10.2996V8.51294" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.66675 8.51294C4.66675 6.65294 5.01341 6.3396 6.06008 5.7196" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.76001 8.51294H10.5467C11.02 8.51294 11.34 8.87294 11.34 9.30627V10.2996C11.34 10.733 11.02 11.093 10.5467 11.093H9.55334C9.12001 11.093 8.76001 10.733 8.76001 10.2996V8.51294" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.76001 8.51294C8.76001 6.65294 9.10668 6.3396 10.1533 5.7196" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  </button>

  {/* Bullet List */}
  <button type="button" 
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    className={getButtonStyle(editor.isActive('bulletList'))}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

  </button>

  {/* Ordered List */}
  <button type="button" 
    onClick={() => editor.chain().focus().toggleOrderedList().run()}
    className={getButtonStyle(editor.isActive('orderedList'))}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="17" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
</svg>

  </button>

  {/* Link */}
  <button type="button" 
    onClick={() => {
      const url = prompt('Enter a URL');
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }}
    className={getButtonStyle(editor.isActive('link'))}
  >
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.70681 7.69958C10.2068 9.19959 10.2068 11.6263 8.70681 13.1196C7.20681 14.6129 4.78014 14.6196 3.28681 13.1196C1.79347 11.6196 1.78681 9.19292 3.28681 7.69958" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.05989 9.3463C5.49989 7.7863 5.49989 5.25296 7.05989 3.6863C8.61989 2.11963 11.1532 2.1263 12.7199 3.6863C14.2866 5.2463 14.2799 7.77963 12.7199 9.3463" stroke="#9F9F9F" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  </button>

  {/* Attach / Upload placeholder */}
  {/* <button
    onClick={() => alert('You can hook this up to file/image uploader')}
    className={getButtonStyle(false)}
  >
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.13318 8.27294L7.19315 9.21294C6.67315 9.73294 6.67315 10.5796 7.19315 11.0996C7.71315 11.6196 8.55983 11.6196 9.07983 11.0996L10.5599 9.61962C11.5999 8.57962 11.5999 6.89295 10.5599 5.84628C9.51985 4.80628 7.83316 4.80628 6.7865 5.84628L5.17317 7.45961C4.27984 8.35294 4.27984 9.79961 5.17317 10.6929" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.99992 15.073H9.99992C13.3333 15.073 14.6666 13.7396 14.6666 10.4063V6.40629C14.6666 3.07296 13.3333 1.73962 9.99992 1.73962H5.99992C2.66659 1.73962 1.33325 3.07296 1.33325 6.40629V10.4063C1.33325 13.7396 2.66659 15.073 5.99992 15.073Z" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  </button> */}
      </div>

      {/* Editor content */}
      <div className="bg-white"
       style={{
        paddingBottom: '2px',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        minHeight: '83px', // Set a minimum height for the content area
        maxHeight: '83px', // Optional, set a max height if needed
        overflowY: 'auto', // Enable vertical scroll if content exceeds height
      }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;

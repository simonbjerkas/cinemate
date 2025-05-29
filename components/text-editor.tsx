'use client';

import { cn } from '@/lib/utils';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';

import { Button } from './ui/button';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

export const editorContentStyle = cn(
  'prose prose-sm',
  'prose-h1:text-xl prose-h1:pb-2 prose-h1:font-bold',
  'prose-h2:text-lg prose-h2:pb-1 prose-h2:font-bold',
  'prose-h3:text-md prose-h3:font-bold',
  'focus:outline-none min-w-full overflow-y-auto max-w-none',
  '[&>*]:!m-0 [&_*]:!m-0',
);

export const TextEditor = ({
  className,
  placeholder,
  menubar = false,
  value,
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  placeholder?: string;
  menubar?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:float-left before:text-muted-foreground before:h-0 before:pointer-events-none',
        placeholder: placeholder ?? 'Write something...',
      }),
      Underline,
    ],
    content: value ?? '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(editorContentStyle, 'min-h-full wrap-break-word'),
      },
    },
  });

  return (
    <div className="flex h-full flex-col gap-2">
      {menubar && editor && <TextEditorMenu editor={editor} />}
      <div
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex flex-1 rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'max-w-full overflow-y-auto',
          className,
        )}
        {...props}
      >
        <EditorContent className="min-h-full w-full flex-1" editor={editor} />
      </div>
    </div>
  );
};

export const TextEditorMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('bold') ? 'secondary' : 'outline'}
          aria-label="Toggle bold font."
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon />
        </Button>
      </li>
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('italic') ? 'secondary' : 'outline'}
          aria-label="Toggle italic font."
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </Button>
      </li>
      <li>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive('underline') ? 'secondary' : 'outline'}
          aria-label="Toggle underline font."
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </Button>
      </li>
    </ul>
  );
};

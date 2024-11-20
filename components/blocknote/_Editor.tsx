'use client'; // this registers <Editor> as a Client Component

import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useEffect, useState } from 'react';

// Our <Editor> component we can reuse later
export default function StaticEditor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    domAttributes: {
      editor: {
        class: '-z-10 grow py-2 ring-1 ring-mantis-500',
      },
    },
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          if (document.documentElement.classList.contains('dark')) {
            return setTheme('dark');
          }
          return setTheme('light');
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => {
      observer.disconnect();
    };
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={theme}
      className="h-full grow flex flex-col"
    />
  );
}

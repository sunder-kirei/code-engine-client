"use client";

import { Editor, EditorProps } from "@monaco-editor/react";

export default function CodeEditor(props: EditorProps) {
  return <Editor {...props} />;
}

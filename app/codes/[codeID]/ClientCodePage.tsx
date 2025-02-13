"use client";

import CodeEditor from "@/components/code/CodeEditor";
import CodeTitleInput from "@/components/code/CodeTitleInput";
import { DeleteCodeDialog } from "@/components/code/DeleteCodeDialog";
import { Page } from "@/components/ui/Page";
import { useAppSelector } from "@/store";
import { useUpdateCodeMutation } from "@/store/apiSlice";
import { GetCodeResponse } from "@/types/redux";
import { useEffect, useState } from "react";

interface ClientCodePageProps {
  codeID: string;
  initData: GetCodeResponse;
}

export function ClientCodePage({
  codeID,
  initData: data,
}: ClientCodePageProps) {
  const [updateCode] = useUpdateCodeMutation();
  const darkModeEnabled = useAppSelector(
    (state) => state.theme.darkModeEnabled
  );

  const [titleState, setTitleState] = useState(data.title);
  const [languageState, setLanguageState] = useState(data.language);
  const [codeState, setCodeState] = useState(data.content);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCode({ codeID, title: titleState });
      if (titleState) document.title = titleState;
      else document.title = "Untitled";
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeID, data.title, titleState, updateCode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCode({ codeID, language: languageState });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeID, data.language, languageState, updateCode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCode({ codeID, content: codeState });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeID, codeState, data.content, updateCode]);

  return (
    <>
      <DeleteCodeDialog codeID={codeID} />
      <Page className="flex flex-col">
        <CodeTitleInput
          setLanguageState={setLanguageState}
          setTitleState={setTitleState}
          title={titleState}
          language={languageState}
        />
        <CodeEditor
          wrapperProps={{
            className: "editor-wrapper",
          }}
          value={codeState}
          language={languageState}
          theme={darkModeEnabled ? "vs-dark" : "vs-light"}
          onChange={(value) => setCodeState(value ?? "")}
        />
      </Page>
    </>
  );
}

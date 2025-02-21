"use client";

import CodeEditor from "@/components/code/CodeEditor";
import CodeTitleInput from "@/components/code/CodeTitleInput";
import { DeleteCodeDialog } from "@/components/code/DeleteCodeDialog";
import { Page } from "@/components/ui/Page";
import { useAppSelector } from "@/store";
import { useUpdateCodeMutation } from "@/store/apiSlice";
import { GetCodeResponse } from "@/types/redux";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ClientCodePageProps {
  codeID: string;
  initData: GetCodeResponse;
}

export function ClientCodePage({
  codeID,
  initData: data,
}: ClientCodePageProps) {
  const isInitialRenderTitle = useRef(true);
  const isInitialRenderContent = useRef(true);
  const isInitialRenderLanguage = useRef(true);
  const [updateCode] = useUpdateCodeMutation();
  const darkModeEnabled = useAppSelector(
    (state) => state.theme.darkModeEnabled
  );

  const [titleState, setTitleState] = useState(data.title);
  const [languageState, setLanguageState] = useState(data.language);
  const [codeState, setCodeState] = useState(data.content);

  useEffect(() => {
    if (isInitialRenderTitle.current) {
      return;
    }
    console.log(isInitialRenderTitle.current);
    const timeout = setTimeout(() => {
      toast.promise(updateCode({ codeID, title: titleState }), {
        loading: "Saving...",
        success: "Saved!",
        error: "Error saving!",
      });
      if (titleState) document.title = titleState;
      else document.title = "Untitled";
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeID, data.title, titleState, updateCode]);

  useEffect(() => {
    if (isInitialRenderLanguage.current) {
      return;
    }

    const timeout = setTimeout(() => {
      toast.promise(updateCode({ codeID, language: languageState }), {
        loading: "Saving...",
        success: "Saved!",
        error: "Error saving!",
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeID, data.language, languageState, updateCode]);

  useEffect(() => {
    if (isInitialRenderContent.current) {
      return;
    }

    const timeout = setTimeout(() => {
      toast.promise(updateCode({ codeID, content: codeState }), {
        loading: "Saving...",
        success: "Saved!",
        error: "Error saving!",
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeID, codeState, data.content, updateCode]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        toast.promise(
          updateCode({
            codeID,
            content: codeState,
            language: languageState,
            title: titleState,
          }),
          {
            loading: "Saving...",
            success: "Saved!",
            error: "Failed to save!",
          }
        );
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [codeID, codeState, languageState, titleState, updateCode]);

  return (
    <>
      <DeleteCodeDialog codeID={codeID} />
      <Page className="flex flex-col">
        <CodeTitleInput
          setLanguageState={(value) => {
            isInitialRenderLanguage.current = false;
            setLanguageState(value);
          }}
          setTitleState={(value) => {
            isInitialRenderTitle.current = false;
            setTitleState(value);
          }}
          title={titleState}
          language={languageState}
        />
        <CodeEditor
          wrapperProps={{
            className: "editor-wrapper",
          }}
          value={codeState}
          language={languageState.toLowerCase()}
          theme={darkModeEnabled ? "vs-dark" : "vs-light"}
          onChange={(value) => {
            isInitialRenderContent.current = false;
            setCodeState(value ?? "");
          }}
          codeID={codeID}
        />
      </Page>
    </>
  );
}

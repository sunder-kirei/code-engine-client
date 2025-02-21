"use client";

import {
  useExecuteCodeMutation,
  useGetAllExecutionsQuery,
  useGetExecutionStatusQuery,
} from "@/store/apiSlice";
import { GetExecutionStatusResponse } from "@/types/redux";
import { Editor, EditorProps } from "@monaco-editor/react";
import { ChevronLeft, ChevronUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { H2 } from "../ui/H2";
import { ExecutionTile } from "./ExecutionTile";

interface CodeEditorProps extends EditorProps {
  codeID: string;
}

export default function CodeEditor({ codeID, ...props }: CodeEditorProps) {
  const [showDialog, setShowDialog] = useState(false);
  const {
    data: allExecutions,
    isLoading: allExecutionsLoading,
    isError: allExecutionsError,
  } = useGetAllExecutionsQuery(codeID);
  useGetAllExecutionsQuery(codeID);
  const [
    executeCode,
    { data: executeData, isLoading: executeLoading, isError: executeError },
  ] = useExecuteCodeMutation();
  const [latestResult, setLatestResult] = useState<
    GetExecutionStatusResponse | undefined
  >();
  const shouldFetch =
    latestResult &&
    (latestResult.executeStatus.status === "PENDING" ||
      latestResult.executeStatus.status === "COMPILING" ||
      latestResult.executeStatus.status === "COMPILED" ||
      latestResult.executeStatus.status === "RUNNING");
  const {
    data: statusUpdateData,
    isLoading: statusUpdateLoading,
    isError: statusUpdateError,
  } = useGetExecutionStatusQuery(
    { codeID, executeID: latestResult?.executeStatus.id ?? "undefined" },
    {
      skip: !shouldFetch,
      pollingInterval: 1000,
    }
  );

  useEffect(() => {
    if (executeData) {
      setLatestResult(executeData);
    }
  }, [executeData]);

  useEffect(() => {
    if (allExecutions && allExecutions.length > 0) {
      setLatestResult(allExecutions[0]);
    }
  }, [allExecutions]);

  useEffect(() => {
    if (statusUpdateData) {
      setLatestResult(statusUpdateData);
    }
  }, [statusUpdateData]);

  useEffect(() => {
    const isLg = window.innerWidth >= 1024;

    if (isLg) {
      setShowDialog(true);
    }
  }, []);

  return (
    <div className="flex flex-col grow relative overflow-hidden">
      <Editor {...props} />
      <div
        className={twMerge(
          "sm:h-full sm:w-1/2 h-[90%] w-full max-w-96 sm:left-full left-0 top-full sm:top-0 sm:-translate-x-5 absolute bg-mantis-100 dark:bg-mantis-300 transition-all duration-300 rounded-t-md sm:rounded-t-none sm:rounded-l-md group py-4 px-6 flex flex-col gap-4 dark:text-mantis-900",
          showDialog &&
            "sm:-translate-x-full sm:translate-y-0 -translate-y-full",
          !showDialog &&
            "sm:hover:-translate-x-8 -translate-y-12 sm:translate-y-0 hover:cursor-pointer hover:bg-mantis-300 dark:hover:bg-mantis-500"
        )}
        onClick={() => setShowDialog(true)}
      >
        <X
          className="absolute top-4 right-4 size-6 cursor-pointer hover:scale-150 hover:rotate-180 transition-all duration-200 text-mantis-500 dark:text-mantis-900"
          onClick={(e) => {
            e.stopPropagation();
            setShowDialog(false);
          }}
        />
        <ChevronLeft
          className={twMerge(
            "hidden sm:block absolute top-1/2 -translate-y-1/2 left-1 size-6 cursor-pointer text-mantis-500 dark:text-mantis-900 transition-all duration-200 opacity-50 hover:scale-125 hover:opacity-100",
            !showDialog && "group-hover:scale-125 group-hover:opacity-100",
            showDialog && "rotate-180"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setShowDialog((prev) => !prev);
          }}
        />
        <ChevronUp
          className={twMerge(
            "sm:hidden absolute top-3 left-1/2 -translate-x-1/2 size-6 cursor-pointer transition-all duration-200 opacity-50 hover:scale-125 hover:opacity-100",
            !showDialog && "group-hover:scale-125 group-hover:opacity-100",
            showDialog && "rotate-180"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setShowDialog((prev) => !prev);
          }}
        />
        <div
          className={twMerge(
            "w-full h-full flex flex-col transition-all duration-200 pointer-events-auto basis-1/2 shrink-0 grow-0 overflow-hidden",
            !showDialog && "opacity-0 pointer-events-none"
          )}
        >
          <H2 className="dark:text-mantis-900">Execute Code</H2>

          {(allExecutionsLoading || executeLoading || statusUpdateLoading) && (
            <div className="h-full w-full bg-mantis-200 mb-2 rounded-md grid place-items-center text-center animate-pulse"></div>
          )}
          {!allExecutionsLoading &&
            !executeLoading &&
            !latestResult &&
            !statusUpdateData && (
              <div className="h-full w-full bg-mantis-200 mb-2 rounded-md grid place-items-center text-center">
                No execution history
              </div>
            )}
          {!allExecutionsLoading &&
            !executeLoading &&
            !statusUpdateLoading &&
            latestResult && (
              <div
                className={twMerge(
                  "h-full w-full flex flex-col gap-1 overflow-hidden",
                  latestResult.executeStatus.status === "SUCCESS" &&
                    "text-green-500",
                  latestResult.executeStatus.status === "COMPILATION_ERROR" &&
                    "text-red-500",
                  latestResult.executeStatus.status === "RUNTIME_ERROR" &&
                    "text-red-500",
                  latestResult.executeStatus.status === "PENDING" &&
                    "text-yellow-500",
                  latestResult.executeStatus.status === "COMPILING" &&
                    "text-yellow-500",
                  latestResult.executeStatus.status === "COMPILED" &&
                    "text-yellow-500"
                )}
              >
                <span className="font-semibold grow-0 shrink-0 text-xl">
                  {latestResult.executeStatus.status}
                </span>
                <div className="text-ellipsis grow overflow-auto scrollbar-thin">
                  {latestResult.executeStatus.output}
                </div>
              </div>
            )}
          <button
            className="bg-mantis-300 dark:bg-mantis-500 dark:text-mantis-50 hover:dark:bg-mantis-700 hover:bg-mantis-400 py-2 px-4 rounded-full text-mantis-900 font-semibold hover:font-bold hover:text-white transition-all duration-200"
            onClick={() => executeCode(codeID)}
          >
            Execute Code
          </button>
        </div>
        <div
          className={twMerge(
            "w-full h-full transition-all duration-200 pointer-events-auto basis-1/2 shrink-0 grow-0 overflow-hidden flex flex-col",
            !showDialog && "opacity-0 pointer-events-none"
          )}
        >
          <H2 className="dark:text-mantis-900">Previous Executions</H2>
          <div
            className={twMerge(
              "w-full grow scrollbar-thin scrollbar-thumb-mantis-200 scrollbar-track-transparent",
              allExecutionsLoading || allExecutions?.length === 0
                ? "overflow-hidden"
                : "overflow-auto"
            )}
          >
            {allExecutionsLoading && (
              <div className="h-full w-full bg-mantis-200 mb-2 rounded-md grid place-items-center text-center animate-pulse"></div>
            )}
            {!allExecutionsLoading && allExecutions?.length === 0 && (
              <div className="h-full w-full bg-mantis-200 mb-2 rounded-md grid place-items-center text-center">
                No execution history
              </div>
            )}
            {(executeError || allExecutionsError || statusUpdateError) && (
              <div className="h-full w-full bg-mantis-200 mb-2 rounded-md grid place-items-center text-center">
                The Code Engine service is down, probably because I ran out of
                credits 🙃
              </div>
            )}
            {allExecutions?.slice(1).map((data) => (
              <ExecutionTile data={data} key={data.executeStatus.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

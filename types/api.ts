import { Language } from "@prisma/client";

export interface GetExecutionStatusResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: ExecutionStatus;
  output?: string;
  code: {
    code: string;
    language: Language;
  };
}

export enum ExecutionStatus {
  PENDING = "PENDING",
  COMPILING = "COMPILING",
  COMPILED = "COMPILED",
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  COMPILATION_ERROR = "COMPILATION_ERROR",
  RUNTIME_ERROR = "RUNTIME_ERROR",
}

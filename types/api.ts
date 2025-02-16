import { ExecutionStatus, Language } from "@prisma/client";

export interface GetCodeEngineExecutionStatusResponse {
  message: string;
  success: boolean;
  executeStatus: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: ExecutionStatus;
    output?: string;
    code: {
      code: string;
      language: Language;
    };
  };
}

"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("./_Editor"), { ssr: false });

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    DATABASE_URL: string;

    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;

    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;

    CLOUDINARY_URL: string;
  }
}

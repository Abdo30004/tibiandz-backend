namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;

    [key: string]: null | undefined;
  }
}

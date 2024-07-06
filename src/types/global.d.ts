namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    [key: string]: null | undefined;
  }
}

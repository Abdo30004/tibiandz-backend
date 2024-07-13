declare namespace NodeJS {
  declare interface ProcessEnv {
    MONGODB_URI: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    EMAIL_PASSWORD: string;
    EMAIL_USER: string;

    [key: string]: null | undefined;
  }
}

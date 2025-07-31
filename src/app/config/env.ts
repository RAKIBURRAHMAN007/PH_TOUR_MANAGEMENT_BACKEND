import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";

  jwt_access_secrete: string;
  jwt_access_expires: string;

  BCRYPT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRETE: string;
  JWT_REFRESH_EXPIRES: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FRONTEND_URL: string;
  EXPRESS_SESSION_SECRET: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "jwt_access_secrete",
    "jwt_access_expires",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_SECRETE",
    "JWT_REFRESH_EXPIRES",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "FRONTEND_URL",
    "EXPRESS_SESSION_SECRET",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    jwt_access_secrete: process.env.jwt_access_secrete as string,
    jwt_access_expires: process.env.jwt_access_expires as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_SECRETE: process.env.JWT_REFRESH_SECRETE as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
  };
};

export const envVars = loadEnvVariables();

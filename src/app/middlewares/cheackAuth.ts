import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = await req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "no token received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.jwt_access_secrete
      ) as JwtPayload;
      if (!verifiedToken) {
        throw new AppError(403, "not verified");
      }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "you are not permitted to this route");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

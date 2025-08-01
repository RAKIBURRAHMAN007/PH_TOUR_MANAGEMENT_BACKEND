/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    setAuthCookie(res, loginInfo);
    sendResponse(res, {
      message: "user login  successfully",
      success: true,
      statusCode: httpStatus.OK,
      data: loginInfo,
    });
  }
);
const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No refresh token received from cookies"
      );
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
    setAuthCookie(res, tokenInfo);
    sendResponse(res, {
      message: "new access token retrieved  successfully",
      success: true,
      statusCode: httpStatus.OK,
      data: tokenInfo,
    });
  }
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    sendResponse(res, {
      message: "user logout  successfully",
      success: true,
      statusCode: httpStatus.OK,
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    await AuthServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );
    sendResponse(res, {
      message: "user password changed  successfully",
      success: true,
      statusCode: httpStatus.OK,
      data: null,
    });
  }
);
const googleCallBack = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user not found");
    }
    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);
    // passport.authenticate("google", { scope: ["profile", "email"] })(req, res);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);
export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallBack,
};

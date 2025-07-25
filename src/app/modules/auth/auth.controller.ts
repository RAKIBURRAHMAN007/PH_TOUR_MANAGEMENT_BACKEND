/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    sendResponse(res, {
      message: "user login  successfully",
      success: true,
      statusCode: httpStatus.OK,
      data: loginInfo,
    });
  }
);
export const AuthControllers = {
  credentialsLogin,
};

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await userServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "USer created successfully",
//       user,
//     });
//   } catch (error: any) {
//     console.log(error);
//     next(error);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);

    sendResponse(res, {
      data: user,
      message: "user created  successfully",
      statusCode: httpStatus.CREATED,
      success: true,
    });
  }
);
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers();
    sendResponse(res, {
      message: "all user retrieved  successfully",
      success: true,
      statusCode: httpStatus.OK,
      meta: result.meta,

      data: result.data,
    });
  }
);
export const userControllers = {
  createUser,
  getAllUsers,
};

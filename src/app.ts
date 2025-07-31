/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import passport from "passport";
import "./app/config/passport";
const app = express();
app.use(
  expressSession({
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to tour management system backend",
  });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;

import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export const generateToken = (
  payload: JwtPayload,
  secrete: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secrete, {
    expiresIn: expiresIn,
  } as SignOptions);
  return token;
};
export const verifyToken = (token: string, secrete: string) => {
  const verifiedToken = jwt.verify(token, secrete);
  return verifiedToken;
};

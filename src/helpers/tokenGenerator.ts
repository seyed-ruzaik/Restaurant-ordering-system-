import * as jwt from "jsonwebtoken";
import User from "../models/user";

export const createNewToken = (user: User) => {
  return jwt.sign(
    { userId: user?.id, email: user?.email },
    String(process.env.JWT_SECRET),
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION || "1y",
    }
  );
};

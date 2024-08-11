import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../src/models/auth.schema";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    return res
      .status(401)
      .json({ message: "Anda harus login terlebih dahulu" });
  }

  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
    } catch (error) {
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        const validRefToken = await Auth.findOne({ refreshToken });

        if (!validRefToken) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const payload = jwt.decode(refreshToken) as {
          id: string;
          name: string;
          email: string;
        };

        const newAccessToken = jwt.sign(
          {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          process.env.JWT_ACCESS_KEY as string,
          { expiresIn: 30 }
        );

        // set to cookie
        return res.cookie("accessToken", newAccessToken, { httpOnly: true });
      } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
  next();
};

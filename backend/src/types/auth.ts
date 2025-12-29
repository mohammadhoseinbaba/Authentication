import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type JwtPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

const JWT_SECRET: string = (() => {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET in env");
  return s;
})();

function isJwtPayload(x: unknown): x is JwtPayload {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return typeof o.userId === "string" && typeof o.email === "string";
}

export function signAccessToken(payload: Omit<JwtPayload, "iat" | "exp">) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded: unknown = jwt.verify(token, JWT_SECRET);

    if (!isJwtPayload(decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    (req as any).user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}

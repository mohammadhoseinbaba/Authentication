import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma.js";
import { signAccessToken } from "../types/auth.js";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed, name: name ?? null},
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = signAccessToken({ userId: user.id, email: user.email });

    return res.status(201).json({ user, accessToken: token });
  } catch (e) {
    return res.status(500).json({ message: "Register failed" });
  }
}

//--------------login-------------

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signAccessToken({ userId: user.id, email: user.email });

    return res.json({
      user: { id: user.id, email: user.email, name: user.name },
      accessToken: token,
    });
  } catch {
    return res.status(500).json({ message: "Login failed" });
  }
}

//-----------------refresh handeling-----------------

export async function me(req: Request, res: Response) {
  const authUser = (req as any).user as { userId: string; email: string };

  const user = await prisma.user.findUnique({
    where: { id: authUser.userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return res.json({ user });
}

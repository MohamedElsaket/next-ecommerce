"use client";

import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters.")
    .max(50),
});

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(50),
});

export const verificationSchema = z.object({
  code: z.string().length(6),
});

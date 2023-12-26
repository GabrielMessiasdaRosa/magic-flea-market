import crypto from "crypto";

export function generateUniqueToken(): string {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

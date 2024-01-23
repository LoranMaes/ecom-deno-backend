import { crypto } from "https://deno.land/x/mongo@v0.32.0/deps.ts";

export const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
);

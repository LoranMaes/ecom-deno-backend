import {
  hash as hashPromise,
  hashSync,
  compare as comparePromise,
  compareSync,
  genSaltSync,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const isRunningInDenoDeploy = (globalThis as any).Worker === undefined;

export const hash: typeof hashPromise = isRunningInDenoDeploy
  ? (plaintext: string, salt: string | undefined = undefined) =>
      new Promise((res) => res(hashSync(plaintext, salt)))
  : hashPromise;
export const compare: typeof comparePromise = isRunningInDenoDeploy
  ? (plaintext: string, hash: string) =>
      new Promise((res) => res(compareSync(plaintext, hash)))
  : comparePromise;

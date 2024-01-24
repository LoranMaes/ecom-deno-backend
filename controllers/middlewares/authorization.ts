import { verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { key } from "../utils/apiKey.ts";
import { Context } from "https://deno.land/x/oak@v12.6.2/mod.ts";
import db from "../database/connectDB.ts";
import { ItemSchema, ShopSchema } from "../schema/shop.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

if (!db) throw Error("Could not connect to database");

const items = db.collection<ItemSchema>("items");
const shops = db.collection<ShopSchema>("shops");
const users = db.collection<ShopSchema>("users");

export const authorized = async (context: Context, next: any) => {
  try {
    const headers: Headers = context.request.headers;
    const auth = headers.get("Authorization");
    if (!auth) {
      context.response.status = 401;
      context.response.body = {
        message: `Please provide a valid token.`,
      };
      return;
    }
    const jwt = auth.split(" ")[1];
    if (!jwt) {
      context.response.status = 401;
      context.response.body = {
        message: `Please provide a valid token.`,
      };
      return;
    }
    const payload: any = await verify(jwt, key);
    if (!payload) {
      context.response.status = 401;
      context.response.body = {
        message: `Please provide a valid token.`,
      };
      return;
    }
    await next();
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      message: `Something went wrong while verifying the token.`,
    };
    console.log(error);
    return;
  }
};

export const isLoggedIn = async (context: Context, next: any) => {
  try {
    const headers: Headers = context.request.headers;
    const auth = headers.get("Authorization");

    if (!auth) {
      await next();
      return;
    }
    const jwt = auth.split(" ")[1];
    if (!jwt) {
      await next();
      return;
    }
    const payload: any = await verify(jwt, key);
    if (payload) {
      context.response.status = 401;
      context.response.body = {
        message: `You are already logged in.`,
      };
      return;
    } else {
      await next();
      return;
    }
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      message: `Something went wrong while verifying the token.`,
    };
    console.log(error);
    return;
  }
};
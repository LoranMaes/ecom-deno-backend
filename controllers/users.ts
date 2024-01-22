import db from "./database/connectDB.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { UserSchema } from "./schema/user.ts";

const users = db.collection<UserSchema>("users");

export const signup = async ({ req, res }: { req: any; res: any }) => {
  const {
    value: { username, password, email, first_name, last_name },
  } = await req.body();
  const hashedPassword = await bcrypt.hash(password);
  const created_at = new Date();
  const updated_at = new Date();
  const _id = await users.insertOne({
    username,
    password: hashedPassword,
    email,
    created_at,
    updated_at,
    first_name,
    last_name,
  });
  res.status = 201;
  res.body = {
    message: "User created",
    data: {
      _id,
      username,
    },
  };
};

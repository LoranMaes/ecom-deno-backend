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

export const signin = async ({ req, res }: { req: any; res: any }) => {
  const {
    value: { username, password },
  } = await req.body();
  const user = await users.findOne({ username });
  if (!user) {
    res.status = 401;
    res.body = {
      message: "Invalid username",
    };
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status = 401;
    res.body = {
      message: "Invalid password",
    };
    return;
  }
  res.status = 200;
  res.body = {
    message: "User logged in",
    data: {
      _id: user._id,
      username: user.username,
    },
  };
};

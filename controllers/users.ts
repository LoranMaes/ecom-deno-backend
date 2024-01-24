import db from "./database/connectDB.ts";
import { UserSchema } from "./schema/user.ts";
import { create, verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { key } from "./utils/apiKey.ts";
import { passwordTest, validateEmail } from "./utils/filters.ts";
import { genSaltSync } from "https://deno.land/x/bcrypt@v0.4.1/src/main.ts";
import { compare, hash } from "./utils/hashing.ts";

const users = db.collection<UserSchema>("users");

export const signup = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const result = await request.body({ type: "json" }).value;
  const { username, password, email, first_name, last_name } = result;
  if (!username || !password || !email || !first_name || !last_name) {
    response.status = 400;
    response.body = {
      message: `Please provide all required fields: username, password, email, first_name and last_name.`,
    };
    return;
  }
  if (!passwordTest(password)) {
    response.status = 400;
    response.body = {
      message: `Password must contain at least 8 characters, one uppercase, one lowercase and one number.`,
    };
    return;
  }
  if (!validateEmail(email)) {
    response.status = 400;
    response.body = {
      message: `Please provide a valid email address.`,
    };
    return;
  }
  const user = await users.findOne({ username });
  if (user) {
    response.status = 409;
    response.body = {
      message: `User ${username} already exists`,
    };
    return;
  }

  const salt = genSaltSync(8);
  const hashedPassword = await hash(password, salt);
  const created_at = new Date();
  const updated_at = new Date();
  let _id: any;
  try {
    _id = await users.insertOne({
      username,
      password: hashedPassword,
      email,
      created_at,
      updated_at,
      first_name,
      last_name,
    });
  } catch (error) {
    response.status = 409;
    response.body = {
      message: "User already exists",
    };
  }
  response.status = 201;
  response.body = {
    message: `User ${username} created`,
    data: {
      _id,
      username,
    },
  };
};

export const signin = async ({ req, res }: { req: any; res: any }) => {
  const body = await req.body();
  const { username, password } = await body.value;

  if (!username || !password) {
    res.status = 400;
    res.body = {
      message: `Please provide all required fields: username and password.`,
    };
    return;
  }

  const user = await users.findOne({ username });
  if (!user) {
    res.status = 404;
    res.body = {
      message: `Invalid credentials`,
    };
    return;
  }

  let passwordMatch = false;
  try {
    passwordMatch = await compare(password, user.password);
  } catch (error) {
    console.log(error);
    res.status = 500;
    res.body = {
      message: "Internal server error",
    };
    return;
  }

  if (!passwordMatch) {
    res.status = 401;
    res.body = {
      message: "Invalid credentials",
    };
    return;
  }

  const payload = {
    id: user._id,
    username: user.username,
  };
  const jwt = await create({ alg: "HS512", typ: "JWT" }, { payload }, key);

  if (jwt) {
    res.status = 200;
    res.body = {
      message: "User logged in",
      data: {
        _id: user._id,
        token: jwt,
        username: user.username,
      },
    };
  } else {
    res.status = 500;
    res.body = {
      message: "Internal server error",
    };
  }
};

export const getUser = async ({ req, res }: { req: any; res: any }) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  let payload: any;
  try {
    payload = await verify(token, key);
  } catch (error) {
    res.status = 401;
    res.body = {
      message: "Unauthorized",
    };
    return;
  }
  const user = await users.findOne({ _id: payload.id });
  if (!user) {
    res.status = 404;
    res.body = {
      message: "User not found",
    };
    return;
  }
  res.status = 200;
  res.body = {
    message: "User found",
    data: user,
  };
};

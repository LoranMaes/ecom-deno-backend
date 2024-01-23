import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

export interface UserSchema {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
}
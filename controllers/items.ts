import db from "./database/connectDB.ts";
import { ItemSchema, ShopSchema } from "./schema/shop.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const items = db.collection<ItemSchema>("items");
const shops = db.collection<ShopSchema>("shops");
const users = db.collection<ShopSchema>("users");

export const create = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body({ type: "json" }).value;
  const { name, description, price, category, sku, images, status } = body;

  if (Object.values(body).every((value) => value)) {
    const created_at = new Date();
    const updated_at = new Date();
    let _id: any;
    // const getUser = await users.findOne({ username });
    // const shop_id = await shops.findOne({owner: })
    try {
      _id = await items.insertOne({
        shop: "shopId",
        name,
        description,
        price,
        category,
        sku,
        images,
        status,
        created_at,
        updated_at,
      });
    } catch (error) {
      response.status = 500;
      response.body = {
        message: `Something went wrong while creating the item.`,
      };
      console.log(error);
      return;
    }

    response.status = 201;
    response.body = {
      message: `Item ${name} successfully created.`,
      _id,
    };
    return;
  } else {
    response.status = 400;
    response.body = {
      message: `Please provide all required fields: name, description, price, category, sku, images and status.`,
    };
    return;
  }
};

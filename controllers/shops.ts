import { verify } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import db from "./database/connectDB.ts";
import { ItemSchema, ShopSchema } from "./schema/shop.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { key } from "./utils/apiKey.ts";
import { ShopStatusEnums } from "./enums/ShopEnums.ts";

if (!db) throw Error("Could not connect to database");

const items = db.collection<ItemSchema>("items");
const shops = db.collection<ShopSchema>("shops");
const users = db.collection<ShopSchema>("users");

export const getShop = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    const shop_id =
      request.url.pathname.split("/")[
        request.url.pathname.split("/").length - 1
      ];
    if (!shop_id) {
      response.status = 400;
      response.body = {
        message: `Please provide a valid shop id.`,
      };
      return;
    }

    const shop = await shops.findOne({
      _id: new ObjectId(shop_id),
    });

    if (!shop) {
      response.status = 404;
      response.body = {
        message: `Shop not found.`,
      };
      return;
    }
    // const owner = await users.findOne({
    //   _id: new ObjectId(shop.owner),
    // });
    // console.log(owner);
    const owner = {};
    response.status = 200;
    response.body = {
      message: `Shop successfully found.`,
      data: {
        shop,
        owner,
        items: [],
      },
    };
    return;
  } catch (error) {
    response.status = 500;
    response.body = {
      message: `Something went wrong while verifying the token.`,
    };
    console.log(error);
    return;
  }
};

export const getShops = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const allShops = await shops.find().toArray();

  if (!Object.keys(allShops).length) {
    response.status = 404;
    response.body = {
      message: `There are no shops yet.`,
    };
    return;
  }

  response.status = 200;
  response.body = {
    message: `All shops successfully found.`,
    data: allShops,
  };
  return;
};

export const createShop = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  let body: any;
  let formData: any;
  try {
    body = await request.body({ type: "form-data" });
    formData = await body.value.read();
  } catch (error) {
    response.status = 500;
    response.body = {
      message: `Something went wrong while creating the shop.`,
    };
    console.log(error);
    return;
  }

  const { name, address, isPublic, description } = formData.fields;

  if (!formData.fields || !name || !address || !isPublic || !description) {
    console.log(formData);
    response.status = 400;
    response.body = {
      message: `Please provide all required fields: name, address, isPublic, description, profile_picture, banner_image.`,
    };
    return;
  }

  if (Object.values(body).every((value) => value)) {
    const created_at = new Date();
    const updated_at = new Date();
    let _id: any;

    try {
      // ownerId should be verified with JWT and then the token should be put there
      //   const payload = await verify(
      //     request.headers.get("Authorization")?.split(" ")[1] || "",
      //     key
      //   );
      //   const ownerId = await users.findOne({ _id: payload?.id });

      _id = await shops.insertOne({
        owner: "currently_not_available",
        name: formData.fields.name,
        address: formData.fields.address,
        public: formData.fields.isPublic,
        description: formData.fields.description,
        profile_picture: formData.fields.profile_picture,
        banner_image: formData.fields.banner_image,
        status: ShopStatusEnums.Requested,
        created_at,
        updated_at,
      });
    } catch (error) {
      response.status = 500;
      response.body = {
        message: `Something went wrong while creating the shop.`,
      };
      console.log(error);
      return;
    }

    response.status = 201;
    response.body = {
      message: `Shop ${name} successfully created.`,
      _id,
    };
    return;
  } else {
    response.status = 400;
    response.body = {
      message: `Please provide all required fields: name, description, owner and status.`,
    };
    return;
  }
};

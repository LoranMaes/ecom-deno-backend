import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { CategoryEnums } from "../enums/CategoryEnums.ts";
import { ItemStatusEnums, ShopStatusEnums } from "../enums/ShopEnums.ts";

export interface ShopSchema {
    owner: ObjectId;
    name: string;
    address: string;
    public: boolean;
    description: string;
    profile_picture: string;
    banner_image: string;
    status: ShopStatusEnums
    created_at: Date;
    updated_at: Date;
  }
  
  export interface ItemSchema {
    shop: ObjectId;
    name: string;
    description: string;
    price: number;
    category: CategoryEnums;
    sku: number;
    images: string[];
    status: ItemStatusEnums;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface OrderSchema {
    user: ObjectId;
    items: ObjectId[];
    created_at: Date;
    updated_at: Date;
  }
import { db } from "@/lib/db";

export const getAllProducts = async () => await db.product.findMany()


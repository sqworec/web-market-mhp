"use server"

import {getCurrentUser} from "@/lib/services/get-current-user";
import {getProductsByOrderId, getProductsFromCartByUserId} from "@/lib/services/product-service";
import {getOrderById, getOrderItemsByOrderId} from "@/lib/services/order-service";
import Container from "@/app/container";
import {Button} from "@/components/ui/button";
import * as XLSX from 'xlsx';
import InvoiceTable from "@/app/user/orders/_components/invoice-table";

export default async function OrderPage({params}: { params: { id: string } }) {
    const order = await getOrderById(params?.id)
    const orderProducts = await getOrderItemsByOrderId(order?.id!.toString()!)
    const products = await getProductsByOrderId(order?.id!)

    return(
        <>
            <InvoiceTable
                order={order!}
                orderProducts={orderProducts!}
                products={products!}
            />
        </>
    )
}
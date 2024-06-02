import {getAllOrders, getOrdersByUserId} from "@/lib/services/order-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import Container from "@/app/container";
import Link from "next/link";
import OrdersList from "@/app/user/orders/_components/orders-list";

export default async function OrdersPage() {
    const user = await getCurrentUser()
    let orders = await getOrdersByUserId(user?.id!)
    const allOrders = await getAllOrders()

    if (user?.role === "ADMIN") {
        orders = allOrders
    }

    return (
        <Container>
            <OrdersList
                orders={orders!}
            />
        </Container>
    )
}
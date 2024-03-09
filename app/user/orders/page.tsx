import {getOrdersByUserId} from "@/lib/services/order-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import Container from "@/app/container";
import Link from "next/link";

export default async function OrdersPage() {
    const user = await getCurrentUser()
    const orders = await getOrdersByUserId(user?.id!)

    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // "+1" because month indexes are zero-based
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return (
        <Container>
            <div className="flex flex-col justify-center items-center mt-20">
                <div className="w-[100%]">
                    {orders?.map(order => (
                        <Link
                            key={order?.id}
                            href={`/user/orders/${order?.id}`}
                        >
                            <div
                                key={order?.id}
                                className="p-5 mb-5 bg-white w-full rounded-xl drop-shadow-sm hover:drop-shadow-xl transition-all duration-300"
                            >
                                Заказ от {formatDate(order?.date)} на сумму {order.totalAmount} BYN
                            </div>

                        </Link>
                    ))
                    }
                </div>

            </div>
        </Container>
    )
}
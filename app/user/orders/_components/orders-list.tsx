"use client"

import {useState} from 'react';
import Container from "@/app/container";
import Link from "next/link";
import {Order} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as React from "react";

interface OrdersListProps {
    orders: Order[];
}

export default function OrdersList({orders}: OrdersListProps) {
    const [sortOrder, setSortOrder] = useState('desc');

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });

    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="w-[100%] mb-4">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={sortOrder}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Поздние</SelectItem>
                        <SelectItem value="desc">Недавние</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-[100%]">
                {sortedOrders.map(order => (
                    <Link
                        key={order?.id}
                        href={`/user/orders/${order?.id}`}
                    >
                        <div
                            key={order?.id}
                            className="p-5 mb-5 bg-white w-full rounded-xl drop-shadow-sm hover:drop-shadow-xl transition-all duration-300"
                        >
                            Заказ от {formatDate(new Date(order?.date))} на сумму {order.totalAmount.toFixed(2)} BYN
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

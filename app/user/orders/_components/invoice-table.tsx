"use client"

import {Order, OrderItem, Product} from "@prisma/client";
import {useCurrentUser} from "@/hooks/use-current-user";
import Container from "@/app/container";
import {Button} from "@/components/ui/button";

interface InvoiceTableProps {
    order: Order,
    orderProducts: OrderItem[],
    products: Product[]
}

export default function InvoiceTable({order, orderProducts, products}: InvoiceTableProps) {
    const user = useCurrentUser()

    const calculateTotal = () => {
        let totalQuantity = 0;
        let totalAmount = 0;
        let totalVatAmount = 0;

        orderProducts?.forEach(orderProduct => {
            const product = products.find(product => product.id === orderProduct.productId);
            if (product) {
                totalQuantity += orderProduct.quantity;
                totalAmount += orderProduct.totalPrice;
                totalVatAmount += orderProduct.totalPrice * 0.2;
            }
        });

        return { totalQuantity, totalAmount, totalVatAmount };
    };

    const { totalQuantity, totalAmount, totalVatAmount } = calculateTotal();

    const formatDate = (date: Date)=> {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // "+1" because month indexes are zero-based
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} г`;
    }

    const handleExport = () => {

    }

    return (
        <Container>
            <div className="mt-20 w-full h-full p-10 mb-5 bg-white rounded-xl drop-shadow-lg">
                <table className="w-full border-collapse bg-white">
                    <tbody>
                    <tr>
                        <td colSpan={3} className="border border-neutral-500 pb-3">
                            Поставщик: КУП &#34;МИНСКХЛЕБПРОМ&#34;, <br/>
                            220004 ул. Раковская, 30 <br/>
                            <br/>
                            Рассчетный счет: р/с <br/>
                            BY53BAPB12345678912345678912 <br/>
                            ОАО Белагропромбанк, код BAKBBE7C УНП <br/>
                            835923683 <br/>
                        </td>
                        <td colSpan={5} className="border border-neutral-500 text-center">
                            СЧЕТ-ФАКТУРА №1-{products.length} <br/>
                            от {formatDate(order?.date!)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} rowSpan={3} className="border border-neutral-500">Грузоотправитель: КУП &#34;МИНСКХЛЕБПРОМ&#34;</td>
                        <td colSpan={2} className="border border-neutral-500 text-center">Склад</td>
                        <td colSpan={2} className="border border-neutral-500 text-center">№ опер.</td>
                        <td colSpan={2} className="border border-neutral-500 text-center">Шифр покуп.</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-neutral-500"><br/></td>
                        <td colSpan={2} className="border border-neutral-500"><br/></td>
                        <td colSpan={2} className="border border-neutral-500"><br/></td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border border-neutral-500">Распоряжение об оплате или отказе от акцепта</td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="border border-neutral-500 pb-3">
                            Плательщик и его адрес: {user?.payerAndAddress} <br/>
                            <br/>
                            Номер счета и банк: {user?.bankAccountNumber} <br/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="border border-neutral-500 pb-3">
                            Грузополучатель: {user?.payerAndAddress} <br/>
                            <br/>
                            Дополнение: предоплата 100%
                        </td>
                    </tr>
                    <tr className="text-center border border-neutral-500">
                        <th className="py-5 border border-neutral-500">Наименование товара</th>
                        <th className="py-5 border border-neutral-500">Ед. изм</th>
                        <th className="py-5 border border-neutral-500">Кол-во</th>
                        <th className="py-5 border border-neutral-500">Цена</th>
                        <th className="py-5 border border-neutral-500">Сумма</th>
                        <th className="py-5 border border-neutral-500">Ставка НДС, %</th>
                        <th className="py-5 border border-neutral-500">Сумма НДС</th>
                        <th className="py-5 border border-neutral-500">Сумма с НДС</th>
                    </tr>
                    {orderProducts?.map((orderProduct, index) => {
                        const product = products.find(product => product.id === orderProduct.productId);
                        if (product) {
                            const vatAmount = (orderProduct.totalPrice * 0.2).toFixed(2);
                            const totalPriceWithVat = (orderProduct.totalPrice + parseFloat(vatAmount)).toFixed(2);
                            return (
                                <tr key={index} className="border border-neutral-500 hover:bg-gray-200">
                                    <td className="pl-4 pr-2 border-b border-neutral-500">{product.title}</td>
                                    <td className="text-center pr-2 border border-neutral-500">ШТ</td>
                                    <td className="text-right pr-2 border border-neutral-500">{orderProduct.quantity}</td>
                                    <td className="text-right pr-2 border border-neutral-500">{orderProduct.price.toFixed(2)}</td>
                                    <td className="text-right pr-2 border border-neutral-500">{orderProduct.totalPrice.toFixed(2)}</td>
                                    <td className="text-right pr-2 border border-neutral-500">20</td>
                                    <td className="text-right pr-2 border border-neutral-500">{vatAmount}</td>
                                    <td className="text-right pr-2 border border-neutral-500">{totalPriceWithVat}</td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    <tr className="font-bold">
                        <td className="text-right pr-2 border border-neutral-500 rounded-bl-xl" colSpan={1}>Итого:</td>
                        <td className="text-right pr-2 border border-neutral-500"></td>
                        <td className="text-right pr-2 border border-neutral-500">{totalQuantity}</td>
                        <td className="pr-2 border border-neutral-500"></td>
                        <td className="text-right pr-2 border border-neutral-500">{totalAmount.toFixed(2)}</td>
                        <td className="pr-2 border border-neutral-500"></td>
                        <td className="text-right pr-2 border border-neutral-500">{totalVatAmount.toFixed(2)}</td>
                        <td className="text-right pr-2 border border-neutral-500 rounded-br-xl">{(totalAmount + totalVatAmount).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="py-2">Сумма НДС: {totalVatAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="py-2">Общая сумма: {(totalAmount + totalVatAmount).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={8} className="pt-10">Ответственный: ____________________________</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Button
                className="mb-20"
                onClick={handleExport}
            >
                Экспорт в Excel
            </Button>
        </Container>
    )
}
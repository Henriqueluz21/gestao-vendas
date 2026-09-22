"use client";

import { ShoppingBag } from "lucide-react";

const sales = [
    {
        id: "#1024",
        product: "Teclado Mecânico",
        customer: "Cliente 01",
        value: "R$ 250,00",
        status: "Concluída",
    },
    {
        id: "#1023",
        product: "Mouse Gamer",
        customer: "Cliente 02",
        value: "R$ 180,00",
        status: "Concluída",
    },
    {
        id: "#1022",
        product: "Headset",
        customer: "Cliente 03",
        value: "R$ 420,00",
        status: "Concluída",
    },
    {
        id: "#1021",
        product: "Monitor",
        customer: "Cliente 04",
        value: "R$ 950,00",
        status: "Pendente",
    },
];

export default function RecentSales() {
    return (
        <div className="recent-sales">
            <div className="section-header">

                <div>
                    <h3>Últimas vendas</h3>
                    <p>
                        Vendas realizadas recentemente
                    </p>
                </div>

                <button className="view-all">
                    Ver todas
                </button>
            </div>

            <div className="sales-list">

                {sales.map((sale) => (

                    <div
                        className="sale-item"
                        key={sale.id}
                    >
                        <div className="sale-icon">
                            <ShoppingBag size={18} />
                        </div>

                        <div className="sale-info">
                            <strong>
                                {sale.product}
                            </strong>

                            <span>
                                {sale.id} · {sale.customer}
                            </span>
                        </div>

                        <div className="sale-value">
                            <strong>
                                {sale.value}
                            </strong>

                            <span
                                className={
                                    sale.status === "Concluída"
                                        ? "status-completed"
                                        : "status-pending"
                                }
                            >
                                {sale.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
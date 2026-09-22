"use client";

import { DollarSign, Users, ShoppingCart, Package, AlertTriangle, TrendingUp } from "lucide-react";

const cards = [
    {
        title: "Vendas hoje",
        value: "R$ 2.450,00",
        description: "+12,5% em relação a ontem",
        icon: DollarSign,
        type: "positive",
    },
    {
        title: "Pedidos",
        value: "32",
        description: "+8,2% em relação a ontem",
        icon: ShoppingCart,
        type: "positive",
    },
    {
        title: "Produtos",
        value: "148",
        description: "4 novos produtos",
        icon: Package,
        type: "normal",
    },
    {
        title: "Estoque baixo",
        value: "7",
        description: "Produtos precisam de atenção",
        icon: AlertTriangle,
        type: "warning",
    },
];

export default function DashBoardCards() {

    return (
        <div className="dashboard-cards">

            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div className="dashboard-card" key={card.title}>
                        <div className="card-top">
                            <div className={`card-icon ${card.type}`}>
                                <Icon size={21} />
                            </div>
                            {card.type === "positive" && (
                                <TrendingUp
                                    size={18}
                                    className="trend-icon"
                                />
                            )}
                        </div>

                        <div className="card-content">
                            <span className="card-title">
                                {card.title}
                            </span>
                            <strong className="card-value">
                                {card.value}
                            </strong>
                            <span className={`card-description ${card.type}`}>
                                {card.description}
                            </span>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}
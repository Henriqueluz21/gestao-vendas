"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const data = [
    {
        dia: "Seg",
        vendas: 850,
    },
    {
        dia: "Ter",
        vendas: 1200,
    },
    {
        dia: "Qua",
        vendas: 950,
    },
    {
        dia: "Qui",
        vendas: 1450,
    },
    {
        dia: "Sex",
        vendas: 1800,
    },
    {
        dia: "Sáb",
        vendas: 2200,
    },
    {
        dia: "Dom",
        vendas: 1650,
    },
];

export default function SalesChart() {
    return (
        <div className="sales-chart">
            <div className="section-header">
                <div>
                    <h3>Vendas nos últimos 7 dias</h3>
                    <p>
                        Acompanhe o desempenho das vendas
                    </p>
                </div>

                <select className="period-select">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Este mês</option>
                </select>

            </div>

            <div className="chart-container">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="dia"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="vendas"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />

                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}
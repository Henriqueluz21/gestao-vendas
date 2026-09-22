interface Venda {
    id: number;
    data: string;
    valorTotal: number;
}

interface SalesChartProps {
    vendas: Venda[];
}

export default function SalesChart({
    vendas,
}: SalesChartProps) {

    function formatarMoeda(valor: number) {
        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );
    }

    const vendasRecentes = [...vendas]
        .sort(
            (a, b) =>
                new Date(a.data).getTime() -
                new Date(b.data).getTime()
        )
        .slice(-7);

    const maiorValor = Math.max(
        ...vendasRecentes.map(
            (venda) => Number(venda.valorTotal)
        ),
        0
    );

    return (
        <div className="sales-chart">

            <div className="sales-chart-header">

                <div>
                    <h2>Vendas</h2>
                </div>

                <span className="sales-chart-total">
                    {formatarMoeda(
                        vendas.reduce(
                            (total, venda) =>
                                total +
                                Number(venda.valorTotal),
                            0
                        )
                    )}
                </span>

            </div>

            {vendasRecentes.length === 0 ? (

                <div className="sales-chart-empty">
                    Nenhuma venda registrada.
                </div>

            ) : (

                <div className="sales-chart-content">

                    <div className="sales-chart-bars">

                        {vendasRecentes.map((venda) => {

                            const valor =
                                Number(venda.valorTotal);

                            const altura =
                                maiorValor > 0
                                    ? (valor / maiorValor) * 100
                                    : 0;

                            return (
                                <div
                                    className="sales-chart-column"
                                    key={venda.id}
                                >

                                    <span className="sales-chart-value">
                                        {formatarMoeda(valor)}
                                    </span>

                                    <div className="sales-chart-bar-container">

                                        <div
                                            className="sales-chart-bar"
                                            style={{
                                                height: `${altura}%`,
                                            }}
                                        />

                                    </div>

                                    <span className="sales-chart-label">
                                        #{venda.id}
                                    </span>

                                </div>
                            );

                        })}

                    </div>

                </div>

            )}

        </div>
    );
}
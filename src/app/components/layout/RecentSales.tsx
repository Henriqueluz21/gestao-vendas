interface ItemVenda {
    produtoId: number;
    sku: string;
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
}

interface Venda {
    id: number;
    data: string;
    valorTotal: number;
    itens: ItemVenda[];
}

interface RecentSalesProps {
    vendas: Venda[];
}

export default function RecentSales({
    vendas,
}: RecentSalesProps) {

    function formatarMoeda(valor: number) {

        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );
    }

    function formatarData(data: string) {

        return new Date(data).toLocaleDateString(
            "pt-BR"
        );
    }

    // Mostra as 5 vendas mais recentes
    const vendasRecentes = [...vendas]
        .sort(
            (a, b) =>
                new Date(b.data).getTime() -
                new Date(a.data).getTime()
        )
        .slice(0, 3);

    return (

        <div className="recent-sales">
            <div className="recent-sales-header">
                <div>
                    <h2>
                        Vendas recentes
                    </h2>
                </div>
            </div>


            {vendasRecentes.length === 0 ? (

                <div className="recent-sales-empty">
                    Nenhuma venda realizada.
                </div>

            ) : (

                <div className="recent-sales-list">
                    {vendasRecentes.map((venda) => (
                        <div  className="recent-sale" key={venda.id} >
                            <div className="recent-sale-info">
                                <strong>
                                    Venda #{venda.id}
                                </strong>

                                <span>
                                    {formatarData(venda.data)}
                                </span>
                            </div>


                            <div className="recent-sale-products">

                                {venda.itens.map((item) => (
                                    <span
                                        key={item.produtoId}
                                    >
                                        {item.nomeProduto}
                                        {" "}
                                        × {item.quantidade}
                                    </span>

                                ))}
                            </div>

                            <strong className="recent-sale-value">

                                {formatarMoeda(
                                    Number(venda.valorTotal)
                                )}
                            </strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
interface DashBoardCardsProps {
    totalProdutos: number;
    totalEstoque: number;
    totalVendas: number;
    faturamento: number;
    carregando: boolean;
}

interface CardProps {
    titulo: string;
    valor: string | number;
    descricao: string;
}

function Card({
    titulo,
    valor,
    descricao,
}: CardProps) {
    return (
        <div className="dashboard-card">

            <div className="dashboard-card-content">

                <span className="dashboard-card-title">
                    {titulo}
                </span>

                <strong className="dashboard-card-value">
                    {valor}
                </strong>

                <span className="dashboard-card-description">
                    {descricao}
                </span>

            </div>

        </div>
    );
}

export default function DashBoardCards({
    totalProdutos,
    totalEstoque,
    totalVendas,
    faturamento,
    carregando,
}: DashBoardCardsProps) {

    function formatarMoeda(valor: number) {

        return valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );
    }

    if (carregando) {

        return (
            <div className="dashboard-cards">
                <Card
                    titulo="Produtos"
                    valor="..."
                    descricao="Carregando..."
                />

                <Card
                    titulo="Estoque"
                    valor="..."
                    descricao="Carregando..."
                />

                <Card
                    titulo="Vendas"
                    valor="..."
                    descricao="Carregando..."
                />

                <Card
                    titulo="Faturamento"
                    valor="..."
                    descricao="Carregando..."
                />

            </div>
        );
    }

    return (

        <div className="dashboard-cards">

            <Card
                titulo="Produtos"
                valor={totalProdutos}
                descricao="Produtos cadastrados"
            />

            <Card
                titulo="Estoque"
                valor={totalEstoque}
                descricao="Unidades em estoque"
            />

            <Card
                titulo="Vendas"
                valor={totalVendas}
                descricao="Vendas realizadas"
            />

            <Card
                titulo="Faturamento"
                valor={formatarMoeda(faturamento)}
                descricao="Total das vendas"
            />

        </div>

    );
}
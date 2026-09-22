export interface ItemVenda {
    produtoId: number;
    sku: string;
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    Subtotal: number;
}

export interface Venda {
    id: number;
    data: string;
    itens: ItemVenda[];
    valorTotal: number;
}
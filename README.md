# Gestão de Produtos, Estoque e Vendas

Aplicação web para gerenciamento de produtos, controle de estoque e registro de vendas.

O projeto foi desenvolvido com uma arquitetura separando Front-end e Back-end, utilizando Next.js no Front-end, Spring Boot na API e PostgreSQL como banco de dados.

## Funcionalidades

### Dashboard

- Visualização geral da aplicação
- Quantidade total de produtos
- Quantidade total de itens em estoque
- Informações de vendas
- Faturamento
- Gráfico de vendas
- Lista de vendas recentes
- Atualização dos dados do dashboard

### Produtos

- Cadastro de produtos
- Listagem de produtos
- Busca de produtos
- Edição de produtos
- Exclusão de produtos
- Informações de nome, SKU, descrição e preço

### Estoque

- Cadastro de entrada de estoque
- Listagem dos produtos em estoque
- Controle da quantidade disponível
- Identificação de estoque baixo
- Identificação de produtos sem estoque
- Edição de estoque
- Exclusão de estoque
- Associação entre produto e estoque

### Vendas

- Cadastro de vendas
- Seleção de produtos
- Definição da quantidade de cada produto
- Cálculo automático do subtotal
- Cálculo do valor total da venda
- Consulta dos detalhes da venda
- Exibição do nome e SKU dos produtos vendidos
- Atualização automática do estoque após uma venda
- Validação de estoque insuficiente

## Tecnologias

### Front-end

- Next.js
- React
- TypeScript
- CSS
- Fetch API

### Back-end

- Java
- Spring Boot
- Spring Data JPA
- Jakarta Validation
- Hibernate

### Banco de dados

- PostgreSQL

## Arquitetura

O projeto é dividido em duas aplicações principais:

```text
gestao-produto/
│
├── gestao-front/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   └── layout/
│   │   │   ├── produtos/
│   │   │   ├── estoque/
│   │   │   ├── vendas/
│   │   │   └── page.tsx
│   │   └── services/
│   │       └── api.ts
│   │
│   └── package.json
│
└── gestao-api/
    └── src/
        └── main/
            └── java/
                └── com/
                    └── gestao/
                        └── api/
                            ├── controller/
                            ├── dto/
                            ├── exception/
                            ├── model/
                            ├── repository/
                            └── service/

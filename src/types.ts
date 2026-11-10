interface Pessoa {
    id: number,
    nome: string,
    cpf: string
}

interface Usuario {
    id: number,
    email: string,
    senha: string
}

interface Cliente extends Pessoa {
    id: number,
    pedidos: Pedido[]
}

interface Restaurante {
    id: number,
    nomeFantasia: string
    pedidos: Pedido[],
    responsavelId: number,
}

interface Entregador extends Pessoa {
    id: number,
    pedidos: Pedido[]
}

interface Pedido {
    id: number,
    restauranteId: number,
    clienteId: number,
    entregadorId?: number | null
    status: Status,
    produtos: Produto[]
}

interface Produto {
    id: number,
    preco: number,
    descricao: string,
    categoria: 'Bebida' | 'Comida' | 'Acompanhamento'
}

type Status = 'Concluido' | 'Cancelado' | 'Pendente' | 'Entrega Andamento' | 'Aguardando Retirada' | 'Aguardando Cliente'

export type {
    Pessoa,
    Usuario,
    Cliente,
    Restaurante,
    Entregador,
    Pedido,
    Produto,
}
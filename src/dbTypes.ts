interface UsuarioDB {
    id: number,
    email: string,
    senha: string
    perfil_id: number
}

interface PerfilDB {
    id: number,
    nome: "Admin" | "Restaurante" | "Cliente" | "Entregador"
}

interface PermissoesDB {
    id: number,
    descricao: string
}

interface PerfilPermissoesDB {
    id: number,
    perfil_id: number,
    permissao_id: number
}

export type {
    UsuarioDB,
    PerfilDB,
    PermissoesDB,
    PerfilPermissoesDB
}
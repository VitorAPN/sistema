import { Pool, PoolClient, QueryResult } from "pg";
import { Usuario } from "./types";


type usuarioRequest = {
    email: string,
    senha: string
}

export default class UsuarioService {
    private client: PoolClient;
    constructor(client: PoolClient) {
        this.client = client
    }

    public async login(request: usuarioRequest): Promise<boolean> {
        const usuarioEncontrado = await this.procurarUsuarioEmail(request.email)
        if (!usuarioEncontrado || usuarioEncontrado.senha !== request.senha) {
            console.log("Usuário ou senha inválidos");
            return false;
        }
        console.log("Login efetuado com sucesso")
        return true;
    }

    public async procurarUsuarioEmail(email: string): Promise<Usuario | undefined> {
        const usuario: QueryResult<Usuario> = await this.client.query<Usuario>("SELECT * FROM usuarios WHERE email ILIKE $1", [email]);
        return usuario.rows[0]
    }

    public async cadastrar(request: usuarioRequest): Promise<void> {
        const usuarioEncontrado = await this.procurarUsuarioEmail(request.email);
        if (usuarioEncontrado) {
            console.log("Não pode cadastrar um email já inserido");
            return;
        }
        if (!request.email || !request.senha) {
            console.log("E-mail e senha devem ser preenchidos");
            return;
        }
        const usuarioId: QueryResult<{ id: number }> = await this.client.query<{ id: number }>(
            'INSERT INTO usuarios (email, senha) VALUES ($1, $2) returning id',
            [request.email, request.senha]);
        console.log(usuarioId.rows[0]);
    }

    public async listarTodos(): Promise<Usuario[]> {
        const usuarios: QueryResult<Usuario> = await this.client.query<Usuario>("SELECT * FROM usuarios ");
        return usuarios.rows;
    }
}
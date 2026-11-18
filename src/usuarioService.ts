import { Pool, PoolClient, QueryResult } from "pg";
import { Perfil, Permissoes, Usuario } from "./types";
import { PerfilDB, PermissoesDB, UsuarioDB } from "./dbTypes"


type usuarioRequest = {
    email: string,
    senha: string
}

export default class UsuarioService {
    private client: PoolClient;
    constructor(client: PoolClient) {
        this.client = client
    }

    public async login(request: usuarioRequest): Promise<Usuario> {
        const usuarioEncontrado = await this.procurarUsuarioEmail(request.email)
        if (!usuarioEncontrado || usuarioEncontrado.senha !== request.senha) {
            console.log("Usuário ou senha inválidos");
            throw new Error('Usuário não encontrado');
        }
        console.log("Login efetuado com sucesso")
        return usuarioEncontrado;
    }

    public async procurarUsuarioEmail(email: string): Promise<Usuario | undefined> {
        const usuarioResult: QueryResult<UsuarioDB> = await this.client.query<UsuarioDB>("SELECT * FROM usuarios WHERE email ILIKE $1", [email]);
        const usuarioRaw: UsuarioDB | undefined = usuarioResult.rows[0]
        if (!usuarioRaw) return undefined;
        const perfil = await this.retornarPerfil(usuarioRaw.perfil_id);
        const usuario: Usuario = {
            id: usuarioRaw.id,
            email: usuarioRaw.email,
            senha: usuarioRaw.senha,
            perfil
        }
        return usuario;
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

    public async retornarPerfil(idPerfil: number): Promise<Perfil> {
        const perfilResult: QueryResult<PerfilDB> = await this.client.query<PerfilDB>("SELECT * FROM perfis WHERE id = $1", [idPerfil]);
        const perfilRaw: PerfilDB | undefined = perfilResult.rows[0];
        if (!perfilRaw) throw new Error('Perfil nao encontrado');
        const permissoes = await this.retornarPermissoesPerfil(idPerfil)
        const perfil: Perfil = {
            id: perfilRaw.id,
            nome: perfilRaw.nome,
            permissoes: permissoes
        }
        return perfil;
    }

    public async retornarPermissoesPerfil(idPerfil: number): Promise<Permissoes[]> {
        const permissoesResult: QueryResult<PermissoesDB> = await this.client.query<PermissoesDB>(
            `
                SELECT permissoes.id, permissoes.descricao FROM permissoes
                INNER JOIN perfil_permissoes ON perfil_permissoes.permissao_id = permissoes.id 
                INNER JOIN perfis ON perfil_permissoes.perfil_id = perfis.id
                WHERE perfis.id = $1
            `,
            [idPerfil]);
        return permissoesResult.rows.length ? permissoesResult.rows : [] as Permissoes[]
    }
}
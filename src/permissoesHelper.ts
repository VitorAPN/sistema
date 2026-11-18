import { Usuario } from './types'

export default class PermissoesHelper {
    public static autoriza(usuario: Usuario, permissao: string): boolean {
        const temPermissao = usuario.perfil.permissoes.find((permissaoLocal) => {
            return permissaoLocal.descricao === permissao
        })
        return !!temPermissao
    }
}
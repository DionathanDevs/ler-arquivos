//exportação padrão, uma unica função que sera usada
export default function trataErro(erro){

    if(erro.code === 'ENOENT'){
        throw new Error('Arquivo não encontrado, verifique o caminho informado.')
        //ou return 'Arquivo não encontrado' e chamar console.log na index
    }else{
        return 'Erro na aplicação'
    }

}
//exportando função para ser usada como módulo ou seja trataErro(erro) em outro arquivo
//module.exports = trataErro;


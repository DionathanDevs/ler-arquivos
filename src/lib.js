import fs from 'fs'
import path from 'path'
import { montarSaidaArquivo } from './helpers.js';
import { contaPalavras } from './lerArquivo.js';
import trataErro from './erros/trataErros.js';

export async function processaArquivo(texto, destino){
    try{
        const textoLido = await fs.promises.readFile(texto, 'utf-8');
        const resultado = contaPalavras(textoLido);
        const arquivoNovo = `${destino}/resultado.txt`;
        const textoFinal = montarSaidaArquivo(resultado);
        await fs.promises.writeFile(arquivoNovo, textoFinal);
        return arquivoNovo;
    }catch(erro){
        console.error(trataErro(erro));
        throw erro;
    }
}
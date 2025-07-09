import fs from 'fs'
// chamando módulo do FileSystem, para interagir com os arquivos acessar/alterar/ler
//const fs = require('fs');

import trataErro from './erros/trataErros.js';
//import para chamar o modulo trata erro
//const trataErros = require('./erros/trataErros.js')
import { contaPalavras } from './lerArquivo.js';
// const que armazena em array o caminho para o arquivo atual lerArquivos.js, e passamos um outro caminho na hora de executar o codigo no terminal, nesse caso utilizar ../arquivos/arquivo.txt
const arquivoCaminho = process.argv;

//salvando o retorno do caminho digitado no terminal, no caso é o array do index 2
const link = arquivoCaminho[2]


//função do módulo filesystem, chamamos o módulo e a função de ler arquivo, passamos primeiro o caminho do arquivo, nesse caso a const link, depois disso codificacao dos caracteres e depois arrow function callback passamos os parametros err, data -> caso der err, e data o texto do arquivo
fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        //mandando o erro para frente com throw, sem o throw eu nao consigo passar para o catch o erro captado pelo parametro da funcao readfile
        if (erro) throw erro
        contaPalavras(texto)
    } catch (erro) {
        //dessa forma exibe o stack trace -> por onde ele passou ate chegar no erro, informação mais completa do que somente apontar o que é o erro. 'trataErros(erro)'
        console.log(trataErro(erro))
    }
})

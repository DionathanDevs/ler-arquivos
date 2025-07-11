import fs from 'fs'
import path from 'path'
import trataErro from './erros/trataErros.js';
import { montarSaidaArquivo } from './helpers.js';
import { contaPalavras } from './lerArquivo.js';
import { Command } from 'commander';

const program = new Command();

program
.version('0.0.1')
.option('-t, --texto <string>', 'Caminho do texto a ser processado')
.option('-d, --destino <string>', 'Caminho da pasta onde será salvo o arquivo de resultados.')
.action((options) =>{
const {texto, destino} = options;
if(!texto || !destino){
    console.error("Erro: Favor inserir caminho de origem e destino!");
    program.help();
    return;
}

const caminhoTexto = path.resolve(texto);
const caminhoDestino = path.resolve(destino);

try{
    processaArquivo(caminhoTexto, caminhoDestino);
    console.log("Texto processado com sucesso!");
}catch(erro){
    console.log("Ocorreu um erro no processamento", erro)
}
})

program.parse()

// const arquivoCaminho = process.argv;
// //salvando o retorno do caminho digitado no terminal, no caso é o array do index 2
// const link = arquivoCaminho[2]
// //salvando o 3 elemento (endereco onde quero criar mneu arquivo txt)
// const endereco = arquivoCaminho[3]

//função do módulo filesystem, chamamos o módulo e a função de ler arquivo, passamos primeiro o caminho do arquivo, nesse caso a const link, depois disso codificacao dos caracteres e depois arrow function callback passamos os parametros err, data -> caso der err, e data o texto do arquivo
function processaArquivo(texto, destino){

fs.readFile(texto, 'utf-8', (erro, texto) => {
    try {
        //mandando o erro para frente com throw, sem o throw eu nao consigo passar para o catch o erro captado pelo parametro da funcao readfile
        if (erro) throw erro
       const resultado = contaPalavras(texto);
       criaESalvaArquivo(resultado, destino );
    } catch (erro) {
        //dessa forma exibe o stack trace -> por onde ele passou ate chegar no erro, informação mais completa do que somente apontar o que é o erro. 'trataErros(erro)'
        console.log(trataErro(erro))
    }
})

}


//mais simplificado

async function criaESalvaArquivo(listaPalavras, endereco){

    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montarSaidaArquivo(listaPalavras)

    try {
        //retorna uma promessa, espera a resposta desse comando e segue o programa enquanto esse dado nao retorna
        //Promise.all() para uma lista de arquivos a serem lidos
       await fs.promises.writeFile(arquivoNovo, textoPalavras)
        console.log("Arquivo criado!")
    }catch(err){
        throw err;
    }

}


//encadea funções e metodos, o código fica um pouco mais complexo.

// function criaESalvaArquivo(listaPalavras, endereco){

//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
//     //then faz a conclusao da promessa, se foi sucesso ou nao
//     fs.promises.writeFile(arquivoNovo, textoPalavras)
//     .then(()=>{
//         //processamento feito com o resultado da promessa
//         console.log("Arquivo criado!");
//         }
//     )
//     .catch((erro) =>{
//         throw erro
//     })
//     .finally(() => {
//         console.log("Operação realizada!")
//     })
    

    

// }

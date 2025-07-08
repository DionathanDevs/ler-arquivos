//biblioteca reutilizavel que resolve unm problema ou necessidade
//qlq pessoa


// chamando módulo do FileSystem, para interagir com os arquivos acessar/alterar/ler
const fs = require('fs');


const trataErros = require('../erros/trataErros.js')

// const que armazena em array o caminho para o arquivo atual lerArquivos.js, e passamos um outro caminho na hora de executar o codigo no terminal, nesse caso utilizar ../arquivos/arquivo.txt
const arquivoCaminho = process.argv;

//salvando o retorno do caminho digitado no terminal, no caso é o array do index 2

const link = arquivoCaminho[2]


//função do módulo filesystem, chamamos o módulo e a função de ler arquivo, passamos primeiro o caminho do arquivo, nesse caso a const link, depois disso codificacao dos caracteres e depois arrow function callback passamos os parametros err, data -> caso der err, e data o texto do arquivo
fs.readFile(link, 'utf-8', (erro, texto) => {
    
    try {
        //mandando o erro para frente com throw, sem o throw eu nao consigo passar para o catch o erro captado pelo parametro da funcao readfile
        if(erro) throw erro
        contaPalavras(texto)
    } catch(erro){
        //dessa forma exibe o stack trace -> por onde ele passou ate chegar no erro, informação mais completa do que somente apontar o que é o erro. 'trataErros(erro)'
        trataErros(erro)
    }
})

function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto)
    //metodo flat 
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (paragrafo == '\r' || '') return [];
        return verificarDuplicadas(paragrafo)
    })

    console.log(contagem)
}

function extraiParagrafos(texto) {
    // resolvendo dois problemas, quebrar por paragrafo e deixar todas as letras minusculas, para ordernar da forma correta.
    return texto.toLowerCase().split('\n')
}


function limpaPalavra(palavra) {
    return palavra.replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, "")
}

//function para verificar palavras duplicadas
function verificarDuplicadas(texto) {
    // array que adiciona o texto separando os dados por espaço, ou seja pra cada palavra sera armazenado dentro de um array. 
    const arrayPalavras = texto.split(' ')

    //criando o objeto que ira armazernar os dados palavra e contagem.
    const resultado = {}

    //utilizamos foreach no arraypalavras, para cada elemento do array, adicionar no objeto e realizar a contagem.
    arrayPalavras.forEach(palavra => {
        //chamando a funcao limpar palavra, armazenando na constante, limpando tambem os espaços no final ou \r
        const palavraLimpa = limpaPalavra(palavra).trim()
        //se existir um valor ele soma + 1, se não existir é undefined, null, 0, false, etc., ele usa o 0 + 1.
        resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;

    });

    return resultado;

}



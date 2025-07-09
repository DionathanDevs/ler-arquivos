//biblioteca reutilizavel que resolve unm problema ou necessidade
//qlq pessoa

// exportando do função de contar palavras
export function contaPalavras(texto) {
    //chamamos a funcao de separar por paragrafos
    const paragrafos = extraiParagrafos(texto)
    //metodo flat - filtramos e utilizamos o map pra armazernar em contagem o novo array com os filtros sem objetos com espaço ou \r na verificação, se verdadeiro retorna array vazio, ou seja nada, apos isso chamamos a função de verificar as palavras do paragrafo para ver se tem alguma duplicada.
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (paragrafo == '\r' || '') return [];
        return verificarDuplicadas(paragrafo)
    })
    //exibir o array de objetos
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



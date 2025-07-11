// helpers functions são funçoes mais simples, que não tem muita relação com a funcionalidade principal

function filtraOcorrencias(paragrafo) {
    //acessnado as chaves do objeto paragrafo, pegando as chaves e acessando cada chave dela, verificando se o valor é maior que 1, se for a gente filtra.
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1);

}

function montarSaidaArquivo(listaPalavras) {
    let textoFinal = "";

    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtraOcorrencias(paragrafo).join(', ');
        if (duplicadas != '') {
            textoFinal += `Palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas} \n`
        } else {
            textoFinal += `Palavras duplicadas no parágrafo ${indice + 1}: Nenhuma palavra duplicada.\n`
        }

    });

    return textoFinal;
}

export { montarSaidaArquivo }


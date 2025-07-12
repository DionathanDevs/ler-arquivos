
const dropzone = document.getElementById('dropzone');
const input = document.getElementById('arquivoInput');
const nome = document.getElementById('nomeArquivo');

dropzone.addEventListener('click', () => input.click());


input.addEventListener('change', () => {
    if (input.files.length > 0) {
        nome.textContent = 'Arquivo adicionado: ' + input.files[0].name;
        // dropzone.style.display = 'none';
    } else {
        nome.textContent = 'Nenhum arquivo selecionado';
        // dropzone.style.display = 'flex';
    }
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, e => e.preventDefault());
});

// Estilizar ao arrastar
dropzone.addEventListener('dragover', () => {
    dropzone.style.borderColor = '#ff6600';
});
dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = '#ccc';
});

// Capturar arquivo solto
dropzone.addEventListener('drop', e => {
    const arquivo = e.dataTransfer.files[0];
    if (arquivo) {
        input.files = e.dataTransfer.files;
        nome.textContent = arquivo.name;
    }
});

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const resposta = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const blob = await resposta.blob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.classList.add('btn-download')

    link.href = url;

    link.download = 'resultado.txt';

    link.textContent = 'Baixe aqui'

    document.getElementById('resultado').innerHTML = '';

    document.getElementById('resultado').appendChild(link)

    // const input = document.getElementById('arquivoInput');
    // const nome = document.getElementById('nomeArquivo');

});


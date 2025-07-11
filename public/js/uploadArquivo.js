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

    link.textContent = 'Clique aqui para baixar o resultado'

    document.getElementById('resultado').innerHTML = '';
    
    document.getElementById('resultado').appendChild(link)

    
});
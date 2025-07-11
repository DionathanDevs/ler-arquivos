import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { processaArquivo } from './src/lib.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();

const upload = multer({dest: 'uploads/'});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('arquivo'), async (req, res) => {
    const entrada = req.file.path;
    const destino = path.join(__dirname, 'resultados');


    try{
        const resultadoPath = await processaArquivo(entrada, destino);
        res.download(resultadoPath, 'resultado.txt', () =>{
            fs.unlinkSync(entrada);
            fs.unlinkSync(resultadoPath);

        });
    }catch(erro){
        res.status(500).send("Erro no processamento do arquivo.")
    }

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Servidor roteando na porta ${PORT}`);
})
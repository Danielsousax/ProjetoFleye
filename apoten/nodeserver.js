const express = require('express');
const app = express();

const path = __dirname + '/build'

const PORT = 3000;

app.use(express.static(path));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`);
});
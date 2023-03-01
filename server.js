// Importar as dependências necessárias
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Definir a rota principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Iniciar o servidor
server.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

// Definir um array para armazenar as conexões
let conexoes = [];

// Quando um novo usuário se conectar
io.on("connection", (socket) => {
  console.log("Nova conexão: " + socket.id);

  // Adicionar a conexão ao array
  conexoes.push(socket);

  // Quando um usuário enviar uma mensagem
  socket.on("enviarMensagem", (mensagem) => {
    console.log("Mensagem recebida: " + mensagem);

    // Enviar a mensagem para todos os usuários conectados
    for (let conexao of conexoes) {
      conexao.emit("novaMensagem", mensagem);
    }
  });

  // Quando um usuário desconectar
  socket.on("disconnect", () => {
    console.log("Conexão encerrada: " + socket.id);

    // Remover a conexão do array
    conexoes = conexoes.filter((conexao) => conexao !== socket);
  });
});

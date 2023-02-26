// cria uma conexão com o servidor
const socket = io.connect("http://localhost:3000");

// seleciona os elementos do DOM
const messageList = document.querySelector("#chat-messages");
const messageForm = document.querySelector("#chat-form");
const messageInput = document.querySelector("#chat-input");

// adiciona um evento de envio de mensagem ao formulário
messageForm.addEventListener("submit", (event) => {
  event.preventDefault(); // impede o formulário de recarregar a página

  const message = messageInput.value.trim(); // remove espaços em branco extras
  if (message !== "") {
    socket.emit("message", message); // envia a mensagem para o servidor
    messageInput.value = ""; // limpa o campo de entrada
  }
});

// adiciona um evento de recebimento de mensagem
socket.on("message", (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageList.appendChild(messageElement);
});

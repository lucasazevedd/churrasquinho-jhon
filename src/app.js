document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.getElementById("chat-box");
  const userInput = document.getElementById("input-user-message");
  let currentStep = 0;

  // Função para exibir mensagens enviadas pelo bot
  function displayBotMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    // Adiciona a imagem do bot
    const botImage = document.createElement("img");
    botImage.src = "/assets/chef-icon.png";
    botImage.alt = "Bot";
    botImage.classList.add("message-bot-img");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "bot");
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    // Adiciona a imagem do bot na div da mensagem e a mensagem na div do container
    messageDiv.appendChild(botImage);
    messagesContainer.appendChild(messageContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Função para exibir mensagens enviadas pelo usuário
  function displayUserMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    // Adiciona a imagem do usuário
    const userImage = document.createElement("img");
    userImage.src = "/assets/user-icon.png";
    userImage.alt = "user profile";
    userImage.classList.add("message-bot-img");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "user");
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    messageDiv.appendChild(userImage);

    messagesContainer.appendChild(messageContainer);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Função para iniciar o chatbot
  function startChat() {
    displayBotMessage(
      "Olá! Bem-vindo ao ChurrasBot! 🔥 Queremos saber sua opinião sobre nossa comida e atendimento. Vamos começar?"
    );
    displayBotMessage("Opções:\n✅ Sim\n❌ Não");
    currentStep = 1;
  }

  // Função para tratar a escolha do usuário e seguir para a próxima pergunta
  function userChoice(choice) {
    choice = choice.toLowerCase().trim(); // Normaliza a resposta do usuário

    switch (currentStep) {
      case 1:
        if (choice === "sim") {
          displayBotMessage(
            "Ótimo! Primeira pergunta:\n\n Como você está avaliando a carne? 🥩"
          );
          displayBotMessage("Opções:\n⭐ 1\n⭐ 2\n⭐ 3\n⭐ 4\n⭐ 5");
          currentStep = 2;
        } else if (choice === "não" || choice === "não quero") {
          displayBotMessage(
            "Sem problemas! Se quiser avaliar depois, ficaremos por aqui. Bom apetite! 🍽️"
          );
          currentStep = 0;
        } else {
          displayBotMessage(
            "Opção inválida! Por favor, responda com 'Sim' ou 'Não'."
          );
        }
        break;

      case 2:
        const rating = parseInt(choice);
        if (rating >= 1 && rating <= 5) {
          if (rating <= 3) {
            displayBotMessage(
              "Sentimos muito que a carne não tenha te agradado! 😔 O que podemos melhorar?"
            );
          } else {
            displayBotMessage(
              "Que bom que gostou da carne! Ficamos felizes em saber disso! 😊"
            );
          }
          setTimeout(() => {
            displayBotMessage(
              "Agradecemos seu comentário e vamos trabalhar nisso!"
            );
            displayBotMessage("E os acompanhamentos? Como estavam? 🍚🥗");
            displayBotMessage("Opções:\n✅ Bom\n➖ Médio\n❌ Ruim");
            currentStep = 4;
          }, 1500);
        } else {
          displayBotMessage(
            "Por favor, escolha uma nota entre 1 e 5 para a carne."
          );
        }
        break;

      case 4:
        if (choice === "bom") {
          displayBotMessage("Maravilha! Que bom que gostou! 😃");
        } else if (choice === "médio") {
          displayBotMessage(
            "Vamos melhorar ainda mais para você gostar da próxima vez! 💪"
          );
        } else if (choice === "ruim") {
          displayBotMessage(
            "Sentimos muito! O que podemos melhorar nos acompanhamentos?"
          );
        } else {
          displayBotMessage(
            "Opção inválida. Por favor, escolha entre 'Bom', 'Médio' ou 'Ruim'."
          );
          return;
        }
        setTimeout(() => {
          displayBotMessage("Nossa equipe te atendeu bem? 😊👨‍🍳");
          displayBotMessage("Opções:\n✅ Sim\n❌ Não");
          currentStep = 6;
        }, 1500);
        break;

      case 6:
        if (choice === "sim") {
          displayBotMessage("Que ótimo! Nosso time agradece seu elogio! 🥰");
        } else if (choice === "não") {
          displayBotMessage(
            "Poxa, sentimos muito! Queremos melhorar. O que aconteceu?"
          );
        } else {
          displayBotMessage("Opção inválida! Responda com 'Sim' ou 'Não'.");
          return;
        }
        setTimeout(() => {
          displayBotMessage(
            "Você voltaria a comprar nosso churrasquinho no futuro? 🔥🍢"
          );
          displayBotMessage("Opções:\n✅ Sim\n❌ Não");
          currentStep = 8;
        }, 1500);
        break;

      case 8:
        if (choice === "sim") {
          displayBotMessage(
            "Isso nos deixa muito felizes! 😃 Esperamos te ver de novo em breve!"
          );
        } else if (choice === "não") {
          displayBotMessage(
            "Sentimos muito em saber disso! Podemos fazer algo para melhorar?"
          );
        } else {
          displayBotMessage("Opção inválida! Responda com 'Sim' ou 'Não'.");
          return;
        }
        setTimeout(() => {
          displayBotMessage(
            "Muito obrigado por sua avaliação! Seu feedback é muito importante para nós. Esperamos te ver em breve para um churrasquinho ainda melhor! 🔥🍢😃"
          );
          currentStep = 0;
        }, 1500);
        break;

      default:
        break;
    }
  }

  //Execução da Função do chatbot
  startChat();

  // Aceita respostas enviadas com o Enter
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const userMessage = userInput.value.trim().toLowerCase();
      if (userMessage) {
        displayUserMessage(userMessage); // Exibe a mensagem do usuário
        userChoice(userMessage); // Envia a mensagem do usuário para o chatbot
      }
      userInput.value = "";
    }
  });
});

let attempts = [];
let maxAttempts = 3;
let isWinner = false;
let luckyNumber = randomNumber();

function randomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function updateUI() {
  document.getElementById("attemptsCount").textContent =
    maxAttempts - attempts.length;

  document.getElementById("attemptsList").textContent =
    attempts.length > 0 ? attempts.join(", ") : "Nenhuma";

  if (attempts.length >= maxAttempts || isWinner) {
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "inline-block";
  } else {
    document.getElementById("submitBtn").style.display = "inline-block";
    document.getElementById("resetBtn").style.display = "none";
  }
}

function verificaNumero(number) {
  number = parseInt(number);

  if (number < 0 || number > 10) {
    document.getElementById("feedbackMsg").textContent =
      "Número inválido. Digite um número entre 1 e 10.";
    return;
  }

  if (attempts.length >= maxAttempts) {
    document.getElementById("feedbackMsg").textContent =
      "3 tentativas já foram feitas. Reinicie o jogo.";
    return;
  }

  if (attempts.includes(number)) {
    document.getElementById("feedbackMsg").textContent = `Tentativa ${
      attempts.indexOf(number) + 1
    }: Número já tentado.`;
  } else {
    attempts.push(number);

    if (luckyNumber === number) {
      isWinner = true;
      document.getElementById("feedbackMsg").textContent =
        "Parabéns! Você acertou o número!";
      showConfetti();
    } else {
      if (luckyNumber > number) {
        document.getElementById("feedbackMsg").textContent =
          "O número é maior.";
      } else {
        if (attempts.length == maxAttempts) {
          document.getElementById(
            "feedbackMsg"
          ).textContent = `O número correto era ${luckyNumber}`;
        } else {
          document.getElementById("feedbackMsg").textContent =
            "O número é menor.";
        }
      }
    }
    updateUI();
  }
}

function getAttempts() {
  return attempts;
}

function resetGame() {
  attempts = [];
  isWinner = false;
  luckyNumber = randomNumber();
  updateUI();
  document.getElementById("feedbackMsg").textContent =
    "O jogo foi reiniciado. Boa sorte!";
}

function showConfetti() {
  confetti({
    particleCount: 500,
    spread: 70,
    origin: { y: 0.6 },
  });
}

document.getElementById("submitBtn").addEventListener("click", () => {
  const userInput = document.getElementById("userInput").value;
  verificaNumero(userInput);
});

document.getElementById("resetBtn").addEventListener("click", resetGame);

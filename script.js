let wallet = 2000;
let selectedNumber = null;

function selectNumber(number) {
    selectedNumber = number;
    document.querySelectorAll('.buttons button').forEach(button => {
        button.style.backgroundColor = '#e74c3c';
    });
    document.querySelector(`.buttons button:nth-child(${number + 1})`).style.backgroundColor = '#27ae60';
}

function spinRoulette() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const resultMessage = document.getElementById('result-message');
    const walletElement = document.getElementById('wallet');

    if (selectedNumber === null) {
        resultMessage.textContent = "Veuillez sélectionner un numéro.";
        return;
    }

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > wallet) {
        resultMessage.textContent = "Veuillez entrer un montant de mise valide.";
        return;
    }

    const winningNumber = Math.floor(Math.random() * 31);
    wallet -= betAmount;
    walletElement.textContent = wallet;

    let currentNumber = 0;
    const interval = setInterval(() => {
        resultMessage.textContent = `Le numéro gagnant est... ${currentNumber}`;
        if (currentNumber === winningNumber) {
            clearInterval(interval);
            setTimeout(() => {
                if (selectedNumber === winningNumber) {
                    const winnings = betAmount * 20;
                    wallet += winnings;
                    resultMessage.textContent = `Félicitations ! Le numéro gagnant est ${winningNumber}. Vous avez gagné ${winnings}€.`;
                } else {
                    resultMessage.textContent = `Désolé, le numéro gagnant est ${winningNumber}. Vous avez perdu ${betAmount}€.`;
                }

                walletElement.textContent = wallet;

                if (wallet <= 0) {
                    resultMessage.textContent += " Vous n'avez plus d'argent dans votre portefeuille.";
                }
            }, 1000);
        }
        currentNumber = (currentNumber + 1) % 31;
    }, 100);
}

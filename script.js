let wallet = 2000;
let selectedNumber = null;
let betType = null;

function selectNumber(number) {
    selectedNumber = number;
    betType = 'number';
    document.querySelectorAll('.buttons button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelector(`.buttons button:nth-child(${number + 1})`).classList.add('selected');
    document.querySelectorAll('.bet-type button').forEach(button => {
        button.classList.remove('selected');
    });
}

function betOnColor(color) {
    selectedNumber = null;
    betType = color;
    document.querySelectorAll('.buttons button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelectorAll('.bet-type button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelector(`.bet-type button.${color}`).classList.add('selected');
}

function spinRoulette() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const resultMessage = document.getElementById('result-message');
    const walletElement = document.getElementById('wallet');

    if (betType === null) {
        resultMessage.textContent = "Veuillez sélectionner un numéro ou une couleur.";
        return;
    }

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > wallet) {
        resultMessage.textContent = "Veuillez entrer un montant de mise valide.";
        return;
    }

    const winningNumber = Math.floor(Math.random() * 30);
    wallet -= betAmount;
    walletElement.textContent = wallet;

    let currentNumber = 0;
    let cycles = 0;
    const interval = setInterval(() => {
        resultMessage.textContent = `Le numéro gagnant est... ${currentNumber}`;
        if (currentNumber === winningNumber && cycles >= 3) {
            clearInterval(interval);
            setTimeout(() => {
                const winningColor = (winningNumber % 2 === 0) ? 'black' : 'red';
                let winnings = 0;
                if (betType === 'number' && selectedNumber === winningNumber) {
                    winnings = betAmount * 20;
                } else if (betType === winningColor) {
                    winnings = betAmount * 1.5;
                }

                if (winnings > 0) {
                    wallet += winnings;
                    resultMessage.textContent = `Félicitations ! Le numéro gagnant est ${winningNumber} (${winningColor}). Vous avez gagné ${winnings}€.`;
                } else {
                    resultMessage.textContent = `Désolé, le numéro gagnant est ${winningNumber} (${winningColor}). Vous avez perdu ${betAmount}€.`;
                }

                walletElement.textContent = wallet;

                if (wallet <= 0) {
                    resultMessage.textContent += " Vous n'avez plus d'argent dans votre portefeuille.";
                }
            }, 1000);
        } else {
            currentNumber = (currentNumber + 1) % 30;
            if (currentNumber === 0) cycles++;
        }
    }, 100);
}

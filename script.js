let wallet = 2000;

function spinRoulette() {
    const betNumber = parseInt(document.getElementById('bet-number').value);
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const resultMessage = document.getElementById('result-message');
    const walletElement = document.getElementById('wallet');

    if (isNaN(betNumber) || betNumber < 0 || betNumber > 30) {
        resultMessage.textContent = "Veuillez entrer un nombre valide entre 0 et 30.";
        return;
    }

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > wallet) {
        resultMessage.textContent = "Veuillez entrer un montant de mise valide.";
        return;
    }

    const winningNumber = Math.floor(Math.random() * 31);
    if (betNumber === winningNumber) {
        const winnings = betAmount * 20;
        wallet += winnings;
        resultMessage.textContent = `Félicitations ! Le numéro gagnant est ${winningNumber}. Vous avez gagné ${winnings}€.`;
    } else {
        wallet -= betAmount;
        resultMessage.textContent = `Désolé, le numéro gagnant est ${winningNumber}. Vous avez perdu ${betAmount}€.`;
    }

    walletElement.textContent = wallet;

    if (wallet <= 0) {
        resultMessage.textContent += " Vous n'avez plus d'argent dans votre portefeuille.";
    }
}

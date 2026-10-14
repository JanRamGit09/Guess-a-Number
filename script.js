

// function secretNumber() {
//     const guess = Math.floor(
//         1 + Math.random() *100
//     );
//     return guess;
// }

// let myguess = secretNumber();

// console.log(myguess);

// //Button Function

// function checkGuess() {
//   let input = document.getElementById("guess").value;

//     if (input === "") {
//         alert("Please enter a number between 1 and 100!");
//         return;
//     }

//     let playerGuess = Number(input);

//     if (playerGuess > myguess) {
//     alert("Too high! Try again!");
// } else if (playerGuess < myguess) {
//     alert("Too low! Try again!");
// } else {
//     alert("Congratulations! Correct guess!");
// }       
// }

// document.getElementById("checkbtn").onclick = checkGuess;



function secretNumber() {
    const guess = Math.floor(1 + Math.random() * 100);
    return guess;
}

let myguess = secretNumber();
console.log("Computer's secret number:", myguess);

let attempts = 0;
const maxAttempts = 5;

const result = document.getElementById("js1");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("checkbtn");

// Create an attempts display
const attemptsDisplay = document.createElement("p");
attemptsDisplay.id = "attempts";
result.after(attemptsDisplay);

// Create a Play Again button
const restartButton = document.createElement("button");
restartButton.id = "restartbtn";
restartButton.textContent = "🔄 Play Again";
restartButton.style.display = "none";
attemptsDisplay.after(restartButton);

function updateAttempts() {
    attemptsDisplay.textContent =
        "Attempts: " + attempts + " / " + maxAttempts;
}

function endGame() {
    checkButton.disabled = true;
    guessInput.disabled = true;
    restartButton.style.display = "inline-block";
}

function checkGuess() {
    let input = guessInput.value.trim();

    if (input === "") {
        result.textContent = "⚠️ Please enter a number!";
        result.className = "warning";
        return;
    }

    let playerGuess = Number(input);

    if (
        !Number.isInteger(playerGuess) ||
        playerGuess < 1 ||
        playerGuess > 100
    ) {
        result.textContent =
            "⚠️ Enter a whole number between 1 and 100!";
        result.className = "warning";
        return;
    }

    attempts++;
    updateAttempts();

    if (playerGuess === myguess) {
        result.textContent =
            "🎉 Congratulations! You guessed the number!";
        result.className = "success";
        endGame();

    } else if (attempts >= maxAttempts) {
        result.textContent =
            "😢 Game Over! The secret number was " + myguess;
        result.className = "gameover";
        endGame();

    } else if (playerGuess > myguess) {
        result.textContent = "📈 Too high! Try again!";
        result.className = "hint";

    } else {
        result.textContent = "📉 Too low! Try again!";
        result.className = "hint";
    }
}

function restartGame() {
    myguess = secretNumber();
    attempts = 0;

    guessInput.value = "";
    guessInput.disabled = false;
    checkButton.disabled = false;

    result.textContent = "🎯 Make your first guess!";
    result.className = "";

    restartButton.style.display = "none";

    updateAttempts();
    guessInput.focus();
}

checkButton.onclick = checkGuess;
restartButton.onclick = restartGame;

updateAttempts();

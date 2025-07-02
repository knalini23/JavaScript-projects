const words = [
    "react",
    "angular",
    "javascript",
    "bootstrap",
    "tailwind",
];

const hints = [
    "JavaScript library for UI",
    "Google’s JS framework",
    "Scripting language for the web",
    "Popular CSS framework",
    "Utility-first CSS framework",
];

let displayWord = "";
let displayHint = "";
let attempts = 3;
let maxTime = 30;
let timer;
let score = 0;

// Shuffle letters in a word
function shuffle(str) {
    const strArray = Array.from(str);
    for (let i = strArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [strArray[i], strArray[j]] = [strArray[j], strArray[i]];
    }
    return strArray.join(" ");
}

// Start a new word round
function refresh() {
    attempts = 3;

    const index = Math.floor(Math.random() * words.length);
    displayWord = words[index];
    displayHint = hints[index];

    document.getElementById("scrambleWord").innerText = shuffle(displayWord).toUpperCase();
    document.getElementById("hint").innerHTML = `<b>Hint:</b> ${displayHint}`;
    document.getElementById("output").innerText = "Result:";
    document.getElementById("input").value = "";
    document.getElementById("input").focus();

    startTimer(maxTime);
}

// Check user guess
function check() {
    const input = document.getElementById("input").value.trim().toLowerCase();
    const output = document.getElementById("output");

    if (input === "") {
        output.innerHTML = "⚠️ Please enter your guess.";
        return;
    }

    if (input === displayWord.toLowerCase()) {
        score++;
        updateScore();
        output.innerHTML = "✅ Correct! Well done!";
        clearInterval(timer);
        setTimeout(refresh, 2000);
    } else {
        attempts--;
        if (attempts > 0) {
            output.innerHTML = `❌ Incorrect. ${attempts} attempt(s) left.`;
        } else {
            output.innerHTML = `💀 No attempts left. The word was: <b>${displayWord.toUpperCase()}</b>`;
            clearInterval(timer);
            setTimeout(refresh, 3000);
        }
    }
}

// Start countdown timer
function startTimer(duration) {
    clearInterval(timer);
    let timeLeft = duration;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `⏳ Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `⏳ Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("output").innerHTML = `⏰ Time's up! The word was: <b>${displayWord.toUpperCase()}</b>`;
            setTimeout(refresh, 3000);
        }
    }, 1000);
}

// Update score on screen
function updateScore() {
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.innerText = `🎯 Score: ${score}`;
}

// Initial game start
window.onload = () => {
    refresh();
    updateScore();
};

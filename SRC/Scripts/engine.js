const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        ball: document.querySelector(".ball"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timeId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        countDownTimeId: null
    }
};

// Corrigindo a função countDown e seus erros de sintaxe
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.values.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("ball");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("ball");
    state.values.hitPosition = randomSquare.id;
}

function moveBall() {
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}

function initialize() {
    moveBall();
    addListenerHitbox();
    state.actions.countDownTimeId = setInterval(countDown, 1000); // Inicia a contagem regressiva
}

initialize();

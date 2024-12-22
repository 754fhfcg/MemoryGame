let error = 0;
let score = 0;
let con = document.querySelector(".con");
let con2 = document.querySelector(".con2");
let back = document.querySelector(".back");
let NumberOfSquares = document.querySelector(".Email");
let NumberOfTries = document.querySelector(".pass");
let NumberOfSeconds = document.querySelector(".time");
let start = document.querySelector(".sub");
let main = document.querySelector(".sub3");
let restart = document.querySelector(".sub2");
let timer = document.querySelector(".timer");
let tima;
let remainingAttempts;
let greenSquares = new Set();  

function rand() {
    let color = "#";
    let oprator = "89ABCDEF"; 
    
    for (let i = 0; i < 6; i++) {
        color += oprator[Math.floor(Math.random() * oprator.length)];
    }
    
    return color;
}

main.onclick = function() {
    location.reload();
}

function ran(max) {
    return Math.floor(Math.random() * max);
}

start.onclick = function() {
    con2.style.display = "none";
    con.style.display = "block";
    back.style.display = "block";
    
    let numOfsc = NumberOfSquares.value;
    let numOftr = NumberOfTries.value;
    let numberOfSec = parseInt(NumberOfSeconds.value, 10) + 1;

    if (numOfsc > 50) {
        numOfsc = 50;
    }

    if (numOftr > 50) {
        numOftr = 50;
    }

    if (numberOfSec > 60) {
        numberOfSec = 60;
    }
    
    if (NumberOfSeconds.value === "") {
        numberOfSec = 6;
    }

    remainingAttempts = numOftr || 5; 
    timer.textContent = `Time left: ${numberOfSec}`; 

    restart.style.pointerEvents = "none";
    restart.style.opacity = "0.4";
    
    tima = setInterval(() => {
        numberOfSec -= 1;
        if (numberOfSec < 1) {
            clearInterval(tima);
            timer.textContent = `Tries left: ${remainingAttempts}`;
            restart.style.pointerEvents = "auto";
            restart.style.opacity = "1";
            document.querySelectorAll(".squar").forEach(sq => {
                sq.style.pointerEvents = "auto"; 
            });
        } else {
            timer.textContent = `Time left: ${numberOfSec}`; 
        }
    }, 1000);

    let timers = setInterval(() => {
        timer.style.color = rand();
    }, 500);

    colors(numOfsc, numOftr, numberOfSec);
};

gen()

function colors(scores, errors, time) {
    let squares = Array.from(document.querySelectorAll(".squar"));
    greenSquares.clear();
    scores = isNaN(scores) || scores < 1 ? 10 : scores;
    
    while (greenSquares.size < scores) {
        let randomIndex = ran(squares.length);
        greenSquares.add(squares[randomIndex]);
    }

    errors = isNaN(errors) || errors < 1 ? 5 : errors;
    time = isNaN(time) || time < 1 ? 5 : time;

    let gameActive = true;
    squares.forEach(sq => {
        sq.style.backgroundColor = "#333";
        sq.style.pointerEvents = "auto";
    });

    setTimeout(() => {
        squares.forEach(sq => {
            if (greenSquares.has(sq)) {
                sq.style.backgroundColor = "lime";
            } else {
                sq.style.backgroundColor = "#333";
            }
        });
    }, 1000);

    setTimeout(() => {
        if (gameActive) {
            squares.forEach(sq => {
                sq.style.backgroundColor = "blue";
            });

            squares.forEach(sq => {
                sq.addEventListener("click", function() {
                    if (!gameActive) return;

                    if (greenSquares.has(sq)) {
                        if (sq.style.backgroundColor === "lime") {
                            return;
                        } else {
                            sq.style.backgroundColor = "lime";
                            sq.classList.add("win");
                            score++;
                        }

                    } else {
                        if (sq.style.backgroundColor === "red") {
                            return;
                        } else {
                            sq.style.backgroundColor = "red";
                            error++;
                            remainingAttempts--;
                            timer.textContent = `Tries left: ${remainingAttempts}`; 
                }
                if (remainingAttempts <= 0) {
                    gameActive = false;
                    squares.forEach(sq => {
                        if (sq.style.backgroundColor === 'blue') {
                            sq.style.backgroundColor = 'red';
                        }

                        if (greenSquares.has(sq)) {
                            sq.style.backgroundColor = "#d4d4d4";
                            
                        }

                        if (sq.classList.contains("win")) {
                            sq.style.backgroundColor = "lime";
  
                        }
                    });
                    timer.textContent = "You Lose";
                } else {
                    timer.textContent = `Tries left: ${remainingAttempts}`;
                }
            }
                    
            

                    if (score >= scores) {
                        gameActive = false;
                        squares.forEach(sq => {
                            if (sq.style.backgroundColor === "blue" || sq.style.backgroundColor === "red") {
                                sq.style.backgroundColor = "white";
                                sq.style.pointerEvents = "none";
                                sq.style.borderColor = "#333";
                                timer.textContent = "You Win";
                            } else if (greenSquares.has(sq)) {
                                sq.style.backgroundColor = "lime";
                            }
                        });
                    }
                });
            });
        }
    }, time * 1000);
}

function gen() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            let squar = document.createElement("span");
            squar.classList.add("squar");
            squar.classList.add(`squar-${i}-${j}`);
            con.appendChild(squar);
        };
    };
};

restart.onclick = function() {
    let squars = document.querySelectorAll(".squar");
    let numOfsc = NumberOfSquares.value;
    let numOftr = NumberOfTries.value;
    let numberOfSec = parseInt(NumberOfSeconds.value, 10) + 1;


    if (numOfsc > 50) {
        numOfsc = 50;
    }

    if (numOftr > 50) {
        numOftr = 50;
    }

    if (numberOfSec > 60) {
        numberOfSec = 60;
    }

    squars.forEach((sq) => {
        sq.style.borderColor = "white";
        sq.style.backgroundColor = "#333"; 
        sq.style.pointerEvents = "none"; 
        sq.classList.remove("win");
        sq.style.backgroundColor = "#333";
    });

    if (NumberOfSeconds.value === "") {
        numberOfSec = 6;
    }

    error = 0; 
    score = 0; 
    remainingAttempts = numOftr || 5; 
    timer.textContent = `Tries left: ${remainingAttempts}`;

    restart.style.pointerEvents = "none";
    restart.style.opacity = "0.4";

    tima = setInterval(() => {
        numberOfSec -= 1;
        if (numberOfSec < 1) {
            clearInterval(tima);
            timer.textContent = `Tries left: ${remainingAttempts}`;
            restart.style.pointerEvents = "auto";
            restart.style.opacity = "1";
            squars.forEach(sq => {
                sq.style.pointerEvents = "auto"; 
            });
        } else {
            timer.textContent = `Time left: ${numberOfSec}`;
        }
    }, 1000);

    let timers = setInterval(() => {
        timer.style.color = rand();
    }, 1000);

    colors(numOfsc, numOftr, numberOfSec);
};

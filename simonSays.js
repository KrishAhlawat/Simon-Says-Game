let userSeq = [];
let gameSeq = [];

let btns = ["yellow", "red", "green", "blue"];
let h2 = document.querySelector("h2");

let level = 0;
let started = false;

let highestScore = 0;

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started!");
        started = true;

        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function() {
        btn.classList.remove("gameFlash");
    }, 200);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIndex);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameFlash(randomBtn);
}

function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level - 1 > highestScore) {
            highestScore = level - 1;
        }
        h2.innerText = `Game Over! Score : ${level-1}\nHighest Score = ${highestScore}\nPress any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkSeq(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    level = 0;
    started = false;
    userSeq = [];
    gameSeq = [];
}

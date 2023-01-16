let state;
var redPlayer = "r";
var yellowPlayer = "y";
var player = redPlayer;
var game = false;
var board;
var columnSpot;
var rows = 6;
var columns = 7;

let start = document.getElementById("Start");
start.onclick = function() {
    buildInitialState();
    start.style.visibility='hidden';
    restart.style.visibility='visible';

    number = Math.floor(Math.random() * 2)
    if (number == 0) {
        let nameCard1 = document.getElementById("NameCard1").innerText;
        player = redPlayer;
        winner.innerText = nameCard1 + "'s Turn"
    } else {
        let nameCard2 = document.getElementById("NameCard2").innerText;
        player = yellowPlayer;
        winner.innerText = nameCard2 + "'s Turn"
    }
}

function buildInitialState() {
    board = [];
    columnSpot = [5, 5, 5, 5, 5, 5, 5];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.addEventListener('click', onBoardClick)
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function onBoardClick() {

    if (game) {
        return;
    }

    let coordinates = this.id.split("-");
    let i = parseInt(coordinates[0]);
    let j = parseInt(coordinates[1]);
    i = columnSpot[j];
    if (i < 0) {
        return;
    }

    board[i][j] = player;
    let tile = document.getElementById(i.toString() + "-" + j.toString());
    if (player == redPlayer) {
        tile.classList.add("red-player");
        let nameCard2 = document.getElementById("NameCard2").innerText;
        player = yellowPlayer;
        winner.innerText = nameCard2 + "'s Turn"
    } else {
        tile.classList.add("yellow-player");
        let nameCard1 = document.getElementById("NameCard1").innerText;
        player = redPlayer;
        winner.innerText = nameCard1 + "'s Turn"
    }

    i -= 1;
    columnSpot[j] = i;
    console.log(columnSpot)

    if (columnSpot[0] == -1 && columnSpot[1] == -1 && columnSpot[2] == -1 && columnSpot[3] == -1 && columnSpot[4] == -1 && columnSpot[5] == -1 && columnSpot[6] == -1) {
        winner.innerText = "Draw"
    }

    renderState();
    console.log(board)
}

function renderState() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (board[i][j] != ' ') {
                if (board[i][j] == board[i][j + 1] && board[i][j + 1] == board[i][j + 2] && board[i][j + 2] == board[i][j + 3]) {
                    setWinner(i, j);
                    return;
                }
            }
        }
    }

    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows - 3; i++) {
            if (board[i][j] != ' ') {
                if (board[i][j] == board[i + 1][j] && board[i + 1][j] == board[i + 2][j] && board[i + 2][j] == board[i + 3][j]) {
                    setWinner(i, j);
                    return;
                }
            }
        }
    }

    for (let i = 0; i < rows - 3; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (board[i][j] != ' ') {
                if (board[i][j] == board[i + 1][j + 1] && board[i + 1][j + 1] == board[i + 2][j + 2] && board[i + 2][j + 2] == board[i + 3][j + 3]) {
                    setWinner(i, j);
                    return;
                }
            }
        }
    }

    for (let i = 3; i < rows; i++) {
        for (let j = 0; j < columns - 3; j++) {
            if (board[i][j] != ' ') {
                if (board[i][j] == board[i - 1][j + 1] && board[i - 1][j + 1] == board[i - 2][j + 2] && board[i - 2][j + 2] == board[i - 3][j + 3]) {
                    setWinner(i, j);
                    return;
                }
            }
        }
    }
}

function setWinner(i, j) {
    let winner = document.getElementById("winner");
    if (board[i][j] == redPlayer) {
        let nameCard1 = document.getElementById("NameCard1").innerText;
        winner.innerText = nameCard1 + " Wins"
    } else {
        let nameCard2 = document.getElementById("NameCard2").innerText;
        winner.innerText = nameCard2 + " Wins"
    }
    game = true
}

let button1 = document.getElementById("Button1");
let button2 = document.getElementById("Button2");

button1.addEventListener('click', enterName1);
button2.addEventListener('click', enterName2);

function enterName1() {
    let name1 = document.getElementById("Name1").value;
    let nameCard1 = document.getElementById("NameCard1");
    nameCard1.innerText = name1
}

function enterName2() {
    let name2 = document.getElementById("Name2").value; 
    let nameCard2 = document.getElementById("NameCard2");
    nameCard2.innerText = name2
}

let restart = document.getElementById("Restart");

restart.onclick = function() {

    game = false;
    columnSpot = [5, 5, 5, 5, 5, 5, 5];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            tile.classList.remove("red-player");
            tile.classList.remove("yellow-player");
            board[i][j] = " ";
        }
    }
      
    number = Math.floor(Math.random() * 2)
    if (number == 0) {
        let nameCard1 = document.getElementById("NameCard1").innerText;
        player = redPlayer;
        winner.innerText = nameCard1 + "'s Turn"
    } else {
        let nameCard2 = document.getElementById("NameCard2").innerText;
        player = yellowPlayer;
        winner.innerText = nameCard2 + "'s Turn"
    }
}

//function computerPlayer() {
//    let winChance = [["y", "y", " ", "y"], ["y", " ", "y", "y"]]
//}
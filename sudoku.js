let board = [
    "53--7----",
    "6--195---",
    "-98----6-",
    "8---6---3",
    "4-8-3--1-",
    "7---2---6",
    "-6----28-",
    "---419--5",
    "----8--79"
];

let solution = [ 
    "534678912",
    "672195348",
    "198342567",
    "859761423",
    "426853791",
    "713924856",
    "961537284",
    "287419635",
    "345286179"
];

window.onload = function() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
    sudoku.setGame();
};

class Sudoku {
    constructor() {
        this.numSelected = null;
        this.tileSelected = null;
        this.errors = 0;
    }

    setGame() {
        const boardContainer = document.getElementById("board");
        boardContainer.innerHTML = ""; 

        const digitsContainer = document.getElementById("digits");
        digitsContainer.innerHTML = "";

        for (let i = 1; i <= 9; i++) {
            let num = document.createElement("div");
            num.id = i.toString();
            num.innerText = i;
            num.classList.add("number");
            num.addEventListener("click", () => this.selectNum(num));
            digitsContainer.appendChild(num);
        }

        // Create Sudoku board
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                let tile = document.createElement("div");
                tile.id = x.toString() + "-" + y.toString();
                tile.classList.add("tile");

                if (board[x][y] !== "-") {
                    tile.innerText = board[x][y];
                    tile.classList.add("tile-start");
                } else {
                    tile.addEventListener("click", () => this.selectTile(tile));
                }

                if (x % 3 === 2 && x !== 8) {
                    tile.classList.add("horizontal-line");
                }
                if (y % 3 === 2 && y !== 8) {
                    tile.classList.add("vertical-line");
                }

                boardContainer.appendChild(tile);
            }
        }
    }

    selectNum(number) {
        if (this.numSelected != null) {
            this.numSelected.classList.remove("number-selected");
        }
        this.numSelected = number;
        this.numSelected.classList.add("number-selected");
    }

    selectTile(tile) {
        if (!this.numSelected) return;

        if (tile.innerText !== "") {
            return; // Prevent overwriting filled tiles
        }

        this.tileSelected = tile;

        let coords = tile.id.split("-");
        let x = parseInt(coords[0]);
        let y = parseInt(coords[1]);

        if (solution[x][y] == this.numSelected.innerText) { 
            tile.innerText = this.numSelected.innerText;
        } else { 
            this.errors += 1;
            document.getElementById("errors").innerText = this.errors;
        }
    }
}

const sudoku = new Sudoku();
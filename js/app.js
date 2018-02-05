var Furry = require("./furry.js");
var Coin = require("./coin.js");


//G A M E CONSTRUCTOR
function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        this.visibleFurry = document.querySelector(".furry");
        if(this.visibleFurry !== null) {
            this.visibleFurry.classList.remove('furry');
        }
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function () {
        // switch case
        if (this.furry.direction === "right") {
            this.furry.x++;
        } else if (this.furry.direction === "left") {
            this.furry.x--;
        } else if (this.furry.direction === "up") {
            this.furry.y--;
        } else if (this.furry.direction === "down") {
            this.furry.y++;
        }
        this.showFurry();
        this.gameOver();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.furry.direction = "left";
                break;
            case "ArrowRight":
                this.furry.direction = "right";
                break;
            case "ArrowUp":
                this.furry.direction = "up";
                break;
            case "ArrowDown":
                this.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;
            var scoreTable = document.querySelector("#score strong");
            scoreTable.innerText = this.score;
            this.coin = new Coin;
            theGame.showCoin();
        }
    };

    this.gameOver = function() {
        var self = this;
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(self.idSetInterval);
            this.hideVisibleFurry();
        }
    };

    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };

}

var theGame = new Game();
theGame.showFurry();
theGame.showCoin();
theGame.startGame();



document.addEventListener('keydown', function (event) {
    console.log(event);
    theGame.turnFurry(event);
});
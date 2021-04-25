import GridItem, { DirtContentType, GridItemType } from "./gridItem";
import model from "./models/model";
import Player from "./player";
import UI from "./ui";

export default class Game{

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    ui: UI = new UI();

    gridWidth = 10;
    gridHeight = 50;
    grid;
    player: Player;

    constructor(id) {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.newGame();

        window.addEventListener('keydown', (e) => this.handle_KEYDOWN(e))
    }

    newGame() {
        this.grid = [];

        let level = model.levels[model.level];
        this.gridWidth = level.width;
        this.gridHeight = level.height;
        model.levelBones = level.bones;
        model.levelBombs = level.bombs;
        model.foundBones = 0;

        this.createGrid();
        this.populateGrid();
        this.addPlayer();
    }

    gameOver() {
        model.foundDiamonds = 0;
        model.level = 0;
        this.newGame();
    }

    nextLevel() {
        model.level ++;
        if (model.level < model.levels.length) {
            this.newGame();
        } else {
            this.winGame();
        }
    }

    winGame() {

    }

    createGrid() {
        for (let i = 0; i < this.gridWidth; i++) {
            let row = [];
            for (let j = 0; j < this.gridHeight; j++) {
                let type = GridItemType.DIRT;
                if (j == 0) {
                    type = GridItemType.SKY;
                }
                row.push(new GridItem(i, j, type));
            }
            this.grid.push(row);
        }
    }

    populateGrid() {
        let dirtSquares = [];

        for (let i = 0; i < this.grid.length; i++) {
            let row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                let item = row[j];
                if (j > 0) {
                    if (Math.random() > .8) {
                        item.type = GridItemType.ROCK;
                    } else {
                        dirtSquares.push(item);
                    }
                }
            }
        }
        
        const bones = new Array(model.levelBones);
        const diamonds = [0];
        const bombs = new Array(model.levelBombs);

        for (let i = 0; i < bones.length; i++) {
            let pos = Math.floor(Math.random() * dirtSquares.length);
            let square = dirtSquares[pos];
            square.contents = DirtContentType.BONE;
            dirtSquares.splice(pos, 1);

            //clears verticla path to bone..
            for (let x = 0; x < this.gridWidth; x++) {
                for (let y = 0; y < this.gridHeight; y++) {
                    if (x == square.x && y !== 0) {
                        let sq = this.grid[x][y];
                        sq.type = GridItemType.DIRT;
                    }
                }
            }

        }

        for (let i = 0; i < diamonds.length; i++) {
            let pos = Math.floor(Math.random() * dirtSquares.length);
            let square = dirtSquares[pos];
            square.contents = DirtContentType.DIAMOND;
            dirtSquares.splice(pos, 1);
        }

        for (let i = 0; i < bombs.length; i++) {
            let pos = Math.floor(Math.random() * dirtSquares.length);
            let square = dirtSquares[pos];
            square.contents = DirtContentType.BOMB;
            dirtSquares.splice(pos, 1);
        }
    }

    addPlayer() {
        let startX = Math.floor(Math.random() * this.gridWidth);
        this.player = new Player(startX, 0);
    }

    handle_KEYDOWN(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.checkSquare(1, 0);
                break;
            case 'ArrowLeft':
                this.checkSquare(-1, 0);
                break;
            case 'ArrowDown':
                this.checkSquare(0, 1);
                break;
            case 'ArrowUp':
                this.checkSquare(0, -1);
                break;
        }
    }

    checkSquare(x, y) {

        if (x !== 0) {
            let nextX = this.player.x + x;
            let nextY = this.player.y + y;
            let nextSquare = this.grid[nextX][nextY];
            if (nextSquare && nextSquare.canOccupy()) {
                this.player.x += x;
            } else if (nextSquare && nextSquare.canDig()) {
                this.digSquare(nextSquare);
            }
        }

        if (y !== 0) {
            let nextX = this.player.x;
            let nextY = this.player.y + y;
            let nextSquare = this.grid[nextX][nextY];
            if (nextSquare && nextSquare.canOccupy()) {
                this.player.y += y;
            } else if (nextSquare && nextSquare.canDig()) {
                this.digSquare(nextSquare);
            }
        }
    }

    digSquare(square: GridItem) {
        square.dig();

        if (square.contents == DirtContentType.BOMB) {
            setTimeout(() => {
                this.gameOver();
            }, 1000);
        }
        
        if (square.contents == DirtContentType.BONE) {
            model.foundBones ++;
            if (model.foundBones == model.levelBones) {
                setTimeout(() => {
                    this.nextLevel();
                }, 1000);
            }
        }

        if (square.contents == DirtContentType.DIAMOND) {
            model.foundDiamonds ++;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, model.width, model.height);

        // draw main game.
        let lowerPadding = 4;
        let x = (window.innerWidth / 2) - ((model.gridSize * this.gridWidth) / 2);
        let y = 0;
        if (this.player.y > ((model.height - (model.gridSize * lowerPadding)) / model.gridSize)) {
            y = (((model.height - (model.gridSize * lowerPadding)) / model.gridSize) - this.player.y) * model.gridSize;
        }

        this.ctx.save();
        this.ctx.translate(x, y);

        for (let i = 0; i < this.grid.length; i++) {
            let row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                let item = row[j];
                item.draw(this.ctx);
            }
        }

        this.player.draw(this.ctx);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(x + (this.gridWidth * model.gridSize) + 10, 0);
        this.ui.draw(this.ctx);
        this.ctx.restore();
    }

    resize() {
        this.canvas.width = model.width;
        this.canvas.height = model.height;
    }
}
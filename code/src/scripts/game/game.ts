import GridItem, { DirtContentType, GridItemType } from "./gridItem";
import model from "./models/model";
import Player from "./player";

export default class Game{

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    gridWidth = 10;
    gridHeight = 20;
    grid;
    player: Player;
    foundBones = 0;

    constructor(id) {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.newGame();

        window.addEventListener('keydown', (e) => this.handle_KEYDOWN(e))
    }

    newGame() {
        this.grid = [];
        this.foundBones = 0;
        this.createGrid();
        this.populateGrid();
        this.addPlayer();
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
                    if (Math.random() > .9) {
                        item.type = GridItemType.ROCK;
                    } else {
                        dirtSquares.push(item);
                    }
                }
            }
        }
        
        let bones = [0, 0, 0, 0];
        let diamonds = [0];

        for (let i = 0; i < bones.length; i++) {
            let square = dirtSquares[Math.floor(Math.random() * dirtSquares.length)];
            square.contents = DirtContentType.BONE;
        }

        for (let i = 0; i < diamonds.length; i++) {
            let square = dirtSquares[Math.floor(Math.random() * dirtSquares.length)];
            square.contents = DirtContentType.DIAMOND;
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
        if (square.contents == DirtContentType.DIAMOND) {
            setTimeout(() => {
             //   this.newGame();
            }, 1000);
        }
        if (square.contents == DirtContentType.BONE) {
            this.foundBones ++;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, model.width, model.height);

        for (let i = 0; i < this.grid.length; i++) {
            let row = this.grid[i];
            for (let j = 0; j < row.length; j++) {

                let item = row[j];
                item.draw(this.ctx);
            }
        }

        this.player.draw(this.ctx);
    }

    resize() {
        this.canvas.width = model.width;
        this.canvas.height = model.height;
    }
}
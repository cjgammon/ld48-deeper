import GridItem, { GridItemType } from "./gridItem";
import model from "./model";
import Player from "./player";

export default class Game{

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    gridWidth = 10;
    gridHeight = 20;
    grid = [];
    player: Player;

    constructor(id) {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.createGrid();
        this.addPlayer();

        window.addEventListener('keydown', (e) => this.handle_KEYDOWN(e))
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

    addPlayer() {
        let startX = Math.floor(Math.random() * this.gridWidth);
        this.player = new Player(startX, 0);
    }

    handle_KEYDOWN(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.movePlayer(1, 0);
                break;
            case 'ArrowLeft':
                this.movePlayer(-1, 0);
                break;
            case 'ArrowDown':
                this.movePlayer(0, 1);
                break;
            case 'ArrowUp':
                this.movePlayer(0, -1);
                break;
        }
    }

    movePlayer(x, y) {

        if (x !== 0) {
            let nextX = this.player.x + x;
            let nextY = this.player.y + y;
            let nextSquare = this.grid[nextX][nextY];
            console.log(nextSquare, nextX, nextY);
            if (nextSquare && nextSquare.canOccupy()) {
                this.player.x += x;
                nextSquare.dig();
            }
        }

        if (y !== 0) {
            let nextX = this.player.x;
            let nextY = this.player.y + y;
            let nextSquare = this.grid[nextX][nextY];
            if (nextSquare && nextSquare.canOccupy()) {
                this.player.y += y;
                nextSquare.dig();
            }
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
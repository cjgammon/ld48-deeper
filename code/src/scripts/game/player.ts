import model from "./model";

export default class Player{

    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        let size = model.gridSize;

        ctx.save();
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.rect(this.x * size, this.y * size, size, size);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
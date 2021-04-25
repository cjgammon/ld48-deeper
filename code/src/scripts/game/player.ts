import assets from "./models/assets";
import model from "./models/model";

export default class Player{

    x: number;
    y: number;
    frame: number = 1;
    delta: number = 1;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.delta ++;

        let size = model.gridSize;
        
        this.frame = this.delta % 10 == 0 ? this.frame + 1 : this.frame;
        this.frame = this.frame > 2 ? 1 : this.frame;
        let img = assets.cache[`guy${this.frame}`];

        ctx.save();
        ctx.drawImage(img, this.x * size, this.y * size, size, size)
        ctx.restore();
    }
}
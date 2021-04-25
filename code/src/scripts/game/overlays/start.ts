import model from "../models/model";

export default class StartView{

    constructor() {
        
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(model.width / 2, model.height / 2);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = "50px Arial";
        ctx.fillText(`Deeper & Deeper`, 0, 20);
        ctx.restore();
    }
}
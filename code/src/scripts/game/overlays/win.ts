import model from "../models/model";

export default class WinView{
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(model.width / 2, model.height / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = "50px Arial";
        ctx.fillText(`You Win!`, 0, 20);
        ctx.restore();
    }
}
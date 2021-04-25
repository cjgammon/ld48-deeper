import model from "../models/model";

export default class GameoverView{
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(model.width / 2, model.height / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'red';
        ctx.font = "50px Arial";
        ctx.fillText(`game over`, 0, 20);
        ctx.restore();
    }
}
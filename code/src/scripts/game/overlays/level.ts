import model from "../models/model";

export default class LevelView{
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(model.width / 2, 0);
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText(`level ${model.level + 1}`, 0, 20);
        ctx.restore();
    }
}
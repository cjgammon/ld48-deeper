import model from "./models/model";

export default class UI{
    constructor() {

    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText(`level ${model.level + 1}`, 0, 20);
        ctx.fillText(`bones: ${model.foundBones}/${model.levelBones}`, 0, 40);
        ctx.fillText(`diamonds: ${model.foundDiamonds}`, 0, 60);
        ctx.restore();
    }
}
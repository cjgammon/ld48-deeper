export default class GameoverView{
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText(`game over`, 0, 20);
        ctx.restore();
    }
}
export default class WinView{
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText(`you win`, 0, 20);
        ctx.restore();
    }
}
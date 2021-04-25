import model from "../models/model";

export default class WinView{

    particles = [];

    constructor() {
        for (let i = 0; i < 300; i++) {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);

            let particle = {
                x: 0,
                y: 0,
                vx: 2 - Math.random() * 4,
                vy: 2 - Math.random() * 4,
                color: '#' + randomColor,
                opacity: 1
            };
            this.particles.push(particle);
        }    
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(model.width / 2, model.height / 2);

        for (let i = 0; i < this.particles.length; i++) {
            ctx.save();

            let particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.opacity -= Math.abs(Math.sqrt(particle.x * particle.x + particle.y * particle.y) * 0.0001);

            if (particle.opacity < 0) {
                particle.x = 0;
                particle.y = 0;
                particle.opacity = 1;
            }

            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fillRect(particle.x, particle.y, 5, 5);
            ctx.restore();
        }

        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = "50px Arial";
        ctx.fillText(`You Win!`, 0, 20);
        ctx.restore();
    }
}
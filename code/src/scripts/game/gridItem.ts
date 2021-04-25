import model from "./model";

export class DirtContentType{
    static EMPTY = 'empty';
    static DIAMOND = 'diamond';
    static BONE = 'bone';
}

export class GridItemType{
    static SKY = 'sky';
    static DIRT = 'dirt';
    static ROCK = 'rock';
}

export default class GridItem{

    x: number;
    y: number;
    type: string;
    contents: string;
    dug: boolean = false;

    constructor(x, y, type: string) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(ctx) {
        let size = model.gridSize;

        ctx.save();

        switch (this.type) {
            case GridItemType.SKY:
                ctx.fillStyle = 'blue';
                break;
            case GridItemType.DIRT:
                if (this.dug == true) {
                    switch (this.contents) {
                        case DirtContentType.DIAMOND:
                            ctx.fillStyle = 'lightblue';
                            break;
                        case DirtContentType.BONE:
                            ctx.fillStyle = 'white';
                            break;
                        default:
                            ctx.fillStyle = 'purple';
                        break;
                    }
                } else {
                    ctx.fillStyle = 'red';
                }
                break;
            case GridItemType.ROCK:
                ctx.fillStyle = 'grey';
                break;
        }

        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.rect(this.x * size, this.y * size, size, size);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    canOccupy() {
        if (this.type == GridItemType.ROCK) {
            return false;
        }
        return true;
    }

    dig() {
        if (this.type == GridItemType.DIRT) {
            this.dug = true;
        }
    }
}
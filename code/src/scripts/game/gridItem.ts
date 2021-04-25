import assets from "./models/assets";
import model from "./models/model";

export class DirtContentType{
    static EMPTY = 'empty';
    static DIAMOND = 'diamond';
    static BONE = 'bone';
    static BOMB = 'bomb';
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
        let img = assets.cache['dirt'];

        switch (this.type) {
            case GridItemType.SKY:
                img = assets.cache['sky'];
                break;
            case GridItemType.DIRT:
                if (this.dug == true) {
                    switch (this.contents) {
                        case DirtContentType.DIAMOND:
                            img = assets.cache['diamond'];
                            break;
                        case DirtContentType.BONE:
                            img = assets.cache[`bone3`];
                            break;
                        case DirtContentType.BOMB:
                            img = assets.cache[`bomb`];
                            break;
                        default:
                            img = assets.cache['tunnel'];
                        break;
                    }
                } else {
                    img = assets.cache['dirt'];
                }
                break;
            case GridItemType.ROCK:
                img = assets.cache['rock'];
                break;
        }

        ctx.save();
        ctx.drawImage(img, this.x * size, this.y * size, size, size)
        ctx.restore();
    }

    canOccupy() {
        if (!this.dug && this.type !== GridItemType.SKY) {
            return false;
        }
        return true;
    }

    canDig() {
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
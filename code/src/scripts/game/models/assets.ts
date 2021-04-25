export const AssetList = [
    'dirt',
    'rock',
    'sky',
    'tunnel',
    'diamond',
    'bone1',
    'bone2',
    'bone3',
    'bone4',
    'guy1',
    'guy2',
    'bomb'
]

class AssetModel{
    loaded = 0;
    cache = {};
    onLoadCompleteCb;

    load(cb) {
        this.onLoadCompleteCb = cb;
        for (let i = 0; i < AssetList.length; i++) {
            let name = AssetList[i];
            let img = new Image();
            img.onload = () => this.handleLoad();
            this.cache[name] = img;
            img.src = `assets/${name}.png`;
        }
    }

    handleLoad() {
        this.loaded++;
        if (this.loaded == AssetList.length) {
            if (this.onLoadCompleteCb) {
                this.onLoadCompleteCb();
            }
        }
    }
}

export default new AssetModel();
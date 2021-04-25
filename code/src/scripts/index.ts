import './index.less';

import Game from './game/game';
import model from './game/model';

class App {

    game: Game;

    constructor() {        

        this.game = new Game('game');
        this.resize();

        window.addEventListener('resize', () => this.resize());

        this.animation();
    }


    animation() {
        this.game.draw();
        requestAnimationFrame(() => this.animation());
    }

    resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        model.width = width;
        model.height = height;
        this.game.resize();

    }
    
}

new App();
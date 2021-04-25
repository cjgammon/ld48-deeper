
export interface LevelStruct{
    width: number;
    height: number;
    bones: number;
    bombs: number;
};

export const Levels: LevelStruct[] = [
    {width: 10, height: 10, bones: 1, bombs: 1},
    {width: 10, height: 10, bones: 2, bombs: 1},
    {width: 20, height: 10, bones: 2, bombs: 1},
    {width: 20, height: 20, bones: 2, bombs: 1},
    {width: 15, height: 30, bones: 3, bombs: 2},
    {width: 10, height: 60, bones: 3, bombs: 3},
    {width: 10, height: 100, bones: 2, bombs: 3},
];

export const GameState = {
    START: 'start',
    PLAYING: 'playing',
    WIN: 'win',
    GAMEOVER: 'gameover',
    LEVELUP: 'levelup'
};

class Model{
    width: number;
    height: number;
    gridSize: number = 50;
    foundBones: number = 0;
    foundDiamonds: number = 0;
    levelBones: number = 0;
    levelBombs: number = 0;
    level: number = 0;
    levels: LevelStruct[] = Levels;
    state: string = GameState.START;
};

export default new Model();

interface LevelStruct{
    width: number;
    height: number;
    bones: number;
    bombs: number;
}


const Levels: LevelStruct[] = [
    {width: 10, height: 10, bones: 2, bombs: 1},
    {width: 10, height: 20, bones: 2, bombs: 1},
    {width: 20, height: 20, bones: 2, bombs: 1},
    {width: 20, height: 30, bones: 2, bombs: 2},
    {width: 20, height: 40, bones: 2, bombs: 3},
    {width: 10, height: 50, bones: 2, bombs: 4},
    {width: 10, height: 100, bones: 1, bombs: 4},
]

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
}

export default new Model();
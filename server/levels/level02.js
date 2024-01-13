// imports
import { COLORS, EVENT_TYPES } from "../constants.js";
import { getBorderedGreenGrids } from "./shared.js";


var lives=5, time=30, score=0;
// get moving red grids
const getRedGrids = (y, rows, columns) => {
    const redGrids = [];

    for(let i = (columns * y) + 3; i <= columns * (rows - 2); i += columns * 8){
        for(let j = i; j < i + (columns - 4); j++){
            redGrids.push(j);
        };
    };

    return redGrids;
};

// get blue grids
const getBlueGrids = (rows, columns, grids) => {
    const newBlueGrids = [];

    while (newBlueGrids.length < ((columns / 2) + columns)) {
        const randomIndex = Math.floor(Math.random() * grids.length);
        if (!newBlueGrids.includes(randomIndex)) {
            newBlueGrids.push(randomIndex);
        }
    }

    return newBlueGrids;
};

// get colored grids
const getColoredGrids = (rows, columns, grids) => {
    const greenGrids = getBorderedGreenGrids(rows, columns);
    const blueGrids = getBlueGrids(rows, columns, grids);

    const coloredGrids = grids.map((_grid, index) => {
        if (greenGrids.includes(index + 1)) {
            return COLORS.CL02;
        }

        if (blueGrids.includes(index + 1)) {
            return COLORS.CL03;
        }

        return COLORS.CL04;
    });

    return coloredGrids;
};

var coloredGrids
export var checkTileColour02;

// get colored grids with pattern mover
export const level02 = (grids, rows, columns, socket) => {
    const redGrids = getRedGrids(2, rows, columns);
    coloredGrids = getColoredGrids(rows, columns, grids);

    const coloredGridsWithMovingRedGrids = coloredGrids.map((coloredGrid, index) => {
        if (redGrids.includes(index + 1)) {
            return COLORS.CL01;
        }

        return coloredGrid;
    });

    let y = 2;
    let interval=setInterval(() => {
        socket.emit(EVENT_TYPES.TIMER_UPDATE, --time>0?time:0);
    }, 1000);
    setTimeout(() => {
        clearInterval(interval)
    }, 30000);
    const mover = () => {
        const redGrids = getRedGrids(y, rows, columns);
        const coloredGridsWithMovingRedGrids = coloredGrids.map((coloredGrid, index) => {
            if (redGrids.includes(index + 1)) {
                return COLORS.CL01;
            }

            return coloredGrid;
        });
        checkTileColour02 = (socket, index) => {
            if (coloredGridsWithMovingRedGrids[index] == COLORS.CL03) {
                score+=10;
                socket.emit(EVENT_TYPES.SCORE_UPDATE, score);
                coloredGrids[index] = COLORS.CL04
                coloredGridsWithMovingRedGrids[index] = COLORS.CL04
                socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids);
            }
            else if (coloredGridsWithMovingRedGrids[index] == COLORS.CL01) {
                if(lives){
                    time-=5, score-=20;
                    socket.emit(EVENT_TYPES.LIFE_UPDATE, lives>0?--lives:0);
                    socket.emit(EVENT_TYPES.TIMER_UPDATE, time>0?time:0);
                    socket.emit(EVENT_TYPES.SCORE_UPDATE, score);
                }
                var redGrids = getRedGrids( y, rows, columns);
                var coloredGridsWithMovingRedGrids2 = coloredGrids.map((coloredGrid, index) => {
                    if (redGrids.includes(index + 1)) {
                        return COLORS.CL01;
                    }
        
                    return coloredGrid;
                });
                let originalColor=coloredGrids[index];
                coloredGridsWithMovingRedGrids2[index] = COLORS.CL05
                socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids);
                for(let i=0;i<3;i++){
                    setTimeout(()=>{
                        redGrids = getRedGrids( y, rows, columns);
                         coloredGridsWithMovingRedGrids2 = coloredGrids.map((coloredGrid, index) => {
                            if (redGrids.includes(index + 1)) {
                                return COLORS.CL01;
                            }
                
                            return coloredGrid;
                        });
                        coloredGridsWithMovingRedGrids2[index] = originalColor
                        socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids2);
                    }, 100)
                    setTimeout(()=>{
                        redGrids = getRedGrids( y, rows, columns);
                         coloredGridsWithMovingRedGrids2 = coloredGrids.map((coloredGrid, index) => {
                            if (redGrids.includes(index + 1)) {
                                return COLORS.CL01;
                            }
                            
                            return coloredGrid;
                        });
                        coloredGridsWithMovingRedGrids2[index] = COLORS.CL05
                        socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids2);
                    }, 100)
                }
                redGrids = getRedGrids( y, rows, columns);
                coloredGridsWithMovingRedGrids2 = coloredGrids.map((coloredGrid, index) => {
                    if (redGrids.includes(index + 1)) {
                        return COLORS.CL01;
                    }
        
                    return coloredGrid;
                });
                coloredGridsWithMovingRedGrids2[index]=COLORS.CL05;
                socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids2);
                
            }
        }
        socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids);

        if(y === 8){
            y = 2;
        } else {
            y += 1;
        }
    };

    return {coloredGridsWithMovingRedGrids, mover};
};
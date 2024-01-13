// imports
import { COLORS, EVENT_TYPES } from "../constants.js";
import { getBorderedGreenGrids } from "./shared.js";
import { Socket } from "socket.io";
// get fixed red grids
var lives=5, time=30, score=0;
const getFixedRedGrids = (rows, columns) => {
    const fixedRedGrids = [];

    for (let i = (columns * 4) + 5; i <= ((rows - 5) * columns) + 5; i += columns) {
        for (let j = i; j <= i + (columns - 9); j++) {
            fixedRedGrids.push(j);
        };
    };

    return fixedRedGrids;
};

// get moving red grids
const getRedGrids = (x, y, grids, columns) => {
    const redPattern = [];
    const redPatternWidth = 2;
    const redPatternHeight = 2;

    for (let i = y; i < y + redPatternHeight; i++) {
        for (let j = x; j < x + redPatternWidth; j++) {
            const gridIndex = i * columns + j;
            redPattern.push(grids[gridIndex]);
        }
    }

    return redPattern;
};

// get blue grids
const getBlueGrids = (rows, columns) => {
    const blueGrids = [];
    // console.log("getBlueGrids")
    for (let i = (columns * 3) + 6; i <= (columns * 4) - 5; i += 3) {
        blueGrids.push(i);
    };

    for (let i = ((rows - 4) * columns) + 4; i <= ((rows - 3) * columns) - 4; i += 3) {
        blueGrids.push(i);
    };

    for (let i = (columns * 3) + 4; i <= ((rows - 4) * columns) + 4; i += (columns * 3)) {
        blueGrids.push(i);
        blueGrids.push(i + (columns - 7));
    };

    return blueGrids;
};

// get colored grids
// var fixedRedGrids;
const getColoredGrids = (rows, columns, grids) => {
    const fixedRedGrids = getFixedRedGrids(rows, columns);
    const greenGrids = getBorderedGreenGrids(rows, columns);
    const blueGrids = getBlueGrids(rows, columns);

    const coloredGrids = grids.map((_grid, index) => {
        if (fixedRedGrids.includes(index + 1)) {
            return COLORS.CL01;
        }

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

var coloredGrids;
export var checkTileColour01;

// get colored grids with pattern mover
export const level01 = (grids, rows, columns, socket) => {
    const redGrids = getRedGrids(2, 2, grids, columns);
    coloredGrids = getColoredGrids(rows, columns, grids);

    var coloredGridsWithMovingRedGrids = coloredGrids.map((coloredGrid, index) => {
        if (redGrids.includes(index + 1)) {
            return COLORS.CL01;
        }

        return coloredGrid;
    });
    let x = 2;
    let y = 2;
    let dx = 1;
    let dy = 0;
    let interval=setInterval(() => {
        socket.emit(EVENT_TYPES.TIMER_UPDATE, --time>0?time:0);
    }, 1000);
    setTimeout(() => {
        clearInterval(interval)
    }, 30000);
    const mover = () => {
        const redGrids = getRedGrids(x, y, grids, columns);
        const coloredGridsWithMovingRedGrids = coloredGrids.map((coloredGrid, index) => {
            if (redGrids.includes(index + 1)) {
                return COLORS.CL01;
            }

            return coloredGrid;
        });

        checkTileColour01 = (socket, index) => {
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
                var redGrids = getRedGrids(x, y, grids, columns);
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
                        redGrids = getRedGrids(x, y, grids, columns);
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
                        redGrids = getRedGrids(x, y, grids, columns);
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
                redGrids = getRedGrids(x, y, grids, columns);
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

        switch (true) {
            case x === 2 && y === 2:
                dx = 1;
                dy = 0;
                break;
            case x === columns - 4 && y === 2:
                dx = 0;
                dy = 1;
                break;
            case x === columns - 4 && y === rows - 4:
                dx = -1;
                dy = 0;
                break;
            case x === 2 && y === rows - 4:
                dx = 0;
                dy = -1;
                break;
        }

        x += dx;
        y += dy;
    };

    return { coloredGridsWithMovingRedGrids, mover };
};


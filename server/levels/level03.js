// imports
import { COLORS, EVENT_TYPES } from "../constants.js";
import { getBorderedGreenGrids } from "./shared.js";


var lives=5, time=30, score=0;
// get moving red grids
const getRedGrids = (y, columns) => {
    const redGrids = [];

    for (let i = (columns * y) + 3; i <= (columns * (y + 1)) - 2; i++) {
        redGrids.push(i);
    };

    for (let i = (columns * (y + 1)) + 3; i <= (columns * (y + 2)) - 2; i++) {
        redGrids.push(i);
    };

    return redGrids;
};

// get blue grids
const getBlueGrids = (rows, columns, grids) => {
    const newBlueGrids = [];

    // Calculate the index positions for the X pattern within the bordered grid
    const shorterSide = Math.min(rows, columns);
    const mid = Math.floor(shorterSide / 2);

    // Create the initial X pattern
    for (let i = 0; i < shorterSide; i++) {
        const topLeftIndex = i * columns + i;
        const topRightIndex = i * columns + (columns - i - 1);

        newBlueGrids.push(grids[topLeftIndex]); // Marking diagonal from top-left to bottom-right within the border
        newBlueGrids.push(grids[topRightIndex]); // Marking diagonal from top-right to bottom-left within the border

        if (shorterSide % 2 !== 0 && i === mid) {
            const midIndex = mid * columns + mid;
            newBlueGrids.push(grids[midIndex]); // Marking the center point for odd-sized grids
        }
    }

    // Repeat X pattern in the empty space below
    if (rows > columns) {
        const repeatXPatternRows = rows - shorterSide;

        for (let i = 0; i < repeatXPatternRows; i++) {
            for (let j = 0; j < columns; j++) {
                if (j === i || j === columns - 1 - i) {
                    const repeatIndex = shorterSide * columns + i * columns + j;
                    newBlueGrids.push(grids[repeatIndex]); // Repeating the X pattern in the empty space below
                } else {
                    newBlueGrids.push(0); // Fill other tiles with default color (0)
                }
            }
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

var coloredGrids;
export var checkTileColour03;
// get colored grids with pattern mover
export const level03 = (grids, rows, columns, socket) => {
    const redGrids = getRedGrids(2, columns);
    coloredGrids = getColoredGrids(rows, columns, grids);

    const coloredGridsWithMovingRedGrids = coloredGrids.map((coloredGrid, index) => {
        if (redGrids.includes(index + 1)) {
            return COLORS.CL01;
        }

        return coloredGrid;
    });

    let start = 2;
    let direction = 'forward';
    let interval=setInterval(() => {
        socket.emit(EVENT_TYPES.TIMER_UPDATE, --time>0?time:0);
    }, 1000);
    setTimeout(() => {
        clearInterval(interval)
    }, 30000);
    const mover = () => {
        const redGrids = getRedGrids(start, columns);
        const coloredGridsWithMovingRedGrids = coloredGrids.map((coloredGrid, index) => {
            if (redGrids.includes(index + 1)) {
                return COLORS.CL01;
            }

            return coloredGrid;
        });
        checkTileColour03 = (socket, index) => {
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
                var redGrids = getRedGrids(start, columns);
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
                        redGrids = getRedGrids(start, columns);
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
                        redGrids = getRedGrids(start, columns);
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
                redGrids = getRedGrids(start, columns);
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

        if (direction === 'backward') {
            start -= 1;
            if (start === 2) {
                direction = 'forward';
            }
        } else {
            start += 1;
            if (start === rows - 4) {
                direction = 'backward';
            }
        }
    };

    return { coloredGridsWithMovingRedGrids, mover };
};

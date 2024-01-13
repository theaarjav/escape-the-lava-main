export const generateGrids = (rows, columns) => {
    const grids = [];
    for(let i = 1; i <=  rows * columns; i++){
        grids.push(i);
    };

    return grids;
};

export const getBorderedGreenGrids = (rows, columns) => {
    const greenGrids = [];

    greenGrids.push(1);
    greenGrids.push(2);
    greenGrids.push(rows * columns - 1);
    greenGrids.push(rows * columns);

    for (let i = columns; i <= columns * (rows - 1); i += columns) {
        greenGrids.push(i - 1);
        greenGrids.push(i);
        greenGrids.push(i + 1)
        greenGrids.push(i + 2);
    };

    for (let i = 3; i <= columns - 2; i++) {
        greenGrids.push(i);
    };

    for (let i = columns + 3; i <= (columns * 2) - 2; i++) {
        greenGrids.push(i);
    };

    for (let i = (columns * (rows - 2)) + 3; i <= (columns * (rows - 1)) - 2; i++) {
        greenGrids.push(i);
    };

    for (let i = (columns * (rows - 1)) + 3; i <= (columns * rows) - 2; i++) {
        greenGrids.push(i);
    };

    return greenGrids;
};
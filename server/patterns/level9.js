let gridLength = 14, gridWidth = 10;
let greenLength = gridLength % 2 ? Math.floor(gridLength / 5) > 2 ? 3 : 1 : Math.floor(gridLength / 5);
let greenWidth = gridWidth % 2 ? Math.floor(gridWidth / 5) > 2 ? 3 : 1 : Math.floor(gridWidth / 5);
let spaceEndLength = parseInt(greenLength / 2);

const green = [];
for (let i = gridLength / 2 - greenLength / 2; i < gridLength / 2 + greenLength / 2; i++) {
    for (let j = 0; j < gridWidth; j++)green.push([i, j]);
}
for (let i = 0; i < gridLength; i++) {
    for (let j = gridWidth / 2 - greenWidth / 2; j < gridWidth / 2 + greenWidth / 2; j++)green.push([i, j]);
}
var blue = [];
var currObj = {}
for (let i = spaceEndLength; i < gridWidth - spaceEndLength ; i++) {
    blue.push([spaceEndLength, i]);
    blue.push([gridLength - spaceEndLength - 1, i]);
}
for (let i = spaceEndLength; i < gridLength - spaceEndLength ; i++) {
    blue.push([i, spaceEndLength]);
    blue.push([i, gridWidth - spaceEndLength - 1]);
}
blue=blue.filter(([x,y])=>{
    let flag=true;
    green.forEach(([gx,gy])=>{
        if(gx==x && gy==y)flag=false
    })
    return flag;
})
// console.log(blue)
var reds = [];
var temp = [];
for (let i = 0; i < 2; i++)for (let j = 0; j < 2; j++) temp.push([spaceEndLength + i, spaceEndLength + j]);
temp.sort()
reds.push(temp);
temp=[]
for(let i=0;i<2;i++)for(let j=0;j<2;j++) temp.push([gridLength-spaceEndLength-i-1, spaceEndLength+j]);
temp.sort()
reds.push(temp);
temp=[]
for(let i=0;i<2;i++)for(let j=0;j<2;j++) temp.push([spaceEndLength+i, gridWidth-spaceEndLength-j-1]);
temp.sort()
reds.push(temp);
temp=[]
for(let i=0;i<2;i++)for(let j=0;j<2;j++) temp.push([gridLength-spaceEndLength-i, gridWidth-spaceEndLength-j]);
temp.sort()
reds.push(temp);
temp=[]
console.log(reds)
const getNextPattern = () => {
    var temp_tiles = Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
    green.forEach(([x, y]) => {
        temp_tiles[x][y] = 'green'
    })
    blue.forEach(([x, y]) => {
        temp_tiles[x][y] = 'blue'
    })
    for (let i = 0; i < reds.length; i++) {
        for (let j = 0; j < reds[i].length; j++) {
            if (temp_tiles[Math.floor(reds[i][j][0])][Math.floor(reds[i][j][1])] != 'green') temp_tiles[Math.floor(reds[i][j][0])][Math.floor(reds[i][j][1])] = 'red';
        }
    }
    for (let i = 0; i < reds.length; i++) {
        if (reds[i][0][0] - spaceEndLength == 0 && reds[i][0][1] < gridWidth - spaceEndLength) {
            for (let j = 0; j < reds[i].length; j++) {
                reds[i][j][1] += 0.5;
            }
        }
        if (reds[i][1][1] + spaceEndLength == gridWidth  && reds[i][3][0]<gridLength-spaceEndLength) {
            // console.log("here")
            for (let j = 0; j < reds[i].length; j++) {
                reds[i][j][0] += 0.5;
            }
        }
        if (reds[i][3][0] + spaceEndLength == gridLength   && reds[i][1][1]>spaceEndLength+1) {
            for (let j = 0; j < reds[i].length; j++) {
                reds[i][j][1] -= 0.5;
            }
        }
        if (reds[i][1][1] - spaceEndLength == 1 && reds[i][0][0]>spaceEndLength) {
            for (let j = 0; j < reds[i].length; j++) {
                reds[i][j][0] -= 0.5;
            }
        }
    }
    currObj = {
        "level": 1,
        "time_interval": 500,
        "pattern": temp_tiles
    }
    return currObj
}

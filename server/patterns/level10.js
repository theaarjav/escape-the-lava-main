let gridLength = 14, gridWidth = 10;
let greenLength =  Math.floor(gridLength / 5) ;
let greenWidth =  Math.floor(gridWidth / 5) ;
let spaceEndLength = parseInt(greenLength / 2);
let totBlueTiles=(2*greenLength)*(2*greenWidth);

const green = [];
for (let i =greenLength; i < gridLength / 2 - greenLength/2 ; i++) {
    for (let j = 0; j < greenWidth; j++)green.push([i, j+greenLength]);
}
for(let i=greenLength;i<gridWidth-greenLength;i++){
    for(let j=0;j<greenLength;j++)green.push([j+greenLength, i]);
}
for (let i =gridLength/2 + greenLength/2; i < gridLength - greenLength ; i++) {
    for (let j = 0; j < greenWidth; j++)green.push([i, gridWidth-j-greenWidth-1]);
}
for(let i=greenLength;i<gridWidth-greenLength;i++){
    for(let j=0;j<greenLength;j++)green.push([gridLength-greenLength-j-1, i]);
}
var blue = [];
var currObj = {}

for (let i = 0; i < totBlueTiles; i++) {
    let flag=true;
    while(flag){  
        const x = Math.floor(Math.random() * (gridLength-1)) ;  
        const y = Math.floor(Math.random() * (gridWidth-1)) ;  
        green.forEach(([gx,gy])=>{
            if(gx===x && gy===y)flag=false;
        })
        if(flag){
            flag=false;
            blue.push([x,y]);
        }else{
            flag=true
        }
    }
}

var reds = [];
var currInd=0;
for(let i=0;i<gridLength;i+=gridLength/2){
    var temp=[];
    for(let j=0;j<gridLength/2;j++){
        for(let k=0;k<gridWidth;k++){
            temp.push([parseInt(j+i), k])
        }
    }
    reds.push(temp);
}

const getNextPattern = () => {
    var temp_tiles = Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
    green.forEach(([x, y]) => {
        temp_tiles[x][y] = 'green'
    })
    blue.forEach(([x, y]) => {
        temp_tiles[x][y] = 'blue'
    })
    reds[parseInt(currInd)].forEach(([x,y])=>{
        if(temp_tiles[x][y]!='green')temp_tiles[x][y]='red';
    })
    currInd=(currInd+0.5)%2;
    currObj = {
        "level": 1,
        "time_interval": 500,
        "pattern": temp_tiles
    }
    return currObj
}
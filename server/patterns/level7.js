let gridLength=14, gridWidth=10;
let greenLength=Math.floor(gridLength/10);
let greenWidth=Math.floor(gridWidth/10);
let totBlueTiles=(2*greenLength)+(2*greenWidth);
let spaceEndLength=2;


const blue = [];
var currObj={}
for (let i = 0; i < totBlueTiles; i++) {
    const x = Math.floor(Math.random() * (gridLength-2*greenLength)) +1;  
    const y = Math.floor(Math.random() * (gridWidth-2*greenWidth)) +1;  
    blue.push({x,y})
    
}
var redInd=0;
const reds=[];
var temp=[];
for(let i=1;i<=gridLength/2-greenLength;i++)for(let j=1;j<=gridWidth/2-greenWidth;j++)temp.push([i,j]);
reds.push(temp);
temp=[];
for(let i=1;i<=gridLength/2-greenLength;i++)for(let j=parseInt(gridWidth/2-greenWidth)+1;j<gridWidth-1;j++)temp.push([i,j]);
reds.push(temp);
temp=[];
for(let i=parseInt(gridLength/2-greenLength)+1;i<gridLength-1;i++)for(let j=parseInt(gridWidth/2-greenWidth)+1;j<gridWidth-1;j++)temp.push([i,j]);
reds.push(temp);
temp=[];
for(let i=parseInt(gridLength/2-greenLength)+1;i<gridLength-1;i++)for(let j=1;j<=gridWidth/2-greenWidth;j++)temp.push([i,j]);
reds.push(temp);
temp=[];
// console.log(reds)

const getNextPattern=()=>{
    var temp_tiles=Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
    for(let i=0;i<greenLength;i++){
        for(let j=0;j<greenWidth;j++){
            for(let k=i;k<gridLength;k++){
                for(let l=j;l<gridWidth;l++){
                    temp_tiles[k][j]='green'
                    temp_tiles[i][l]='green';          
                    temp_tiles[gridLength-i-1][l]='green';    
                    temp_tiles[k][gridWidth-j-1]='green';      
                    
                }
            }
        }
    }
    blue.forEach(({x,y})=>{
        temp_tiles[x][y]='blue'
    })        
    let i=Math.floor(redInd);
    // console.log(reds[i])
    reds[i].forEach(([x,y])=>{
    // console.log(x,y);
        temp_tiles[x][y]='red';
    })
    redInd=(redInd+0.5)%4
    currObj={
        "level":1,
        "time_interval":500,
        "pattern":temp_tiles
    }
    return currObj
}

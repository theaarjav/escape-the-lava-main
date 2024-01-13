let currInd = 0;
let gridLength=14, gridWidth=10;
let greenLengthStripes=Math.floor(gridLength/5);
let greenWidthStripes=Math.floor(gridWidth/5);
let totBlueTiles=(2*greenLengthStripes)*(2*greenWidthStripes);
const coordinates = [];
var currObj={}
for (let i = 0; i < totBlueTiles; i++) {
    const x = Math.floor(Math.random() * (gridLength-2*greenLengthStripes)) +2;  // Random integer between 2 and 5
    const y = Math.floor(Math.random() * (gridWidth-2*greenWidthStripes)) +2;  // Random integer between 2 and 9
    coordinates.push({x,y});
}

export const  getNextPattern=()=> {
    var temp_tiles=Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
    for(let i=0;i<greenLengthStripes;i++){
        for(let j=0;j<greenWidthStripes;j++){
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
    
      
        
    coordinates.forEach(({x,y})=>{
        temp_tiles[x][y]='blue'
    })        
      
      
    let redLengthStripes=greenLengthStripes+Math.floor(currInd);
    for(let i=0;i<greenLengthStripes;i++){
        for(let j=greenWidthStripes;j<gridWidth-greenWidthStripes;j++){
            temp_tiles[redLengthStripes+i][j]='red'
        }
    }

     currObj={
        "level":1,
        "time_interval":500,
        "ind":currInd,
        "pattern":temp_tiles

    }
    // console.log("Hello")
    currInd=(currInd+1);
    if(currInd>=gridLength-2*greenLengthStripes-1)currInd=0;
    return currObj
}
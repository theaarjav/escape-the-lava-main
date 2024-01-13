let gridLength=14, gridWidth=10;
let greenLength=Math.floor(gridLength/5);
let greenWidth=Math.floor(gridWidth/5);
let totBlueTiles=(2*greenLength)+(2*greenWidth);
let spaceEndLength=greenLength;

const green=[]
for(let i=0;i<gridLength;i+=5){
    for(let j=0;j<gridWidth;j+=5){
        for(let k=0;k<greenLength;k++){
            for(let l=0;l<greenWidth;l++){
               var x=i+k+spaceEndLength
               var y=j+l+spaceEndLength
               green.push([x,y]);
            }
        }
    }
}
const blue = [];
var currObj={}
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
var minRedRow=0
var minRedCol=0;
var redCols=[0];
var redRows=[0];
const plotRed=()=>{
    redCols=redCols.filter((col)=>{
        return col<gridWidth;
    })
    redRows=redRows.filter((row)=>{
        return row<gridLength;
    })
    // console.log(red)
    if(minRedRow-5>=0){
        redRows.push(minRedRow-5);
        minRedRow=minRedRow-5
    }else{
        minRedRow+=0.5;
    }
    if(minRedCol-5>=0){
        redCols.push(minRedCol-5);
        minRedCol=minRedCol-5;
    }else{
        minRedCol+=0.5;

    }
}
const spreadTile=(rows, cols, tiles)=>{
        rows.forEach((x)=>{

            if(x<gridLength){
            x=Math.floor(x);
            for(let i=0;i<gridWidth;i++){
                if(tiles[x][i]!='green')tiles[x][i]='red';
            }
        }
        })
    cols.forEach((y=>{
        
        if(y<gridWidth){
            y=Math.floor(y);
            for(let i=0;i<gridLength;i++)if(tiles[i][y]!='green')tiles[i][y]='red';
        }
    }))
    return tiles;
}
const getNextPattern=()=>{
    var temp_tiles=Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
    
      green.forEach(([x,y])=>{
        temp_tiles[x][y]='green'
      })
        
    blue.forEach(([x,y])=>{
        temp_tiles[x][y]='blue'
    })        
 
    plotRed();
    for(let i=0;i<redRows.length;i++){
        redRows[i]+=0.5;
   
    }
    for(let i=0;i<redCols.length;i++){
        redCols[i]+=0.5;
   
    }
    temp_tiles=spreadTile(redRows, redCols, temp_tiles);
    
     currObj={
        "level":1,
        "time_interval":500,
        "pattern":temp_tiles
    }
    return currObj
}
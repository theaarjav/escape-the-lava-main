let gridLength=14, gridWidth=10;
let greenLength=gridLength%2?Math.floor(gridLength/5)>2?3:1:Math.floor(gridLength/5);
let greenWidth=gridWidth%2?Math.floor(gridWidth/5)>2?3:1:Math.floor(gridWidth/5);
let totBlueTiles=(2*greenLength)+(2*greenWidth);
const green=[];
for(let i=gridLength/2-greenLength/2;i<gridLength/2+greenLength/2;i++){
    for(let j=0;j<gridWidth;j++)green.push([i,j]);
}
for(let i=0;i<gridLength;i++){
    for(let j=gridWidth/2-greenWidth/2;j<gridWidth/2+greenWidth/2;j++)green.push([i,j]);
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
var redRows=[0];
const plotRed=()=>{
    redRows=redRows.filter((row)=>{
        return row<gridLength;
    })
    // console.log(red)
    if(minRedRow-4>=0){
        redRows.push(minRedRow-4);
        minRedRow=minRedRow-4
    }else{
        minRedRow+=0.5;
    }
    
}

const getNextPattern=()=>{
    var temp_tiles=Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
    
    green.forEach(([x,y])=>{
        temp_tiles[x][y]='green'
    })        
    blue.forEach(([x,y])=>{
        temp_tiles[x][y]='blue'
    })     
    plotRed()   
    for(let i=0;i<redRows.length;i++){
        var x=Math.floor(redRows[i]);
        // console.log(x)
        for(let j=0;j<gridWidth;j++)if(temp_tiles[x][j]!='green')temp_tiles[x][j]='red';
        redRows[i]=(redRows[i]+0.5);
    }
    currObj={
        "level":1,
        "time_interval":500,
        "pattern":temp_tiles
    }
    
    return currObj
}
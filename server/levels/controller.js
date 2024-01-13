// imports
import { EVENT_TYPES } from "../constants.js";
import {level01, checkTileColour01} from "./level01.js";
import {level02, checkTileColour02} from "./level02.js";
import {level03, checkTileColour03} from "./level03.js";
import { generateGrids } from "./shared.js";

// level selection
const getSelectedLevel = (selectedLevel) => {
    switch (selectedLevel) {
        case 1:
            return level01;
            break;
    
        case 2:
            return level02;
            break;

        case 3:
            return level03;
            break;
    }
};
const getSelectedTileChecker = (selectedLevel) => {
    switch (selectedLevel) {
        case 1:
            return checkTileColour01;
            break;
    
        case 2:
            return checkTileColour02;
            break;

        case 3:
            return checkTileColour03;
            break;
    }
};

const levelController = (socket, rows, columns) => {
    let interval = null;
    let grids = generateGrids(rows, columns);
    var lvl=1;
    socket.on(EVENT_TYPES.DISCONNECT, () => {
        // stop the level
        clearInterval(interval);
    });

    socket.on(EVENT_TYPES.SELECT_LEVEL, (data) => {
        socket.on(EVENT_TYPES.DISCONNECT, () => {
            // stop the level
            clearInterval(interval);
        });
    });

    socket.on(EVENT_TYPES.STOP_LEVEL, (data) => {
        console.log(`Stop level ${data.selectedLevel}!`);

        // stop the level
        clearInterval(interval);
        interval = null;
    });
    socket.on(EVENT_TYPES.TILE_CLICK, (data)=>{
        if(data.selectedLevel==1){
            checkTileColour01(socket, data.index)
        }else if(data.selectedLevel==2){
            checkTileColour02(socket, data.index)
        }else if(data.selectedLevel==3){
            checkTileColour03(socket, data.index)
        }
    })
    socket.on(EVENT_TYPES.START_LEVEL, (data) => {
        console.log(`Start level ${data.selectedLevel}!`);
        if (interval !== null) return;

        // start the level
        const level = getSelectedLevel(data.selectedLevel);
        const {coloredGridsWithMovingRedGrids, mover} = level(grids, rows, columns, socket);
        socket.emit(EVENT_TYPES.LEVEL_GRIDS, coloredGridsWithMovingRedGrids);
        
        interval = setInterval(() => {
            mover();
        }, 500);
    });
};

export default levelController;
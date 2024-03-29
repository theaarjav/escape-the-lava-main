export const MODE = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

export const EVENT_TYPES = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    HAND_SHAKE: 'handShake',
    SELECT_LEVEL: 'selectLevel',
    START_LEVEL: 'startLevel',
    STOP_LEVEL: 'stopLevel',
    PASS_LEVEL: 'passLevel',
    FAIL_LEVEL: 'failLevel',
    UPDATE_DIMENSION: 'updateDimension',
    LEVEL_GRIDS: 'levelGrids',
    TILE_CLICK: 'tile_clicked',
    CONNECTION:"connection",
    BLINK:"blink",
    TIMER_UPDATE:"timerUpdate",
    SCORE_UPDATE:"scoreUpdate",
    LIFE_UPDATE:"lifeUpdate"
};

export const defaulRows = 24;
export const defaultColumns = 12;
export const defaultLevels = [];
export const defaulSelectedLevel = 1;
export const defaulGrids = [];
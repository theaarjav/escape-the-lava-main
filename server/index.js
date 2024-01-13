// imports
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { generateGrids } from './levels/shared.js';
import { COLORS, EVENT_TYPES, LEVELS } from './constants.js';
import levelController from './levels/controller.js';
import tileClickHandler from './interactions/tileClicked.js';
// inits
dotenv.config();

// vars
const PORT = process.env.PORT || 5000;
const CLIENT_APP_BASE_URL = process.env.CLIENT_APP_BASE_URL;

console.log(CLIENT_APP_BASE_URL);

// configs
const app = express();
app.use(cors(
    {
        origin: "http://127.0.0.1:5173",
    credentials:true
}));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        credentials:true,
        methods:["GET","PULL","PUSH"]
    }
});

// routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hey, I am your server!'
    });
});

// connection
io.on(EVENT_TYPES.CONNECTION, (socket) => {
    console.log('A new user is connected');

    // listen
    socket.on(EVENT_TYPES.HAND_SHAKE, (data) => {
        const {rows, columns} = data;
        const grids = generateGrids(rows, columns);
        const response = {
            levels: LEVELS,
            selectedLevel: 1,
        };

        socket.emit(EVENT_TYPES.HAND_SHAKE, response);
        socket.emit(EVENT_TYPES.LEVEL_GRIDS, grids.fill(COLORS.CL02));
        levelController(socket, rows, columns);
    });

    // disconnect
    // socket.on(EVENT_TYPES.TILE_CLICK, (index, grids)=>{
    //     tileClickHandler(index, grids)
    // })
    socket.on('disconnect', () => {
        console.log('User is disconnected!');
    });
});

// listen
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

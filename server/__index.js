// const express = require('express');
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io")
// const cors = require("cors");
// app.use(cors())
// const server = http.createServer(app);

// let currInd = 0;
// let gridLength = 12, gridWidth = 8;
// let greenLengthStripes = Math.round(gridLength / 5);
// let greenWidthStripes = Math.round(gridWidth / 5);
// let totBlueTiles = (2 * greenLengthStripes) * (2 * greenWidthStripes);
// const coordinates = [];
// var currObj = {}
// for (let i = 0; i < totBlueTiles; i++) {
//     const x = Math.floor(Math.random() * 8) + 2;  // Random integer between 2 and 5
//     const y = Math.floor(Math.random() * 4) + 2;  // Random integer between 2 and 9
//     coordinates.push({ x, y });
// }

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT"]

//     }
// })
// function getNextPattern() {
//     var temp_tiles = Array.from({ length: gridLength }, () => Array(gridWidth).fill(' '));
//     for (let i = 0; i < greenLengthStripes; i++) {
//         for (let j = 0; j < greenWidthStripes; j++) {
//             for (let k = i; k < gridLength; k++) {
//                 for (let l = j; l < gridWidth; l++) {
//                     temp_tiles[k][j] = 'green'
//                     temp_tiles[i][l] = 'green';
//                     temp_tiles[gridLength - i - 1][l] = 'green';
//                     temp_tiles[k][gridWidth - j - 1] = 'green';

//                 }
//             }
//         }
//     }



//     coordinates.forEach(({ x, y }) => {
//         temp_tiles[x][y] = 'blue'
//     })


//     let redLengthStripes = greenLengthStripes + currInd;
//     for (let i = 0; i < greenLengthStripes; i++) {
//         for (let j = greenWidthStripes; j < gridWidth - greenWidthStripes; j++) {
//             temp_tiles[redLengthStripes + i][j] = 'red'
//         }
//     }

//     currObj = {
//         "level": 1,
//         "time_interval": 500,
//         "pattern": temp_tiles

//     }

//     currInd = currInd + 1;
//     if (currInd >= gridLength - 2 * greenLengthStripes) currInd = 0;
//     return currObj
// }

// const tileClickHandler = (coord) => {
//     console.log(coord)
//     currObj.pattern[coord.rowIndex][coord.colIndex] = ' '
// }

// io.on("connection", (socket) => {
//     console.log("User connected: ", socket.id);
//     socket.on("tile_clicked", (data) => {
//         console.log(data)
//         tileClickHandler(data);
//         sendNextPattern()
//     })
//     const sendNextPattern = () => {
//         const currPattern = getNextPattern();
//         socket.emit("next_pattern", currPattern);
//     };

//     const intervalId = setInterval(sendNextPattern, 500);
//     // socket.on("tile_clicked")
//     socket.on('close', () => {
//         clearInterval(intervalId)
//         console.log('Client disconnected');
//     });
// })

// server.listen(3001, () => {
//     console.log(`Server running on port 3001`);
// })
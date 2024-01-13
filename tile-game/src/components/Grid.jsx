import React, { useEffect, useState } from 'react';
// import {tilePattern, removeBlueTileHandler} from '../pattern/patterns'
import io from 'socket.io-client'
import './Grid.css';

var socket = io.connect("http://localhost:3001")
const Grid = () => {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [receivedData, setReceivedData] = useState(null);

    useEffect(() => {
        console.log("hello")
        socket.on("next_pattern", (data) => {
            // console.log('Received:', data.pattern);
            setReceivedData(data)
            // console.log(data.ind)
            setTiles(data.pattern)
        });

        return () => {
            socket.off("close");
        };
    }, []);

    const clickHandler = (rowIndex, colIndex) => {
        socket.emit("tile_clicked", { rowIndex, colIndex })
        // removeBlueTileHandler(rowIndex*5+colIndex+1)
    }

    return (
        <div className='game'>
            <div className='animation-container'>

                <div className="Grid">
                    {tiles.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((tile, colIndex) => (
                                // console.log(tile)
                                <div
                                    key={colIndex}
                                    className={`tile ${tile}`}
                                    onClick={() => clickHandler(rowIndex, colIndex)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;

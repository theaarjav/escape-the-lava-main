// imports
import { useEffect, useState } from 'react';
import socket from '../socket';
import { EVENT_TYPES, defaulRows, defaultColumns, defaultLevels, defaulSelectedLevel, defaulGrids } from '../constants';
import Levels from '../components/Levels';
import Actions from '../components/Actions';
import Others from '../components/Others';

const Games = () => {
  const [rows, setRows] = useState<number>(defaulRows);
  const [columns, setColumns] = useState<number>(defaultColumns);
  const [levels, setLevels] = useState<number[]>(defaultLevels);
  const [selectedLevel, setSelectedLevel] = useState<number>(defaulSelectedLevel);
  const [grids, setGrids] = useState<string[]>(defaulGrids);
  const [livesLeft, setLivesLeft] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<Number>(30);
  const [score, setScore] = useState<Number>(0);

  useEffect(() => {
    console.log({ rows, columns, levels, selectedLevel });
  }, [rows, columns, levels, selectedLevel]);

  useEffect(() => {
    const onConnect = () => {
      console.log('Socket connected successfull!');
      socket.emit(EVENT_TYPES.HAND_SHAKE, {
        rows,
        columns,
      });
    };

    const onDisconnect = () => {
      console.log('Socket disconnected successfull!');
    };

    const onHandShake = (data: any) => {
      console.log('Socket handshake message: ', data);
      const { levels, selectedLevel } = data;
      setLevels(levels);
      setSelectedLevel(selectedLevel);
    };

    const onLevelGrids = (value: string[]) => {
      setGrids(value);
    };
    const onTimeUpdate=(time:Number)=>{
      console.log(time)
      setTimeLeft(time);
    }
    const onScoreUpdate=(score:Number)=>{
      setScore(score);
    }
    const onLivesUpdate=(lives:number)=>{
      setLivesLeft(lives);
    }
    socket.on(EVENT_TYPES.CONNECT, onConnect);
    socket.on(EVENT_TYPES.DISCONNECT, onDisconnect);
    socket.on(EVENT_TYPES.HAND_SHAKE, onHandShake);
    socket.on(EVENT_TYPES.LEVEL_GRIDS, onLevelGrids);
    socket.on(EVENT_TYPES.TIMER_UPDATE, onTimeUpdate);
    socket.on(EVENT_TYPES.SCORE_UPDATE, onScoreUpdate);
    socket.on(EVENT_TYPES.LIFE_UPDATE, onLivesUpdate);
    
    return () => {
      socket.off(EVENT_TYPES.CONNECT, onConnect);
      socket.off(EVENT_TYPES.DISCONNECT, onDisconnect);
      socket.off(EVENT_TYPES.HAND_SHAKE, onHandShake);
      socket.off(EVENT_TYPES.LEVEL_GRIDS, onLevelGrids);
      socket.on(EVENT_TYPES.TIMER_UPDATE, onTimeUpdate);
      socket.on(EVENT_TYPES.SCORE_UPDATE, onScoreUpdate);
      socket.on(EVENT_TYPES.LIFE_UPDATE, onLivesUpdate);
    };
  }, []);

  const onGameStart = () => {
    socket.emit(EVENT_TYPES.START_LEVEL, {
        selectedLevel,
    });
  };

  const onGameStop = () => {
    socket.emit(EVENT_TYPES.STOP_LEVEL, {
        selectedLevel,
    });
  };

  const onLevelChange = (e: any) => {
    const newLevel = Number(e.target.value);
    socket.emit(EVENT_TYPES.STOP_LEVEL, {
        selectedLevel,
    });
    setTimeLeft(30);
    setScore(0);
    setLivesLeft(5);
    setSelectedLevel(newLevel);
  };
  const tileClickHandler=(index:Number)=>{
    socket.emit(EVENT_TYPES.TILE_CLICK, {
      selectedLevel,
      index
    });
    console.log(index);
  }
  return (
    <div className='app'>
      <div className="panel">
        <Levels levels={levels} selectedLevel={selectedLevel} onLevelChange={onLevelChange} />
        <Actions onStart={onGameStart} onStop={onGameStop} />
        <Others livesLeft={livesLeft} timeLeft={timeLeft} score={score}/>

      </div>
      <div className="game">
        <div
          className="grids"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            color:"white"
          }}
          
        >
          {/* {msg} */}
          {grids?.map((grid, index) => (
            <div key={index} className='grid' style={{ backgroundColor: grid }} onClick={()=>tileClickHandler(index)} />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Games;
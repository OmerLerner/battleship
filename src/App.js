import './App.css';
import SetupPlayerShips from './components/SetupPlayerShips'
import React, {useState} from 'react';
import GameHandler from './components/GameHandler';
import Player from './factories/player'
import AudioButton from './components/AudioButton'



function App() {
  const [gameStart,setGameStart]= useState(false);
  const [humanPlayer,initHumanPlayer] = useState({});
  const [cpuPlayer,initCPUPlayer] = useState({});
  // const [playerData,setPlayerData]= useState([]);
  // const [playerName,setPlayerName]= useState('')

  const handleGameStart = (input,inputData,playerName) =>{
    if (input)
    {
      setGameStart(true);
      if (playerName===''){
        initHumanPlayer(new Player ('Bill Nye the Science Guy',inputData));
      }
      else{
        initHumanPlayer(new Player(playerName,inputData));
      }
      initCPUPlayer(new Player('CPU'));
    }
    return null;

  }


  
  return (
    <div className='App'>
      <AudioButton/>{
      gameStart ? 
        <GameHandler
          humanPlayer={humanPlayer}
          cpuPlayer={cpuPlayer}>
        </GameHandler>
      :
        <SetupPlayerShips
          handleGameStart={handleGameStart}>
        </SetupPlayerShips>}
    </div>
  );
}


export default App;

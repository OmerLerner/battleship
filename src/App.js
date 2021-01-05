import './App.css';
import SetupPlayerShips from './components/SetupPlayerShips'
import React, {useState} from 'react';
import GameHandler from './components/GameHandler';
import Player from './factories/player'



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

      // setPlayerData(inputData);
      // if (playerName === '')
      //   setPlayerName('Bill Nye the Science Guy');
      // else
      //   setPlayerName(playerName);
    }
    return null;

  }


  
  return (
    gameStart ? 
    <div className='App'>
      <GameHandler
        humanPlayer={humanPlayer}
        cpuPlayer={cpuPlayer}>
      </GameHandler>
    </div>
    :
    <div className="App">
      <SetupPlayerShips
        handleGameStart={handleGameStart}>
      </SetupPlayerShips>
    </div>
  );
}


export default App;

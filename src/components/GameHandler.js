import React from "react";
import Grid from "react-css-grid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faBomb} from '@fortawesome/free-solid-svg-icons'
import computerTurnGenerator from '../helpers/computerTurnGenerator'
import GameOver from './GameOver'


class GameHandler extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            activeTurn:false,
            gameOver:false,
            computerWon:false,
            gameOverMessage:'',
            currentTile:-1,
            displayText:'Awaiting your move...',
            lastComputerShotHit:false,
            lastComputerShotSunkShip:false,
            computerHitDirection:'',
            lastComputerShotIndex:-1,
        }
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    
    createBoard = (playerType) => {
        let tileArray = [];
        for (let i = 0; i < 64; i++) {
          tileArray.push(i);
        }
        if (playerType==='human')
            return this.occupyHumanTiles(tileArray);
        else
            return this.occupyComputerTiles(tileArray);
      };
    occupyComputerTiles = (tileArray) => {
        return tileArray.map((number) => (
            this.props.cpuPlayer.gameboard.board[number].isShot ?(
                this.props.cpuPlayer.gameboard.board[number].hasShip? (
                    <div
                    //Shot a ship tile//
                    className="gameboardTile hasShip isShot"
                    id={number}>
                        <FontAwesomeIcon icon={faBomb} />
                    </div>
                    ):(
                    <div
                    //Missed hit tile//
                    className="gameboardTile hasMissed"
                    id={number}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    )
                ):(
                <div
                    className="gameboardTile"
                    onMouseOver={this.handleHover}
                    onMouseLeave={this.handleLeave}
                    onClick={this.handleClick}
                    id={number}
                ></div>)
        ));
      };
      occupyHumanTiles = (tileArray) => {
        return tileArray.map((number) => (
            this.props.humanPlayer.gameboard.board[number].hasShip ?(
                this.props.humanPlayer.gameboard.board[number].isShot ? (
                    //can change selectedTile to something else
                    <div
                    className="gameboardTile hasShip isShot humanBoard"
                    id={number}>
                       <FontAwesomeIcon icon={faBomb} /> 
                    </div>
                ):(
                    <div
                    className="gameboardTile hasShip humanBoard"
                    id={number}/> 
                )
            ):(this.props.humanPlayer.gameboard.board[number].isShot ? (
                <div
                    className="gameboardTile hasMissed humanBoard"
                    id={number}>
                       <FontAwesomeIcon 
                       icon={faTimes} /> 
                    </div>
                ):(
                    <div
                    className="gameboardTile humanBoard"
                    id={number}/> 
            ))
            )
        );
      };
      handleHover(e) {
        if (!this.state.activeTurn){
            if(!e.target.classList.contains('hoverEnemyBoard'))
            {
                e.target.classList.toggle('hoverEnemyBoard');
                this.setState(
                {
                    currentTile: e.target.attributes.id.value,
                });
            }
        }
      }
      handleLeave(e){
        if (!this.state.activeTurn){
            if(e.target.classList.contains('hoverEnemyBoard'))
            {
                e.target.classList.toggle('hoverEnemyBoard');
            }
        }
      }
      //Used as a delay to simulate enemy turn
      timer = ms => new Promise(res => setTimeout(res, ms))

      handleClick(e){
        if (!this.state.activeTurn)
            this.simulateGameRound(parseInt(e.target.attributes.id.value));
      }

      async simulateGameRound(index){
        //Make sure page renders after this function
        this.setState({
            activeTurn:true,
        })
        let enemyGameboard=this.props.cpuPlayer.gameboard;
        this.handlePlayerTurn(index,enemyGameboard);
        await this.timer(1300);
        if (this.state.gameOver)
            return;
        this.setState({
            displayText: 'Your opponent is thinking...'
        })
        await this.timer(1300);
        let computerTurn = computerTurnGenerator(
                this.state.lastComputerShotIndex,
                this.state.lastComputerShotHit,
                this.state.lastComputerShotSunkShip,
                this.state.computerHitDirection,
                this.props.humanPlayer,
        )
        if (computerTurn.gameOver)
        {
            this.setState({
                lastComputerShotIndex:computerTurn.index,
                lastComputerShotHit:computerTurn.lastShotHit,
                lastComputerShotSunkShip:computerTurn.lastShotSunkShip,
                computerHitDirection:computerTurn.direction,
                displayText:computerTurn.displayText,
                gameOver:true,
                gameOverMessage:computerTurn.gameOverMessage,
                computerWon:true,
            })
        }
        else{
            this.setState({
                lastComputerShotIndex:computerTurn.index,
                lastComputerShotHit:computerTurn.lastShotHit,
                lastComputerShotSunkShip:computerTurn.lastShotSunkShip,
                computerHitDirection:computerTurn.direction,
                displayText:computerTurn.displayText,
            })
            await this.timer(1300);
            this.setState({
                displayText:'Awaiting your move...',
                activeTurn:false
            })
            await this.timer(100);
        }
        
      }
      handlePlayerTurn(index,enemyGameboard){
        enemyGameboard.board[index].isShot=true;
        let indexOfShotShip = enemyGameboard.checkForHit(index);
        if (indexOfShotShip!==-1){
            let shipName=enemyGameboard.ships[indexOfShotShip].name;
            if (enemyGameboard.checkIfSunk(indexOfShotShip)){
                if (enemyGameboard.checkIfAllShipsSunk())
                {
                    this.setState({
                        gameOver:true,
                        gameOverMessage:'Game Over! You beat the opponent!',
                        displayText:"You sunk your opponent's "+shipName+"!",
                    })
                    return true;
                }
                else
                {
                    this.setState({
                        displayText:"You sunk your opponent's "+shipName+"!",
                    });
                    return true;  
                }
            }
            else{
                //displayHitOnGameboard
                this.setState({
                    displayText:'You shot and hit an enemy ship!',
                });
                return true;
            }
        }
        else{
            //displayMissOnGameboard
            this.setState({
                displayText:'You shot and missed!',

            });
            return false;
        }
      }
    render(){
        return(
            <div className='gameContainer fade-in'>
                <div className='gameHeader'>
                    <span className='title'>BATTLESHIP</span>
                    <br/>
                    <span className='displayText'>{this.state.displayText}</span>
                </div>
                {this.state.gameOver ? 
                    <GameOver 
                        message={this.state.gameOverMessage}
                        computerWon={this.state.computerWon} /> : null}
                <div className='gameboardsContainer'>
                    <div className="playerBoard">
                        <span className='boardHeader'>{this.props.humanPlayer.name}</span>
                        <Grid width={60} height={60} gap={1}>
                            {this.createBoard('human')}
                        </Grid>
                    </div>
                    <div className="computerBoard">
                        <span className='boardHeader'>Enemy Waters</span>
                        <Grid width={60} height={60} gap={1}>
                            {this.createBoard('cpu')}
                        </Grid>
                    </div>
                </div>
                
            
            </div>  
        )
    }
    
}

export default GameHandler
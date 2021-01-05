import React, { useState } from "react";
import Grid from "react-css-grid";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faBomb, faDivide } from '@fortawesome/free-solid-svg-icons'
import computerTurnGenerator from '../helpers/computerTurnGenerator'


class GameHandler extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            activeTurn:false,
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
                    number={number}
                    id={number}>
                        <FontAwesomeIcon icon={faBomb} />
                    </div>
                    ):(
                    <div
                    //Missed hit tile//
                    className="gameboardTile hasMissed"
                    number={number}
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
                    number={number}
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
                    number={number}
                    id={number}>
                       <FontAwesomeIcon icon={faBomb} /> 
                    </div>
                ):(
                    <div
                    className="gameboardTile hasShip humanBoard"
                    number={number}
                    id={number}/> 
                )
            ):(this.props.humanPlayer.gameboard.board[number].isShot ? (
                <div
                    className="gameboardTile hasMissed humanBoard"
                    number={number}
                    id={number}>
                       <FontAwesomeIcon 
                       icon={faTimes} /> 
                    </div>
                ):(
                    <div
                    className="gameboardTile humanBoard"
                    number={number}
                    id={number}/> 
            ))
            )
        );
      };
      handleHover(e) {
        e.target.classList.toggle('hoverEnemyBoard');
        this.setState(
          {
            currentTile: e.target.attributes.number.value,
          });
      }
      handleLeave(e){
          e.target.classList.toggle('hoverEnemyBoard');
      }
      //Used as a delay to simulate enemy turn
      timer = ms => new Promise(res => setTimeout(res, ms))

      handleClick(e){
        this.simulateGameRound(parseInt(e.target.attributes.number.value));
      }

      async simulateGameRound(index){
        //Make sure page renders after this function
        let enemyGameboard=this.props.cpuPlayer.gameboard;
        this.handlePlayerTurn(index,enemyGameboard);
        await this.timer(1000);
        this.setState({
            displayText: 'Your opponent is thinking...'
        })
        await this.timer(1250);
        let computerTurn = computerTurnGenerator(
                this.state.lastComputerShotIndex,
                this.state.lastComputerShotHit,
                this.state.lastComputerShotSunkShip,
                this.state.computerHitDirection,
                this.props.humanPlayer,
        )
        console.log(computerTurn);
        this.setState({
            lastComputerShotIndex:computerTurn.index,
            lastComputerShotHit:computerTurn.lastShotHit,
            lastComputerShotSunkShip:computerTurn.lastShotSunkShip,
            computerHitDirection:computerTurn.direction,
            displayText:computerTurn.displayText,
        })
        await this.timer(1500);
        this.setState({
            displayText:'Awaiting your move...'
        })
      }
      handlePlayerTurn(index,enemyGameboard){
        enemyGameboard.board[index].isShot=true;
        let indexOfShotShip = enemyGameboard.checkForHit(index);
        if (indexOfShotShip!==-1){
            if (enemyGameboard.checkIfSunk(indexOfShotShip)){
                //Animated sinking ship on board//
                this.setState({
                    displayText:'You shot and sunk a ship!',
                });
                return true;
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
            <div className='gameContainer'>
                <div className='gameHeader'>
                    <span className='title'>BATTLESHIP</span>
                    <br/>
                    <span className='displayText'>{this.state.displayText}</span>
                </div>
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
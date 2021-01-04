import React, { useState } from "react";
import Grid from "react-css-grid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import computerTurnGenerator from '../helpers/computerTurnGenerator'


class GameHandler extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            currentTile:-1,
            displayText:'',
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
                <div
                //Create a css class that changes cursor when you want to click//
                    className="tile"
                    number={number}
                    id={number}>
                    </div>):(
                <div
                    className="tile"
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
                <div
                    className="tile"
                    number={number}
                    id={number}
          ></div>)
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
      handleClick(e){
        //Make sure page renders after this function
        let index=parseInt(e.target.attributes.number.value);
        let enemyGameboard=this.props.cpuPlayer.gameboard;
        let shotResult = this.handlePlayerTurn(index,enemyGameboard);
        //Add css classes here to toggle
        if (shotResult)
            e.target.style.backgroundColor = 'red';
        else
            e.target.style.backgroundColor = 'green';
        setTimeout(() => {  console.log("Generating computer turn"); }, 1000);
        let computerTurn=computerTurnGenerator(
            this.state.lastComputerShotIndex,
            this.state.lastComputerShotHit,
            this.state.lastComputerShotSunkShip,
            this.state.computerHitDirection,
            this.props.humanPlayer,
        );
        console.log(computerTurn);
        this.setState({
            lastComputerShotIndex:computerTurn.index,
            lastComputerShotHit:computerTurn.lastShotHit,
            lastComputerShotSunkShip:computerTurn.lastShotSunkShip,
            computerHitDirection:computerTurn.direction,
            displayText:computerTurn.displayText,
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
                    <span className='headerDisplayText'>{this.state.displayText}</span>
                </div>
                <div className='gameboardsContainer'>
                    <div className="playerBoard">
                        <Grid width={60} gap={1}>
                            {this.createBoard('human')}
                        </Grid>
                    </div>
                    <div className="computerBoard">
                        <Grid width={60} gap={1}>
                            {this.createBoard('cpu')}
                        </Grid>
                    </div>
                </div>
                
            
            </div>  
        )
    }
    
}

export default GameHandler
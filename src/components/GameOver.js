import React, { Component } from "react";
export default 
class GameOver extends Component {
    handleClick = () => {
     this.props.toggle();
    };
    render() {
    if (this.props.computerWon){
      return(
        <div className="gameOverModal">
          <div className="gameOverContent">
          <span className='modalTitle'>{this.props.message}</span>
          <button className='newGameButton' onClick={() => window.location.reload(false)}>Play Again</button>
          </div>
      </div>
      )
    }
    else{
      return(
        <div className="gameOverModal">
          <div className="gameOverContent playerWinnerModal">
          <span className='modalWinnerTitle'>{this.props.message}</span>
          <button className='newGameButton' onClick={() => window.location.reload(false)}>Play Again</button>
          </div>
      </div>
      )
    
   }}
  }
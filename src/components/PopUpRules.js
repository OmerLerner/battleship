import React, { Component } from "react";
export default 
class PopUp extends Component {
    handleClick = () => {
     this.props.toggle();
    };
    render() {
    return (
     <div className="modal">
       <div className="modal_content">
        <span className="close" onClick={this.handleClick}>&times;    </span>
        <span className='modalTitle'>Battleship Rules</span>
        <div className='gameRules'>
          Place all of your ships on the board, then input your name and press 'Start Game'.<br/><br/>
          You begin your turn by clicking a tile on the enemy board (labeled 'Enemy Waters').
          If you hit an enemy ship, you will see a red bomb and the tile will turn grey.
          If you miss, you will see a white X.
          After your shot registers, your opponent will choose a tile and simulate his turn in the same manner.<br/><br/>
          Whenever you hit all of the tiles of an enemy ship, the game will display that you sunk an enemy ship.<br/><br/>
          The first player to sink all of their opponent's ships wins the game.
        </div>
      </div>
     </div>
    );
   }
  }
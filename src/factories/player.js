import Gameboard from "./gameboard";

class Player{
    constructor(name){
        this.name=name;
        this.gameBoard=new Gameboard();
    }
    fireShot(location, gameboard) //The logic for whether the shot is legal should be in game function
    {
			gameboard.receiveShot(location);
	}
}

export default Player;
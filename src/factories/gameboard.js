class Gameboard {
    constructor (board){
        this.board = board || [];
        if (!this.board.length) this.init();
        this.ships = [];
        this.missedShots=[];
    };
    init(){
        for (let i=0; i<64;i++){
            this.board[i]={
                hasShip:false,
                isShot:false,
                index:i,
    }}};
    placeShip(ship){
        ship.position.forEach(index => {
            this.board[index].hasShip=true;
        });
        this.ships.push(ship);
    };
    recieveShot(index) 
    {
        this.board[index].isShot=true;
    }
    //If ship is hit, returns index of the ship in 'ships'. Otherwise, returns -1
    checkForHit(index){
        if (this.board[index].isShot && this.board[index].hasShip){
            for (let i=0;i<this.ships.length;i++){
                if (this.ships[i].position.includes(index)){
                    console.log("We got a hit boys!");
                    this.ships[i].hit(index);
                    return i;
                }
            }
        }
        else
        {
            this.missedShots.push(index);
            return -1;
        }
    }
    checkIfSunk(index){
        if(this.ships[index].isSunk())
        {
            this.ships.splice(index,1);
            return true;
        }
        return false;
    }
    checkIfAllShipsSunk(){
        return (this.ships.length === 0 || this.ships === undefined);
    }


}




export default Gameboard
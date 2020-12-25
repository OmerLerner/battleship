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
    }}};
    placeShip(ship){
        ship.position.forEach(index => {
            this.board[index].hasShip=true;
        });
        this.ships.push(ship);
    };
    recieveShot(index) //I may combine recieveshot & checkforhit
    {
        this.board[index].isShot=true;
    }
    checkForHit(index){
        if (this.board[index].isShot && this.board[index].hasShip){
            for (let i=0;i<this.ships.length;i++){
                if (this.ships[i].position.includes(index)){
                    this.ships[i].hit(index);
                    this.checkIfSunk(i);
                    return;
        }}}
        else
        {
            this.missedShots.push(index);
        }
    }
    checkIfSunk(index){
        if(this.ships[index].isSunk())
            this.ships.splice(index,1);
    }
    checkIfAllShipsSunk(){
        return (this.ships.length === 0 || this.ships === undefined);
    }


}




export default Gameboard
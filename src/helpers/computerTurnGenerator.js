function computerTurnGenerator(lastComputerShotIndex,lastComputerShotHit,lastComputerShotSunkShip,computerHitDirection,humanPlayer){

    //Generates a calculated coordinate based on the opponent's last hit shot
    const generateCalculatedCoordinate= (index)=>{
          //If the computer is already firing toward a certain direction (expects ship to be there)
          if (computerHitDirection!==''){
              let calculatedIndex=calculateLegalMove(index,computerHitDirection);
                if (calculatedIndex!==null)
                    return calculatedIndex;
                else
                    return cheatToFindIndex();
          }
          else 
            return generateRandomDirectionAndCoordinate(index);

    }
    //Checks if there are ship that the computer hit but didn't sink (e.g. if enemy ships are neighbors)
    const checkForHitButNotSunkShips = ()=>{
        let humanShips=humanPlayer.gameboard.ships;
        for (let i=0;i<humanShips.length;i++){
            if (humanShips[i].hits.length > 0 && !humanShips[i].isSunk())
                return i;
        }
        return -1;
      }

    //If there are ships that the computer hit but did not sink yet, the computer makes an 'educated' guess to where the rest of the ship is
    const cheatToFindIndex=()=>{
        let humanPlayerShips=humanPlayer.gameboard.ships;
        for (let ship of humanPlayerShips){
            if(ship.hits.length>0 && !ship.isSunk()){
                let lastHitOnShip=ship.hits[ship.hits.length-1];
                let indexOfHitShip=ship.position.findIndex(ship => ship===lastHitOnShip);
                let i=1;
                while (indexOfHitShip+i<ship.position.length || indexOfHitShip-i>-1){
                    if (indexOfHitShip+i<ship.position.length){
                        let index=indexOfHitShip+i;
                        if (!ship.hits.includes(ship.position[index])){
                            return generateDirectionBasedOffCoordinates(lastHitOnShip,ship.position[index]);
                            }
                    }
                    if (indexOfHitShip-i>-1){
                        let index=indexOfHitShip-i;
                        if (!ship.hits.includes(ship.position[index])){
                            return generateDirectionBasedOffCoordinates(lastHitOnShip,ship.position[index]);
                            }
                    }
                    i++;
                }
                
            }
        }
        return generateRandomCoordinate();

    }
    //Recieves two indexes, generates the direction based on the relationship between the coordinates
    const generateDirectionBasedOffCoordinates=(index1,index2)=>{
        if (index1<index2){
            //Either right or down
            if (index2-index1<8)
                return{
                    index:index2,
                    direction:'right',
                }
            else
                return{
                    index:index2,
                    direction:'down',
                }
        }
        else{
            if (index1-index2<8)
                return{
                    index:index2,
                    direction:'left',
                }
            else
                return{
                    index:index2,
                    direction:'up',
                }
        }
        
    }
    const generateRandomDirectionAndCoordinate= (index)=>{
        let direction=generateRandomDirection();
        let output;
        //An ideal solution would be to create a thread that stops after 5 seconds of trying to find a calculated coordinate, seeing as the
        //complexity of the for loop & function is very low and the probability for error is extremely small, I took this approach.
        for (let i=0;i<30;i++){
            output=calculateLegalMove(index,direction);
            if (output!==null)
                return {
                    index:output.index,
                    direction:direction
                }
            direction=generateRandomDirection();
        }
        return generateRandomCoordinate();
   

    }
    const generateRandomDirection=()=>{
        let randomIndex = Math.floor(Math.random() * 4);
        let direction='';
        switch (randomIndex){
            case 0:
                direction= 'left';
                break;
            case 1:
                direction='up';
                break;
            case 2:
                direction='right';
                break;
            case 3:
                direction='down';
                break;
            default:
                direction='Something bad happened';
                break;
        }
        return direction;
    }
    //Assume index is the last index that registered a hit, and we assume the ship is spanned across 'direction'
    const calculateLegalMove = (index,direction)=>{
        let humanBoardArray = humanPlayer.gameboard.board;
        if (direction==='left' && (index -1)%8 !==7 && index-1>-1 && !humanBoardArray[index -1].isShot)
            return {
                index: index-1,
                direction: 'left'}
        if (direction==='right' && (index +1)%8 !==0 && index+1<64 && !humanBoardArray[index +1].isShot)
            return {
                index: index+1,
                direction: 'right'}
        if (direction==='up' && (index -8)>=0 && index-8>-1 && !humanBoardArray[index-8].isShot)
            return {
                index: index-8,
                direction: 'up'}
        if (direction==='down' && (index +8)<=63 && index+8<64 && !humanBoardArray[index+8].isShot)
            return {
                index: index+8,
                direction: 'down'
            }
        return null;
      }
    const generateRandomCoordinate=()=>{
        let availableTiles=humanPlayer.gameboard.board.filter(tile => !tile.isShot);
        let randomIndex = Math.floor(Math.random() * availableTiles.length);
        return {
            index: availableTiles[randomIndex].index,
            direction: ''
    }}
    //Main function
    let targetCoordinate;
    //If the last shot hit a ship but didn't sink it yet
    if (lastComputerShotHit && !lastComputerShotSunkShip){
        targetCoordinate=generateCalculatedCoordinate(lastComputerShotIndex);
    }
    else {
        //Checks if there are still ships that the computer hit, but didn't sink
        let index=checkForHitButNotSunkShips();
        if (index!==-1){
            targetCoordinate=cheatToFindIndex();
        }
        else{
            targetCoordinate=generateRandomCoordinate();
    }}
    humanPlayer.gameboard.recieveShot(targetCoordinate.index);
    let indexOfHitShip=humanPlayer.gameboard.checkForHit(targetCoordinate.index);
    //If the shot hit a ship
    if (indexOfHitShip!==-1){
        if(humanPlayer.gameboard.checkIfSunk(indexOfHitShip)){
            if (humanPlayer.gameboard.checkIfAllShipsSunk())
                return{
                    computerWon: true,
                    displayText: 'Your opponent has won the game!'
                }
            //Shot sunk a ship, but more are still alive, eventually we will display which ship in 'displayText'
            else
                return{
                    index:targetCoordinate.index,
                    lastShotHit:true,
                    lastShotSunkShip:true,
                    direction:targetCoordinate.direction,
                    displayText:'Your opponent sunk your ship!'
                }
        }
        //Shot hit but did not sink the ship
        else
            return{
                index:targetCoordinate.index,
                lastShotHit:true,
                lastShotSunkShip:false,
                direction:targetCoordinate.direction,
                displayText:'Your opponent hit your ship!'
            }
    }
    //Shot missed the ship
    else
        return{
            index:targetCoordinate.index,
            lastShotHit:false,
            lastShotSunkShip:false,
            direction:targetCoordinate.direction,
            displayText:'Your opponent missed your ship!'
        }
    
}

export default computerTurnGenerator;
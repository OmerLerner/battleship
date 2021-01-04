import Gameboard from "./gameboard";
import Ship from './ship'
import ship_types from '../helpers/ship_types'

class Player{
    constructor(name,playerData){
        this.name=name;
        this.gameboard=new Gameboard();
        if (name==='CPU')
            this.initCPUBoard()
        else
            this.initPlayerBoard(playerData);
    }
    fireShot(location, gameboard) //The logic for whether the shot is legal should be in game function
    {
			gameboard.receiveShot(location);
	}
    initPlayerBoard(playerData)
    {
        playerData.forEach(element =>{
            let ship=new Ship (element.shipName,element.shipLocation);
            this.gameboard.placeShip(ship);
        })
    }
    initCPUBoard(){
        let cpuData = this.generateRandomShipLocations(ship_types);
        this.initPlayerBoard(cpuData);
    }
    generateRandomShipLocations(shipData){
        let cpuData=[];
        shipData.forEach(ship =>{
            let axis = this.chooseAxis();
            let coordinate= this.generateCoordinate(axis,ship.length);
            while (!this.checkForCollision(coordinate,axis,ship.length,cpuData))
                coordinate= this.generateCoordinate(axis,ship.length);
            cpuData.push({
                shipName: ship.name,
                shipLocation: this.generateShipLocation(axis,coordinate,ship.length)
            })
        })
        return cpuData;
    }
    chooseAxis(){
        if (Math.floor(Math.random() * 2) === 0)
            return 'x';
        return 'y';
    }

    generateCoordinate(axis,shipLength)
    {
        let index=Math.floor(Math.random() * Math.floor(64));
        while (!this.isValidShipLocation(index,axis,shipLength))
            index=Math.floor(Math.random() * Math.floor(64));
        return index;
    }
    isValidShipLocation(index,axis,shipLength){
        if (axis==='x')
        {
            return (index % 8) + shipLength <= 8
        }
        else
            return parseInt(index / 8) + shipLength <=8;
           
    }
    checkForCollision(coordinate,axis,shipLength,cpuData){
        if (cpuData.length === 0)
            return true;
        let shipCoordinateSpan = [];
        let placedShipsCoordinates= [];
        cpuData.forEach(ship =>
            placedShipsCoordinates=placedShipsCoordinates.concat(ship.shipLocation));
        if (axis === 'x')
            shipCoordinateSpan = this.generateShipLocation('x', coordinate, shipLength);
        else
            shipCoordinateSpan = this.generateShipLocation('y', coordinate, shipLength);
        for (let i=0;i<shipLength;i++){
            if (placedShipsCoordinates.includes(shipCoordinateSpan[i]))
                return false;
        }
        return true;


    }
    generateShipLocation(axis,startCoordinate,shipLength){
        let shipLocationCoordinates = []
        if (axis === 'x')
        {
            for (let i=0;i<shipLength;i++)
                shipLocationCoordinates.push(startCoordinate+i);
        }
        else
            for (let i=0;i<shipLength;i++)
                shipLocationCoordinates.push(startCoordinate+(i*8));
        return shipLocationCoordinates;
    }
}

export default Player;
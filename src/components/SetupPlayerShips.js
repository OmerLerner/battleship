import React, { useState } from "react";
import Grid from "react-css-grid";
import ship_types from "../helpers/ship_types";

class SetupPlayerShips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [],
      shipsToPlace: ship_types,
      currentShipIndex: 0,
      currentShipName: ship_types[0].name,
      currentShipLength:ship_types[0].length,
      gameReady: false,
      axis: "x",
      allowClick: false,
      currentTile: -1,
      shipTileSpan: [],
      occupiedTiles:[],
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleClick= this.handleClick.bind(this);
  }

  changeAxis = () => {
    this.state.axis === "x"
      ? this.setState({ axis: "y" })
      : this.setState({ axis: "x" });
  };

  createBoard = () => {
    let tileArray = [];
    for (let i = 0; i < 64; i++) {
      tileArray.push(i);
    }
    return this.occupyTiles(tileArray);
  };
  occupyTiles = (tileArray) => {
    return tileArray.map((number) => (
        this.state.occupiedTiles.includes(number)?(
            <div
                className="tile selectedTile"
                number={number}
                id={number}
      ></div>):(
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
  checkInvalidShipLocation(axis, index) {
    if (axis === "x")
      return (
        (index % 8) +
          this.state.shipsToPlace[this.state.currentShipIndex].length >8
      );
    else
      return (
        parseInt(index / 8) +
          this.state.shipsToPlace[this.state.currentShipIndex].length >8
      );
  }
  checkForCollision = (axis,index,shipLength) =>{
      if (axis==='x')
      {
          for (let i=1;i<shipLength;i++)
          {
              if (this.state.occupiedTiles.contains(index+i))
                return true;
          }
          return false;
      }
      else
        for (let i=1; i<shipLength;i++)
        {
            if (this.state.occupiesTiles.contains(index+(i*8)))
                return true;
        }
        return false;
  }
  validShipPosition = (e, index, axis) => {
    if (axis === "x") {
      if (this.checkInvalidShipLocation(axis, index)) {
        e.target.classList.toggle("invalidTile");
        this.setState({
            allowClick:false,
        }); return;
      } else
            this.handleShipTileSpan(axis);
    } else {
      if (!this.checkForCollision(axis,index) && this.checkInvalidShipLocation(axis, index)) {
        e.target.classList.toggle("invalidTile");
        this.setState({
            allowClick:false,
        })
        return;
      } else {
            this.handleShipTileSpan(axis);
      }
    }
  };

  handleHover(e) {
    this.setState(
      {
        currentTile: e.target.attributes.number.value,
      },
      () =>
        this.validShipPosition(
          e,
          e.target.attributes.number.value,
          this.state.axis
        )
    );
  }
  handleLeave() {
    this.setState({}, () =>
      this.resetBoardBackgroundColor(this.state.currentTile)
    );
  }
  handleClick = ()=>{
      if (this.state.allowClick)
      {
        console.log(this.state.shipsToPlace)
        this.setState(state=> {
            const playerData = state.playerData.concat({
                shipName:state.currentShipName,
                shipLocation:state.shipTileSpan,
            });
            const currentShipIndex = state.currentShipIndex+1;
            const occupiedTiles = state.occupiedTiles.concat(state.shipTileSpan);
            const currentShipName = state.shipsToPlace[currentShipIndex].name;
            const currentShipLength = state.shipsToPlace[currentShipIndex].length;
            const currentTile = -1;
            const shipTileSpan = [];
            console.log(occupiedTiles);
            return{
                playerData,
                currentShipIndex,
                occupiedTiles,
                currentShipName,
                currentShipLength,
                currentTile,
                shipTileSpan,
            }
        })
      }
      else
        return
      
  }
  handleShipTileSpan = (axis) =>{
    let updatedShipTileSpan = [];
    if (axis ==='x')
    {
        for (
            let i = 0;i < this.state.shipsToPlace[this.state.currentShipIndex].length;i++) {
            updatedShipTileSpan.push(Number(this.state.currentTile) + i);
          }
          updatedShipTileSpan.forEach((index) =>
            document.getElementById(index).classList.toggle("validTile")
          );
          this.setState({
            shipTileSpan: updatedShipTileSpan,
            allowClick:true,
          });
    }
    else
    {
        for (
            let i = 0;i < this.state.shipsToPlace[this.state.currentShipIndex].length;i++) {
            updatedShipTileSpan.push(Number(this.state.currentTile) + i * 8);
          }
          updatedShipTileSpan.forEach((index) =>
            document.getElementById(index).classList.toggle("validTile")
          );
          this.setState({
            shipTileSpan: updatedShipTileSpan,
            allowClick:true,
          });
    }
  }

  resetBoardBackgroundColor(tileID) {
    if (this.state.shipTileSpan.length > 0) {
      this.state.shipTileSpan.forEach((element) => {
        let tile = document.getElementById(element);
        if (tile.classList.contains("validTile"))
          tile.classList.toggle("validTile");
        if (tile.classList.contains("invalidTile"))
          tile.classList.toggle("invalidTile");
      });
      this.setState({
        shipTileSpan: [],
      });
    } else document.getElementById(tileID).classList.toggle("invalidTile");
  }

  render() {
    return (
      <div className="displayContainer">
        <div className="displayContent">
          <span className="displayText">{this.state.currentShipIndex}</span>
          <br />
          <button className="axisToggle" onClick={this.changeAxis}>
            Axis : {this.state.axis}
          </button>
        </div>
        <div className="playerShipSetup">
          <Grid width={60} gap={1}>
            {this.createBoard()}
          </Grid>
        </div>
      </div>
    );
  }
}

export default SetupPlayerShips;

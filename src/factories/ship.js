

class Ship{
    constructor(name,position){
        this.name=name;
        this.position=position; //An array of the position on the grid
        this.hits=[];
    }

    hit(index) 
    {
        if (this.position.includes(index))
            this.hits.push(index);
    }
    isSunk(){
        return this.position.every((occupiedCell) =>
        this.hits.includes(occupiedCell)
    );
    }


}

export default Ship;
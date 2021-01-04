import Gameboard from '../factories/gameboard'
import Ship from '../factories/ship'


describe('Gameboard functions', () => {
    let testBoard;
    const fakeSubmarine = new Ship ('Submarine',[24,25,26]);
    const fakeCruiser = new Ship ('Cruiser',[16,17,18]);
	beforeEach(() => {
		testBoard = new Gameboard();
    });

    it('Initializes gameboard with 64 cells', () => {
		const arr = [];
		for (let i = 0; i < 64; i++) {
			arr.push({ hasShip: false, isShot: false });
		}
		expect(testBoard.board).toEqual(arr);
    });
    it('Place a ship on the board',()=>{
        testBoard.placeShip(fakeSubmarine);
        for (let i=24;i<27;i++)
            expect(testBoard.board[i]).toEqual(
                {
                    hasShip:true,
                    isShot:false,
                });
        expect(testBoard.ships).toContain(fakeSubmarine);
    });
    it ('Missed shot registers on board',()=>{
        testBoard.placeShip(fakeSubmarine);
        testBoard.recieveShot(28);
        expect(testBoard.checkForHit(28)).toEqual(-1);
        expect(testBoard.board[28]).toEqual(
            {
                hasShip:false,
                isShot:true,
            });
        expect(testBoard.missedShots).toEqual([28]);
    });
    it ('Shot registers on board when ship is hit',()=>{
        testBoard.placeShip(fakeSubmarine);
        testBoard.recieveShot(24);
        expect(testBoard.checkForHit(24)).toEqual(0);
        expect(testBoard.board[24]).toEqual(
            {
                hasShip:true,
                isShot:true,
            });
        expect(testBoard.ships[0].hits).toEqual([24]);
    });
    it ('Checks if ship sinks & removed from gameboard',()=>{
        testBoard.placeShip(fakeSubmarine);
        testBoard.placeShip(fakeCruiser);
        testBoard.recieveShot(24);
        expect(testBoard.checkForHit(24)).toEqual(0);
        testBoard.recieveShot(25);
        expect(testBoard.checkForHit(25)).toEqual(0);
        testBoard.recieveShot(26);
        expect(testBoard.checkForHit(26)).toEqual(0);
        expect(testBoard.checkIfSunk(0)).toBeTruthy();
        expect(testBoard.ships).toEqual([fakeCruiser]);
    });
    it ('Checks if all ships on board sunk',()=>{
        testBoard.placeShip(fakeSubmarine);
        testBoard.recieveShot(24);
        expect(testBoard.checkForHit(24)).toEqual(0);
        testBoard.recieveShot(25);
        expect(testBoard.checkForHit(25)).toEqual(0);
        testBoard.recieveShot(26);
        expect(testBoard.checkForHit(26)).toEqual(0);
        testBoard.checkIfSunk(0);
        expect(testBoard.checkIfAllShipsSunk()).toBeTruthy();
    });
    it ('Check if board records missed shots',()=>{
        testBoard.recieveShot(2);
        expect(testBoard.checkForHit(2)).toEqual(-1);
        testBoard.recieveShot(4);
        expect(testBoard.checkForHit(4)).toEqual(-1);
        testBoard.recieveShot(8);
        expect(testBoard.checkForHit(8)).toEqual(-1);
        expect(testBoard.missedShots).toEqual([2,4,8]);

    })
});
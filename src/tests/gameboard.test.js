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
        testBoard.checkForHit(28);
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
        testBoard.checkForHit(24);
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
        testBoard.checkForHit(24);
        testBoard.recieveShot(25);
        testBoard.checkForHit(25);
        testBoard.recieveShot(26);
        testBoard.checkForHit(26);
        expect(testBoard.ships).toEqual([fakeCruiser]);
    });
    it ('Checks if all ships on board sunk',()=>{
        testBoard.placeShip(fakeSubmarine);
        testBoard.recieveShot(24);
        testBoard.checkForHit(24);
        testBoard.recieveShot(25);
        testBoard.checkForHit(25);
        testBoard.recieveShot(26);
        testBoard.checkForHit(26);
        expect(testBoard.checkIfAllShipsSunk()).toBeTruthy();
    });
    it ('Check if board records missed shots',()=>{
        testBoard.recieveShot(2);
        testBoard.checkForHit(2);
        testBoard.recieveShot(4);
        testBoard.checkForHit(4);
        testBoard.recieveShot(8);
        testBoard.checkForHit(8);
        expect(testBoard.missedShots).toEqual([2,4,8]);

    })
});
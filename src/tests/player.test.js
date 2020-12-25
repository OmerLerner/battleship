import Player from '../factories/player';

describe('Player functions', ()=>{
    let player;
	let testBoard;
	beforeEach(() => {
		// instantiate player
		player = new Player('Johnny');
		// create and fill mock opponent board
		testBoard = {
			oppBoard: [],
			receiveShot: jest.fn((loc) => {
				testBoard.oppBoard[loc] = 'miss';
				return true;
			}),
			opponentBoard: jest.fn(() => {
				return testBoard.oppBoard;
			}),
		};
		const arr = [];
		for (let i = 0; i < 64; i++) {
			arr.push('empty');
		}
		testBoard.oppBoard = arr;
    });
    it('Create a player with a name', () => {
		expect(player.name).toEqual('Johnny');
    });
    it ('Check if a shot registers on the opponent board', ()=>{
        player.fireShot(22,testBoard);
        expect(testBoard.receiveShot.mock.calls.length).toBe(1);
    })

});
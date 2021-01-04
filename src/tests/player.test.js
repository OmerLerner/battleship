import Player from '../factories/player';

describe('Player functions', ()=>{
	let player;
	let cpu;
	let testBoard;
	beforeEach(() => {
		// instantiate player
		player = new Player('Johnny',[
			{
				shipName: 'Battleship',
				shipLocation: [12,13,14,15],
			},
			{
				shipName: 'Oompa Loompa',
				shipLocation:[1,2,3]
			}
		]);
		cpu = new Player ('CPU');
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
		//create and fill mock player board
		const arr = [];
		for (let i = 0; i < 64; i++) {
			arr.push('empty');
		}
		testBoard.oppBoard = arr;
    });
    it('Create a player with a name', () => {
		expect(player.name).toEqual('Johnny');
		expect(player.gameboard.ships.length).toEqual(2);
	});
	it ('Create a computer player', ()=> {
		expect(cpu.name).toEqual('CPU');
		expect(cpu.gameboard.ships.length).toEqual(5);
	})
    it ('Check if a shot registers on the opponent board', ()=>{
        player.fireShot(22,testBoard);
        expect(testBoard.receiveShot.mock.calls.length).toBe(1);
    })

});
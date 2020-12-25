import Ship from '../factories/ship';

describe('Ship functions', () => {
	// assign variables to avoid beforeEach scoping issues
	let testCarrier;
    let testSubmarine;
    beforeEach(() => {
		testCarrier = new Ship('carrier', [0, 1, 2, 3, 4]);
		testSubmarine = new Ship('submarine', [12, 13, 14]);
    });
    it('Ship gets hit', () => {
		testCarrier.hit(0);
		expect(testCarrier.hits).toEqual([0]);
    });
    it('Ship prevents getting hit if input is invalid', () => {
		testCarrier.hit(6);
		expect(testCarrier.hits).toEqual([]);
    });
    it('Ship accepts multiple hits',() =>{
        testSubmarine.hit(12);
        testSubmarine.hit(13);
        expect(testSubmarine.hits).toEqual([12,13]);
    });
    it('Checks if ship sinks after being hit in all locations', ()=>{
        testSubmarine.hit(13);
        testSubmarine.hit(12);
        expect(testSubmarine.isSunk()).toEqual(false);
        testSubmarine.hit(14);
        expect(testSubmarine.isSunk()).toEqual(true);
    })
	
});
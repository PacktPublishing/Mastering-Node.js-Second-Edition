
let Capitalizer = require('../scripts/Capitalizer.js');
let capitalizer = new Capitalizer();

describe('Testing #capitalize', () => {

    let arr = ['a','b','c','d','e'];
    let mock = sinon.mock(capitalizer);

    it('#capitalize works', () => {

        // Expectations
        mock.expects("capitalize").exactly(5).withArgs.apply(sinon, arr);

        // Actuality
        arr.map(capitalizer.capitalize);

        // Verification
        expect(mock.verify()).to.be.true;
    });
});
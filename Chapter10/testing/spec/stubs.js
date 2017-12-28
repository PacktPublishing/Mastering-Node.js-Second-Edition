let Caller = require('../scripts/Caller.js');

describe('Testing endpoint responses', () => {
    let caller = new Caller();
    function setTestForCode(code) {
        return done => {
            sinon.stub(caller, 'makeCall').yields(caller.parseResponse({
                statusCode: code
            }));
            caller.makeCall('anyURLWillDo', h => {
                expect(h).to.be.a('string').and.equal('handled');
                done();
            });
        }
    }

    afterEach(() => caller.makeCall.restore());

    it('Tests 200 handling', setTestForCode(200));
    it('Tests 404 handling', setTestForCode(404));
    it('Tests 403 handling', setTestForCode(403));
});
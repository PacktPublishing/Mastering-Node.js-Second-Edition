const redis = require("redis");
const client = redis.createClient();

describe('Mocking pub/sub', () => {
    let mock = sinon.mock(client);
    mock.expects('subscribe').withExactArgs('channel').once();

    it('tests that #subscribe is being called correctly', () => {

        client.subscribe('channel');

        // Uncomment to cause test to fail
        //client.subscribe('channel');

        expect(mock.verify()).to.be.true;
    });
});


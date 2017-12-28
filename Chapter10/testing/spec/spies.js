const redis = require("redis");
const client1 = redis.createClient();
const client2 = redis.createClient();

// Testing this
function nowPublish(channel, msg) {
    client2.publish(channel, msg);
}

describe('Testing pub/sub', () => {
    before(() => {
        sinon.spy(client1, "subscribe");
    });

    after(() => {
        client1.subscribe.restore();
    });

    it('tests that #subscribe works', () => {
        client1.subscribe("channel");
        expect(client1.subscribe.calledOnce);
    });

    it('tests that #nowPublish works', done => {
        var callback = sinon.spy();
        client1.subscribe('channel', callback);
        client1.on('subscribe', () => {
            nowPublish('channel', 'message');
            expect(callback.calledWith('message'));
            expect(client1.subscribe.calledTwice);
            done();
        });
    });
});


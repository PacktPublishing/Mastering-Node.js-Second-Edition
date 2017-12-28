const Nightmare = require('nightmare');

Nightmare.action('getLinkText', function(selector, done) {
    // `this` is the nightmare instance
    this.evaluate_now(selector => {
        return document.querySelector(selector).href;
    }, done, selector)
});

describe(`Nightmare`, function() {

    this.timeout('20s');

    let nightmare;

    beforeEach(() => nightmare = Nightmare({
        show: false
    }));

    afterEach(function(done) {
        nightmare.end(done);
    });

    it(`Title should be 'Example Domain'`, function(done) {
        nightmare
        .goto('http://www.example.org')
        .title()
        .then(title => expect(title).to.equal(`Example Domain`))
        .then(() => done())
        .catch(done)
    });

    it('Yahoo search should find Nightmare homepage', done => {
        nightmare
        .goto('http://www.yahoo.com')
        .type('form[action*="/search"] [name=p]', 'nightmare.js')
        .click('form[action*="/search"] [type=submit]')
        .wait('#main')
        .evaluate(() => document.querySelector('#main .searchCenterMiddle li a').href)
        .then(result => expect(result).to.equal(`http://www.nightmarejs.org/`))
        .then(() => done())
        .catch(done);
    })

    it('Action > Yahoo search should find Nightmare homepage', done => {
        nightmare
        .goto('http://www.yahoo.com')
        .type('form[action*="/search"] [name=p]', 'nightmare.js')
        .click('form[action*="/search"] [type=submit]')
        .wait('#main')
        .getLinkText('#main .searchCenterMiddle a')
        .then(result => expect(result).to.equal(`http://www.nightmarejs.org/`))
        .then(() => done())
        .catch(done);
    })
});





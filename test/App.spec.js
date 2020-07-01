describe('The header', function() {
    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8080');
    });

    after(async function() {
        await page.close();
    })

    it('should show name of app', async function() {
        const SELECT_H1 = 'h1';
        let heading;
        await page.waitFor(SELECT_H1);
        heading = await page.$eval(SELECT_H1, heading => heading.innerText);

        expect(heading).to.eql('PONG');
    });

    it('you can start the game', async function() {
        await page.evaluate(() => document.querySelector('canvas')
            .click());

        let content = await page.evaluate(() => document.querySelector('h4').textContent);
        assert.equal(content, 'single-player game');
    });




});
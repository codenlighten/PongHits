//copied from: https://thecodebarbarian.com/testing-vue-apps-with-puppeteer-and-mocha.html

const puppeteer = require('puppeteer');

run().then(() => console.log('Done')).catch(error => console.log(error));

async function run() {
    // Create a new Chromium browser. `slowMo` means Chrome waits for 250ms
    // between operations, so you can see what's happening.
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();
    await page.goto('https://google.com');

    // Type "Vue" into the search bar
    await page.evaluate(() => {
        document.querySelector('input[name="q"]').value = 'Bob Dylan';
    });

    // Click on the "Google Search" button and wait for the page to load
    const waitForLoad = new Promise(resolve => page.on('load', () => resolve()));
    await page.evaluate(() => {
        document.querySelector('input[value="Google Search"]').click();
    });
    await waitForLoad;

    // Get the contents of the first link in the search results. Should be
    // "https://vuejs.org/"

    const firstLink = await page.evaluate(() => document.querySelector('#search link').getAttribute('href'));
    console.log(firstLink);

    await browser.close();
}
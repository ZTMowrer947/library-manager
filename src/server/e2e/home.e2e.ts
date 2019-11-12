// Imports
import puppeteer from "puppeteer";

// Test Suite
describe("Home page (E2E)", () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    // Run before all tests
    beforeAll(async () => {
        // Launch browser
        browser = await puppeteer.launch({
            headless: false,
        });
    });

    // Run before each test
    beforeEach(async () => {
        // Open new page
        page = await browser.newPage();

        // Set viewport and user agent
        page.emulate({
            viewport: {
                width: 800,
                height: 600,
            },
            userAgent: "",
        });
    });

    // Run after each test
    afterEach(async () => {
        // Close page
        await page.close();
    });

    // Run after all tests
    afterAll(async () => {
        // Close browser
        await browser.close();
    });

    it("should load correctly", async () => {
        // Go to book listing
        await page.goto("http://localhost:53035");

        // Wait for table data
        await page.waitForSelector("table.table");
    });
});

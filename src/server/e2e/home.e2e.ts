// Imports
import puppeteer from "puppeteer";

// Test Suite
describe("Home page (E2E)", () => {
    it("should load correctly", async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        page.emulate({
            viewport: {
                width: 800,
                height: 600,
            },
            userAgent: "",
        });
        await page.goto("http://localhost:53035/books");
        await page.waitForSelector("table.table");
        const html = await page.content();
        console.log(html);
        browser.close();
    });
});

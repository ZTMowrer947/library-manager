// Imports
import cheerio from "cheerio";

// Test Suite
describe("Home page", () => {
    it("should load correctly", async () => {
        // Go to book listing
        await page.goto("http://localhost:53035");

        // Wait for table data
        await page.waitForSelector("table.table");

        // Get page content
        const html = await page.content();

        // Load into cheerio
        const $ = cheerio.load(html);

        // Expect header to have correct text
        expect($("h1").text()).toBe("Book Listing");

        // Expect "Add New Book" button to be present
        expect($("p a.btn").text()).toBe("Add New Book");

        // Get table headings
        const $tableHeadings = $("th[scope=col]");

        // Define expected headings
        const expectedHeadings = ["Title", "Author", "Genre", "Year"];

        $tableHeadings.each((index, element) => {
            // Expect heading to match expected heading
            expect($(element).text()).toBe(expectedHeadings[index]);
        });

        // Expect there to be 15 book entries
        expect($("tbody tr").length).toBe(15);
    });
});

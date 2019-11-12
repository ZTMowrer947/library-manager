// Imports
import $ from "jquery";
import "bootstrap";
import "bootstrap/scss/bootstrap";
import "./index.scss";

// Constants
const itemsPerPage = 10;

// Functions
function appendPagination(): void {
    // Get all books
    const $books = $("table tbody tr");

    // Get number of books
    const bookCount = $books.toArray().length;

    // Determine number of pages to create
    const pageCount = Math.ceil(bookCount / itemsPerPage);

    // Create pagination list
    const $pagination = $("<ul>").addClass("pagination");

    // For each page,
    for (let i = 1; i <= pageCount; i++) {
        // Determine start and end indices of page
        const startIndex = (i - 1) * 10;
        const endIndex = Math.min((i - 1) * 10 + 9, bookCount);

        // Create page button
        const $pageBtn = $("<button>")
            // Add page-link class
            .addClass("page-link")

            // Add page number as text
            .text(i)

            // Add click handler
            .on("click", function() {
                // Remove active class from other page items
                $(this)
                    // Go to parent element
                    .parent()

                    // Go to siblings of that element
                    .siblings(".page-item")

                    // Remove active class
                    .removeClass("active");

                // Add active class to this page item
                $(this)
                    // Go to parent element
                    .parent()

                    // Add active class
                    .addClass("active");

                // For each book,
                $books.each(function(index) {
                    // If index is between page indices,
                    if (index >= startIndex && index <= endIndex) {
                        // Show book entry
                        $(this).removeClass("d-none");
                    } else {
                        // Otherwise, hide book entry
                        $(this).addClass("d-none");
                    }
                });
            });

        // Create page item
        const $pageItem = $("<li>").addClass("page-item");

        // Append button to page item
        $pageItem.append($pageBtn);

        // Append page item to pagination
        $pagination.append($pageItem);
    }

    // Append pagination to page
    $pagination.insertAfter("table");

    // Emit click event on page 1
    $pagination
        .children(".page-item")
        .first()
        .children(".page-link")
        .trigger("click");
}

// Run on page load
$(() => {
    switch (document.location.pathname) {
        case "/books":
            appendPagination();
            break;
    }
});

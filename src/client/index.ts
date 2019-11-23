// Imports
import $ from "jquery";
import * as Yup from "yup";
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

function addBookFormValidation(): void {
    // Define form schema
    const schema = Yup.object().shape({
        title: Yup.string().required("Title is a required field."),
        author: Yup.string().required("Author is a required field."),
        genre: Yup.string().notRequired(),
        year: Yup.number()
            .integer("Year must be a valid integer")
            .typeError("Year must be a valid number")
            .notRequired(),
    });

    $("form input").on("blur", function() {
        // Get field id
        const id = $(this).attr("id") ?? "";

        // Remove validation errors from DOM
        $(this).removeClass("is-invalid");
        $(this)
            .siblings(".invalid-feedback")
            .remove();

        // Get schema for field
        const fieldSchema = Yup.reach(schema, id);

        try {
            // Validate field
            fieldSchema.validateSync($(this).val() || undefined);
        } catch (error) {
            // If validation error occurred, cast to appropriate type
            const validationError: Yup.ValidationError = error;

            // Add invalid class
            $(this).addClass("is-invalid");

            // Create feedback div
            const $feedback = $("<div>").addClass("invalid-feedback");

            // Create validation error message
            const $message = $("<p>").text(validationError.message);

            // Append message to feedback div
            $feedback.append($message);

            // Insert feedback div after failed input
            $feedback.insertAfter($(this));
        }
    });

    $("form").on("submit", function(event) {
        // Get form data
        const formData = {
            title: $("input#title").val() || undefined,
            author: $("input#author").val() || undefined,
            genre: $("input#genre").val() || undefined,
            year: $("input#year").val() || undefined,
        };

        // Remove validation errors from DOM
        $(".is-invalid").removeClass("is-invalid");
        $(".invalid-feedback").remove();

        try {
            // Validate form data using schema
            schema.validateSync(formData, { abortEarly: false });
        } catch (error) {
            // If validation error occurred, cast to appropriate type
            const validationError: Yup.ValidationError = error;

            // Stop form submission
            event.preventDefault();

            // For each validation error
            validationError.inner.forEach(err => {
                // Add invalid class
                $(`input#${err.path}`).addClass("is-invalid");

                // Create feedback div
                const $feedback = $("<div>").addClass("invalid-feedback");

                // Create validation error message
                const $message = $("<p>").text(err.message);

                // Append message to feedback div
                $feedback.append($message);

                // Insert feedback div after failed input
                $feedback.insertAfter($(`input#${err.path}`));
            });
        }
    });
}

// Run on page load
$(() => {
    const path = document.location.pathname;

    if (path === "/books") appendPagination();
    else if (/^\/books\/(new|[A-Z2-7]{24})$/.test(path))
        addBookFormValidation();
});

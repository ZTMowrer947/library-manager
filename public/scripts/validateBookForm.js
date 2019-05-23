// Validate form
function validateForm(e) {
    // Remove previous validation errors
    $(".error").remove();

    // Get values from form to validate
    const title = $("#title").val();
    const author = $("#author").val();
    const year = $("#year").val();

    // Declare array of validation error handlers
    const validationErrors = [];

    // Validate title
    if (title === undefined || title === null) // Title must not be null
        validationErrors.push("Book title must contain a value");
    else if (title === "")  // Title must not be an empty string
        validationErrors.push("Book title must not be empty");

    // Validate author
    if (author === undefined || author === null) // Author must not be null
        validationErrors.push("Book author must contain a value");
    else if (author === "")  // Author must not be an empty string
        validationErrors.push("Book author must not be empty");

    // Validate year
    if (year === undefined || year === null) // Year must not be null
        validationErrors.push("Book year must contain a value");
    else if (isNaN(parseInt(year))) // Year must be an integer value
        validationErrors.push("Book year must be a valid integer");

    // If there are any validation errors,
    if (validationErrors.length > 0) {
        // Prevent form submission
        e.preventDefault();

        // Create validation heading
        const $validationHeading = $("<h2>")
            .addClass("error")
            .text("Validation Errors");

        // Create unordered list of errors
        const $validationUl = $("<ul>")
            .addClass("error");

        // For each validation error,
        validationErrors.forEach(error => {
            // Create error list item
            const $li = $("<li>").text(error);

            // Append error to list
            $validationUl.append($li);
        });

        // Prepend validation list and heading to form
        $("form").prepend($validationHeading, $validationUl);
    }
}

// After the DOM has finished loading,
$(() => {
    // Attach submit handler to book form
    $("form").on("submit", e => {
        // Validate the form
        validateForm(e);   
    });
});

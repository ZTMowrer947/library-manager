// Imports
const Sequelize = require("sequelize");
const sequelize = require("../dbConnection");

// Model
class Book extends Sequelize.Model {}
Book.init({
    id: {
        // Data Type
        type: Sequelize.INTEGER,

        // Auto-increment ID
        autoIncrement: true,

        // Primary key (Unique and non-null)
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,

        // Do not allow null values
        allowNull: false,

        // Validation
        validate: {
            // Do not allow null values
            notNull: {
                msg: "Book title must contain a value",
            },

            // Don't allow empty strings
            notEmpty: {
                msg: "Book title must not be empty",
            },
        },
    },
    author: {
        type: Sequelize.STRING,

        // Do not allow null values
        allowNull: false,

        // Validation
        validate: {
            // Do not allow null values
            notNull: {
                msg: "Book author must contain a value",
            },

            // Don't allow empty strings
            notEmpty: {
                msg: "Book author must not be empty",
            },
        },
    },
    genre: Sequelize.STRING,
    year: {
        type: Sequelize.INTEGER,

        // Do not allow null values
        allowNull: false,

        // Validation
        validate: {
            // Do not allow null values
            notNull: {
                msg: "Book year must contain a value",
            },

            // Ensure value is a valid integer
            isInt: {
                msg: "Book year must be a valid integer",
            },
        },
    },
}, {
    sequelize,
    modelName: "Books",
});

// Export
module.exports = Book;

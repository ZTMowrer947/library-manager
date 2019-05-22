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
            notNull: true,

            // Don't allow empty strings
            notEmpty: true,
        },
    },
    author: {
        type: Sequelize.STRING,

        // Do not allow null values
        allowNull: false,

        // Validation
        validate: {
            // Do not allow null values
            notNull: true,

            // Don't allow empty strings
            notEmpty: true,
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
            notNull: true,

            // Ensure value is a valid integer
            isInt: true,
        },
    },
}, {
    sequelize,
    modelName: "Books",
});

// Export
module.exports = Book;

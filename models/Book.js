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
        
        // Ensure that this column has a value before being saved
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: "Books",
});

// Export
module.exports = Book;

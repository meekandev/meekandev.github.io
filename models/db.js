const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false // Disable logging SQL queries
});

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Initialize database
async function initializeDatabase() {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

module.exports = {
    sequelize,
    testConnection,
    initializeDatabase
};

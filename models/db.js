const { Sequelize } = require('sequelize');
const path = require('path');
const seedDatabase = require('./seedData');

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
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

// Initialize database
async function initializeDatabase() {
    try {
        const Drink = require('./Drink');
        await sequelize.sync({ force: true }); // This will drop and recreate tables
        await seedDatabase(Drink);
        console.log('Database initialized and seeded successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

module.exports = {
    sequelize,
    testConnection,
    initializeDatabase
};

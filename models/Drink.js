const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Drink = sequelize.define('Drink', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    iced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    menuBuildHot: {
        type: DataTypes.JSON,
        allowNull: true
    },
    menuBuildIced: {
        type: DataTypes.JSON,
        allowNull: true
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instructions: {
        type: DataTypes.JSON,
        allowNull: true
    },
    hotBuild: {
        type: DataTypes.JSON,
        allowNull: true
    },
    icedBuild: {
        type: DataTypes.JSON,
        allowNull: true
    },
    build: {
        type: DataTypes.JSON,
        allowNull: true
    },
    whippedCream: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    topping: {
        type: DataTypes.STRING,
        allowNull: true
    },
    layered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Drink;

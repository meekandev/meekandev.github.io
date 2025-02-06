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
    description: {
        type: DataTypes.TEXT
    },
    recipe: {
        type: DataTypes.TEXT
    },
    customizations: {
        type: DataTypes.TEXT,
        get() {
            const rawValue = this.getDataValue('customizations');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('customizations', JSON.stringify(value));
        }
    }
});

module.exports = Drink;

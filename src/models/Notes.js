const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Notes = sequelize.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: 'no categorized'
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['active', 'archived']]
        }
    },
});



module.exports = Notes;
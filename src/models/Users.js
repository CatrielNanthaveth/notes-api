const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Notes = require("./Notes");

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Notes, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

Notes.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
})
module.exports = User;
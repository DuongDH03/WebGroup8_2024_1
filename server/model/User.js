const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    tel: { type: DataTypes.STRING(15) },
    password: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: 'User',
    schema: 'public',
    timestamps: false
});

module.exports = User;

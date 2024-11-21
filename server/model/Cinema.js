const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Cinema = sequelize.define('Cinema', {
    cinema_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING(15) },
    city: { type: DataTypes.STRING(100) },
    state: { type: DataTypes.STRING(100) }
}, {
    tableName: 'cinemas',
    schema: 'public',
    timestamps: false
});

module.exports = Cinema;

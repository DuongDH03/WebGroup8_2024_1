const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Genre = sequelize.define('Genre', {
    genre_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    genre_name: { type: DataTypes.STRING(100), allowNull: false }
}, {
    tableName: 'genre',
    schema: 'public',
    timestamps: false
});

module.exports = Genre;

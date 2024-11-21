const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Cinema = require('./Cinema');

const Room = sequelize.define('Room', {
    room_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cinema_id: { type: DataTypes.INTEGER },
    room_name: { type: DataTypes.STRING }
}, {
    tableName: 'room',
    schema: 'public',
    timestamps: false
});

Room.belongsTo(Cinema, { foreignKey: 'cinema_id' });

module.exports = Room;

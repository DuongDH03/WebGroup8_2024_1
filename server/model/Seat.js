const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Room = require('./Room');

const Seat = sequelize.define('Seat', {
    seat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    seat_row: { type: DataTypes.STRING(5) },
    seat_col: { type: DataTypes.STRING(5) },
    seat_status: { type: DataTypes.ENUM('available', 'booked') },
    room_id: { type: DataTypes.INTEGER }
}, {
    tableName: 'seat',
    schema: 'public',
    timestamps: false
});

Seat.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = Seat;

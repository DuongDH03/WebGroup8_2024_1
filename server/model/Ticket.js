const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Booking = require('./Booking');
const Seat = require('./Seat');
const Cinema = require('./Cinema');

const Ticket = sequelize.define('Ticket', {
    ticket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    booking_id: { type: DataTypes.INTEGER },
    seat_id: { type: DataTypes.INTEGER },
    cinema_id: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL(10, 2) },
}, {
    tableName: 'ticket',
    schema: 'public',
    timestamps: false
});

Ticket.belongsTo(Booking, { foreignKey: 'booking_id' });
Ticket.belongsTo(Seat, { foreignKey: 'seat_id' });
Ticket.belongsTo(Cinema, { foreignKey: 'cinema_id' });

module.exports = Ticket;

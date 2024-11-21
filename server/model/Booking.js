const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User');
const Schedule = require('./Schedule');

const Booking = sequelize.define('Booking', {
    booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    schedule_id: { type: DataTypes.INTEGER },
    total_price: { type: DataTypes.DECIMAL(10, 2) },
    booking_date: { type: DataTypes.DATE }
}, {
    tableName: 'booking',
    schema: 'public',
    timestamps: false
});

Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Schedule, { foreignKey: 'schedule_id' });

module.exports = Booking;

const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User');

const Coupon = sequelize.define('Coupon', {
    coupon_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coupon_name: { type: DataTypes.STRING(100), allowNull: false },
    user_id: { type: DataTypes.INTEGER },
    expiry_date: { type: DataTypes.DATE }
}, {
    tableName: 'coupon',
    schema: 'public',
    timestamps: false
});

Coupon.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Coupon;

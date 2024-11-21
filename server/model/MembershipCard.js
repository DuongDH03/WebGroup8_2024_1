const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const MembershipCard = sequelize.define('MembershipCard', {
    membership_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    issue_date: { type: DataTypes.DATE },
    expiry_date: { type: DataTypes.DATE },
    points_accumulated: { type: DataTypes.INTEGER },
    is_activated: { type: DataTypes.BOOLEAN }
}, {
    tableName: 'membership_cards',
    schema: 'public',
    timestamps: false
});

module.exports = MembershipCard;

const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Crew = sequelize.define('Crew', {
    crew_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    crew_name: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    crew_role: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    }
}, {
    tableName: 'crew',
    schema: 'public',
    timestamps: false
});

module.exports = Crew;
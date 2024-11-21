const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Cinema = require('./Cinema');
const Movie = require('./Movie');
const Room = require('./Room');

const Schedule = sequelize.define('Schedule', {
    schedule_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cinema_id: { type: DataTypes.INTEGER },
    movie_id: { type: DataTypes.INTEGER },
    room_id: { type: DataTypes.INTEGER },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE }
}, {
    tableName: 'schedule',
    schema: 'public',
    timestamps: false
});

Schedule.belongsTo(Cinema, { foreignKey: 'cinema_id' });
Schedule.belongsTo(Movie, { foreignKey: 'movie_id' });
Schedule.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = Schedule;

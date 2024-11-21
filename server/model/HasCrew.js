// server/model/HasCrew.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Movie = require('./Movie');
const Crew = require('./Crew');

const HasCrew = sequelize.define('HasCrew', {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Movie,
          key: 'movie_id',
        },
      },
      crew_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Crew,
          key: 'crew_id',
        },
      },
}, {
    tableName: 'has_crew',
    schema: 'public',
    timestamps: false
});

Movie.belongsToMany(Crew, { through: HasCrew, foreignKey: 'movie_id' });
Crew.belongsToMany(Movie, { through: HasCrew, foreignKey: 'crew_id' });

module.exports = HasCrew;
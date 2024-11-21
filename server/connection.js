const { Sequelize } = require('sequelize');
require('dotenv').config();


// Tạo đối tượng Sequelize với các thông tin từ file .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', 
    logging: false, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the Supabase (PostgresSQL) database using Sequelize.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;

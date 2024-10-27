const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ MySQL server
    user: 'root',      // Tên đăng nhập MySQL
    password: 'your_password',  // Mật khẩu MySQL
    database: 'cinema_booking'  // Tên database
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;

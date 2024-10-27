const express = require('express');
const connection = require('./db');

const app = express();
const port = 3000;

// Route để kiểm tra kết nối
app.get('/test', (req, res) => {
    connection.query('SELECT * FROM User', (error, results) => {
        if (error) {
            return res.status(500).send('Database query failed: ' + error);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

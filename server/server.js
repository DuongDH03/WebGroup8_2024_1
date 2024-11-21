const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cinemaRoutes = require('./routes/cinemaRoutes');
const roomRoutes = require('./routes/roomRoutes'); 
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const genreRoutes = require('./routes/genreRoutes');
const seatRoutes = require('./routes/seatRoutes');
const { router: authRoutes, authenticateToken } = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/cinema', cinemaRoutes);
app.use('/room', roomRoutes); 
app.use('/movie', movieRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/booking', bookingRoutes);
app.use('/ticket', ticketRoutes);
app.use('/genre', genreRoutes);
app.use('/seat', seatRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export const fetchSeatsByRoom = async (roomId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/seat/room/${roomId}`);
        const seats = await response.json();

        if (!response.ok) {
            throw new Error(seats.error || 'Failed to fetch seats');
        }

        const formattedSeats = {
            platinum: {
                type: "platinum",
                price: 300000,
                rows: []
            },
            gold: {
                type: "gold",
                price: 130000,
                rows: []
            },
            silver: {
                type: "silver",
                price: 70000,
                rows: []
            }
        };

        const rows = {};

        seats.forEach(seat => {
            if (!rows[seat.seat_row]) {
                rows[seat.seat_row] = { rowname: seat.seat_row, cols: [{ seats: [] }, { seats: [] }] };
            }
            const colIndex = seat.seat_col <= 10 ? 0 : 1;
            rows[seat.seat_row].cols[colIndex].seats.push({
                type: "seat",
                status: seat.seat_status,
                seat_id: seat.seat_id
            });
        });

        Object.keys(rows).forEach(rowname => {
            if (["H", "G"].includes(rowname)) {
                formattedSeats.platinum.rows.push(rows[rowname]);
            } else if (["E", "D", "C"].includes(rowname)) {
                formattedSeats.gold.rows.push(rows[rowname]);
            } else if (["A", "B"].includes(rowname)) {
                formattedSeats.silver.rows.push(rows[rowname]);
            }
        });

        return Object.values(formattedSeats);
    } catch (error) {
        console.error('Error fetching seats:', error);
        return null;
    }
};
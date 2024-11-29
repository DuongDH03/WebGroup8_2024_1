export const fetchSeatsByRoom = async (roomId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/seat/room/${roomId}`);

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to fetch seats: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const seats = await response.json();
        console.log(seats);

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
                seat_id: seat.seat_id,
                seat_col: seat.seat_col
            });
        });

        // Sort the seats within each column
        Object.keys(rows).forEach(rowname => {
            rows[rowname].cols.forEach(col => {
              col.seats.sort((a, b) => a.seat_col - b.seat_col);
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

        return {success: true, seats: Object.values(formattedSeats)};
    } catch (error) {
        console.error('Error fetching seats:', error);
        return { success: false, error: error.message };
    }
};
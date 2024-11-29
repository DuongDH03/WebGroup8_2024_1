const BASE_URL = process.env.REACT_APP_BACKEND_API;

// Function to create a booking
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${BASE_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create booking: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    return { success: true, booking: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Function to create tickets
export const createTickets = async (ticketsData) => {
  try {
    const response = await fetch(`${BASE_URL}/ticket/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketsData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create tickets: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    return { success: true, tickets: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const fetchTicketsByUserId = async (userId) => {
    try {
        if (!userId) {
            const user = localStorage.getItem("user");
            if (user) {
              userId = JSON.parse(user).id;
            } else {
              throw new Error("User not signed in");
            }
          }

      const response = await fetch(`${BASE_URL}/ticket/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Authentication token
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch tickets: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, tickets: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  export const deleteTicketById = async (ticketId) => {
    try {
      const response = await fetch(`${BASE_URL}/ticket/${ticketId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Authentication token
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete ticket: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

// Function to cancel a ticket by ID
export const cancelTicketById = async (ticketId) => {
  try {
      const response = await fetch(`${BASE_URL}/ticket/${ticketId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`, // Authentication token
          },
          body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to cancel ticket: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      return { success: true, ticket: result };
  } catch (error) {
      return { success: false, error: error.message };
  }
}; 
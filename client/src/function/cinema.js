const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const fetchAllCinemas = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cinema`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      return { success: true, cinemas: result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    return { success: false, error: "Something went wrong!" };
  }
};

export const fetchCinemaById = async (cinemaId) => {
    try {
        const response = await fetch(`${BASE_URL}/cinema/${cinemaId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (response.ok) {
            return { success: true, cinema: result };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

export const createCinema = async (cinemaData) => {
    try {
        const response = await fetch(`${BASE_URL}/cinema`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cinemaData),
        });
        const result = await response.json();
        if (response.ok) {
            return { success: true, cinema: result };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

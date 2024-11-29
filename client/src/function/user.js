const BASE_URL = process.env.REACT_APP_BACKEND_API;

// Fetch user by ID
export const fetchUserById = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Xác thực bằng token
            },
        });
        const result = await response.json();
        if (response.ok) {
            return { success: true, user: result };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

// Fetch all users
export const fetchAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Xác thực bằng token
            },
        });
        const result = await response.json();
        if (response.ok) {
            return { success: true, users: result };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

// Update user by ID
export const updateUserById = async (userId, userData) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Xác thực bằng token
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (response.ok) {
            return { success: true, user: result };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

// Delete user by ID
export const deleteUserById = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Xác thực bằng token
            },
        });
        if (response.ok) {
            return { success: true };
        } else {
            const result = await response.json();
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

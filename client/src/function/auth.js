export const signIn = async (formData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
            return { success: true, token: result.token };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: "Something went wrong!" };
    }
};

export const signUp = async (formData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
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

export const isSignedIn = () => {
    return !!localStorage.getItem("token");
}
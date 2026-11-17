const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (signal) => {
    const response = await fetch(API_URL, { signal });

    if (!response.ok) {
        throw new Error("Failed to fetch users. Please try again.");
    }

    const data = await response.json();

    return data;
};
import { Post, User } from "../types/types";

export const API_BASE_URL = process.env.API_BASE_URL;

/**
 * Fetches user information.
 * @param userId - The ID of the user.
 * @param token - The authentication token.
 * @returns A Promise that resolves to a User object or null if an error occurs.
 */
export const fetchUserInfo = async (userId: string, token: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user info: ${response.statusText}`);
        }

        const data = await response.json();
        return data.user as User;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Fetches posts created by the user.
 * @param userId - The ID of the user.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an array of Post objects.
 */
export const fetchUserPosts = async (userId: string, token: string): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user posts: ${response.statusText}`);
        }

        const data = await response.json();
        return data.posts as Post[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
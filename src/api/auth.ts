import { Post, User } from "../types/types";

export const API_BASE_URL = 'http://localhost:3000'; // Use HTTPS in production

/**
 * Fetches user information.
 * @param userId - The ID of the user.
 * @param token - The authentication token.
 * @returns A Promise that resolves to a User object or null if an error occurs.
 */
export const fetchUserInfo = async (userId: string, token: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/widget/user-info?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401) {
            throw new Error('Authentication failed. Please check your token.');
        }

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
 * Fetches user posts.
 * @param userId - The ID of the user.
 * @param token - The authentication token.
 * @returns A Promise that resolves to an array of Post objects.
 */
export const fetchUserPosts = async (userId: string, token: string): Promise<Post[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/widget/user-posts?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // Do not include 'mode: no-cors'
        });

        if (response.status === 401) {
            throw new Error('Authentication failed. Please check your token.');
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();
        return data.posts as Post[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
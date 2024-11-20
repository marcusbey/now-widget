export interface User {
    id: string;
    name: string;
    displayName?: string;
    email: string;
    emailVerified: boolean;
    image?: string;
    bio?: string;
    followers: number;
}

export interface Post {
    id: string;
    content: string;
    user: User;
    _count: {
        comments: number;
        bookmarks: number;
        likes: number;
    };
}
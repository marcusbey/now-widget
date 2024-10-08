export interface User {
    id: string;
    name: string;
    displayName?: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    bio?: string | null;
    resendContactId?: string | null;
    widgetToken?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    followers: number;
    following?: User[];
    posts?: Post[];
    comments?: Comment[];
    likes?: Like[];
    bookmarks?: Bookmark[];
    notifications?: Notification[];
    issuedNotifications?: Notification[];
}

export interface Post {
    id: string;
    user: User;
    attachments?: Attachment[];
    likes?: Like[];
    bookmarks?: Bookmark[];
    comments?: Comment[];
    linkedNotifications?: Notification[];
    content: string;
    _count: {
        comments: number;
        bookmarks: number;
        likes: number;
    };
}

export interface Comment {
    id: string;
    user: User;
    post: Post;
    content: string;
    createdAt: Date;
}

export interface Like {
    id: string;
    user: User;
    post: Post;
    createdAt: Date;
}

export interface Bookmark {
    id: string;
    user: User;
    post: Post;
    createdAt: Date;
}

export interface Notification {
    id: string;
    user: User;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

export interface Attachment {
    id: string;
    post: Post;
    url: string;
    type: 'image' | 'video' | 'document';
}


import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { Post, User } from '../types/types';

describe('Auth API', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('fetchUserInfo successfully fetches user data', async () => {
        const mockUser: User = {
            id: '1',
            name: 'John Doe',
            displayName: 'John',
            email: 'john@example.com',
            emailVerified: true,
            image: 'http://example.com/avatar.jpg',
            bio: 'Developer',
            resendContactId: null,
            widgetToken: 'token123',
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [],
            following: [],
            posts: [],
            comments: [],
            likes: [],
            bookmarks: [],
            notifications: [],
            issuedNotifications: [],
        };

        fetchMock.mockResponseOnce(JSON.stringify({ user: mockUser }));

        const user = await fetchUserInfo('1', 'token123');
        expect(user).toEqual(mockUser);
    });

    test('fetchUserPosts successfully fetches user posts', async () => {
        const mockPosts: Post[] = [
            {
                id: 'post1',
                user: {} as User, // Simplified for the test
                attachments: [],
                likes: [],
                bookmarks: [],
                comments: [],
                linkedNotifications: [],
                content: 'This is a post',
                _count: {
                    likes: 10,
                    comments: 5,
                    bookmarks: 2,
                },
            },
        ];

        fetchMock.mockResponseOnce(JSON.stringify({ posts: mockPosts }));

        const posts = await fetchUserPosts('1', 'token123');
        expect(posts).toEqual(mockPosts);
    });

    test('fetchUserInfo handles errors gracefully', async () => {
        fetchMock.mockRejectOnce(new Error('Network Error'));

        const user = await fetchUserInfo('1', 'token123');
        expect(user).toBeNull();
    });

    test('fetchUserPosts handles errors gracefully', async () => {
        fetchMock.mockRejectOnce(new Error('Network Error'));

        const posts = await fetchUserPosts('1', 'token123');
        expect(posts).toEqual([]);
    });
});
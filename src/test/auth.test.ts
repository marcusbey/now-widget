// src/test/auth.test.ts

import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { Post, User } from '../types/types';

global.fetch = jest.fn();

describe('Authentication API', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    describe('fetchUserInfo', () => {
        it('should fetch user info successfully', async () => {
            const mockUser: User = {
                id: 'user123',
                name: 'John Doe',
                displayName: 'Johnny',
                bio: 'A test user',
                image: '/path/to/avatar.jpg',
                email: 'john.doe@example.com',
                emailVerified: true,
                followers: 150,
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ user: mockUser }),
            });

            const user = await fetchUserInfo('user123', 'valid-token');
            expect(user).toEqual(mockUser);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('should handle authentication failure', async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 401,
                ok: false,
                statusText: 'Unauthorized',
            });

            const user = await fetchUserInfo('user123', 'invalid-token');
            expect(user).toBeNull();
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('should handle fetch error', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            const user = await fetchUserInfo('user123', 'valid-token');
            expect(user).toBeNull();
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });

    describe('fetchUserPosts', () => {
        it('should fetch user posts successfully', async () => {
            const mockUser: User = {
                id: 'user123',
                name: 'John Doe',
                email: 'john.doe@example.com',
                emailVerified: true,
                followers: 0,
            };

            const mockPosts: Post[] = [
                {
                    id: 'post1',
                    content: 'This is the first post.',
                    user: mockUser,
                    _count: {
                        comments: 10,
                        bookmarks: 5,
                        likes: 20,
                    },
                },
                {
                    id: 'post2',
                    content: 'This is the second post.',
                    user: mockUser,
                    _count: {
                        comments: 5,
                        bookmarks: 2,
                        likes: 10,
                    },
                },
            ];

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ posts: mockPosts }),
            });

            const posts = await fetchUserPosts('user123', 'valid-token');
            expect(posts).toEqual(mockPosts);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('should handle authentication failure', async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 401,
                ok: false,
                statusText: 'Unauthorized',
            });

            const posts = await fetchUserPosts('user123', 'invalid-token');
            expect(posts).toEqual([]);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('should handle fetch error', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            const posts = await fetchUserPosts('user123', 'valid-token');
            expect(posts).toEqual([]);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});
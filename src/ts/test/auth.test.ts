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
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ user: mockUser }),
            });

            const user = await fetchUserInfo('user123', 'valid-token');
            expect(user).toEqual(mockUser);
            expect(fetch).toHaveBeenCalledWith(
                `${process.env.API_BASE_URL}/api/widget/user-info?userId=user123`,
                expect.objectContaining({
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer valid-token`,
                        'Content-Type': 'application/json',
                    },
                })
            );
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
            const mockPosts: Post[] = [
                { id: 'post1', title: 'Post 1', content: 'Content 1', _count: { comments: 2, bookmarks: 1, likes: 5 } },
                { id: 'post2', title: 'Post 2', content: 'Content 2', _count: { comments: 0, bookmarks: 3, likes: 2 } },
            ];

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ posts: mockPosts }),
            });

            const posts = await fetchUserPosts('user123', 'valid-token');
            expect(posts).toEqual(mockPosts);
            expect(fetch).toHaveBeenCalledWith(
                `${process.env.API_BASE_URL}/api/widget/user-data?userId=user123`,
                expect.objectContaining({
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer valid-token`,
                        'Content-Type': 'application/json',
                    },
                })
            );
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
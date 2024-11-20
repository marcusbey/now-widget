import { Post, User } from './types';

export const mockUser: User = {
    id: "user123",
    name: "Romain BOBOE",
    displayName: "Romain BOBOE",
    email: "romain@example.com",
    emailVerified: true,
    image: "https://lh3.googleusercontent.com/a/ACg8ocK0PYD1WBKi91zmA-WHckA5MGxABf7nqzMap_uP9yAljpu673_e=s96-c",
    bio: "Senior Software Engineer & Tech Lead",
    followers: 1234
};

export const mockPosts: Post[] = [
    { id: "1", content: "Just launched our new widget! 🚀 Check it out and let me know what you think! #webdev #innovation", user: mockUser, _count: { comments: 15, bookmarks: 8, likes: 45 } },
    { id: "2", content: "Working on some exciting features for the next release. Stay tuned! #coding #development", user: mockUser, _count: { comments: 12, bookmarks: 6, likes: 38 } },
    { id: "3", content: "Great team meeting today. Love how we're pushing the boundaries of what's possible! #teamwork #tech", user: mockUser, _count: { comments: 8, bookmarks: 4, likes: 29 } },
    { id: "4", content: "Deep diving into TypeScript generics today. Mind-blowing stuff! 🤯 #typescript #learning", user: mockUser, _count: { comments: 20, bookmarks: 15, likes: 52 } },
    { id: "5", content: "Just published a new blog post about web performance optimization. Link in bio! #webperf #optimization", user: mockUser, _count: { comments: 18, bookmarks: 12, likes: 43 } },
    { id: "6", content: "Excited to speak at next month's tech conference about modern web development! #speaking #conference", user: mockUser, _count: { comments: 25, bookmarks: 18, likes: 67 } },
    { id: "7", content: "Remember: clean code is not about perfect code, it's about maintainable code. #cleancode #bestpractices", user: mockUser, _count: { comments: 30, bookmarks: 25, likes: 89 } },
    { id: "8", content: "Friday coding session with coffee ☕️ and good music 🎵 Perfect way to end the week! #coding #fridayvibes", user: mockUser, _count: { comments: 14, bookmarks: 7, likes: 41 } }
];
import { initializeWidgetRoot, setLoading } from '../state/state';
import { createWidgetContainer, togglePanel } from '../utils/nowWidgetUtils';
import { createNowButton } from './NowButton';
import { createNowPanel } from './NowPanelContent';

interface WidgetConfig {
    userId: string;
    token: string;
    theme?: string;
    position?: string;
    buttonColor?: string;
    buttonSize?: number;
}

const mockUser = {
    id: "user123",
    name: "Romain BOBOE",
    displayName: "Romain BOBOE",
    email: "romain@example.com",
    emailVerified: true,
    image: "https://lh3.googleusercontent.com/a/ACg8ocK0PYD1WBKi91zmA-WHckA5MGxABf7nqzMap_uP9yAljpu673_e=s96-c",
    bio: "Senior Software Engineer & Tech Lead",
    followers: 1234
};

const mockPosts = [
    { id: "1", content: "Just launched our new widget! 🚀 Check it out and let me know what you think! #webdev #innovation", user: mockUser, _count: { comments: 15, bookmarks: 8, likes: 45 } },
    { id: "2", content: "Working on some exciting features for the next release. Stay tuned! #coding #development", user: mockUser, _count: { comments: 12, bookmarks: 6, likes: 38 } },
    { id: "3", content: "Great team meeting today. Love how we're pushing the boundaries of what's possible! #teamwork #tech", user: mockUser, _count: { comments: 8, bookmarks: 4, likes: 29 } },
    { id: "4", content: "Deep diving into TypeScript generics today. Mind-blowing stuff! 🤯 #typescript #learning", user: mockUser, _count: { comments: 20, bookmarks: 15, likes: 52 } },
    { id: "5", content: "Just published a new blog post about web performance optimization. Link in bio! #webperf #optimization", user: mockUser, _count: { comments: 18, bookmarks: 12, likes: 43 } },
    { id: "6", content: "Excited to speak at next month's tech conference about modern web development! #speaking #conference", user: mockUser, _count: { comments: 25, bookmarks: 18, likes: 67 } },
    { id: "7", content: "Remember: clean code is not about perfect code, it's about maintainable code. #cleancode #bestpractices", user: mockUser, _count: { comments: 30, bookmarks: 25, likes: 89 } },
    { id: "8", content: "Friday coding session with coffee ☕️ and good music 🎵 Perfect way to end the week! #coding #fridayvibes", user: mockUser, _count: { comments: 14, bookmarks: 7, likes: 41 } }
];

export const initializeNowWidget = async (config: WidgetConfig): Promise<void> => {
    const container = createWidgetContainer();
    initializeWidgetRoot(container);

    // Create and append button
    const button = createNowButton(() => togglePanel(true, container), {
        color: config.buttonColor || '#007bff',
        size: config.buttonSize || 60,
        backgroundColor: 'transparent',
    });
    container.appendChild(button);

    // Create panel with mock data
    const panel = createNowPanel({ 
        userId: config.userId, 
        token: config.token, 
        posts: mockPosts, 
        user: mockUser 
    });
    container.appendChild(panel);

    // Add click event listener to close panel when clicking outside
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!panel.contains(target) && !button.contains(target) && panel.classList.contains('open')) {
            togglePanel(false, container);
        }
    });

    // Handle scroll events
    let scrollTimeout: NodeJS.Timeout;
    document.addEventListener('scroll', () => {
        if (!panel.contains(document.activeElement) && panel.classList.contains('open')) {
            // Clear any existing timeout
            clearTimeout(scrollTimeout);
            
            // Set a new timeout to close the panel
            scrollTimeout = setTimeout(() => {
                togglePanel(false, container);
            }, 150); // Small delay to make it feel smooth
        }
    }, { passive: true });

    setLoading(false);
};
import '../css/nowWidgetStyles.css';
import { fetchUserInfo, fetchUserPosts } from './ts/api/auth';
import { adjustSpinSpeed, createNowButton } from './ts/components/NowButton';
import { Post } from './ts/types/types';
import { createWidgetContainer, getScriptAttributes, togglePanel } from './ts/utils/nowWidgetUtils';
import { createPanel } from './utils/nowWidgetUtils';
import { applyTheme, renderPosts, setPosition } from './utils/styleUtils';

const fetchUserPosts = async (userId: string, token: string): Promise<Post[]> => {
    try {
        const response = await fetch(`https://api.yourdomain.com/users/${userId}/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const renderPosts = (posts: Post[]): void => {
    const content = document.getElementById('now-widget-content');
    if (content) {
        content.innerHTML = '<h2>Your Posts</h2>';
        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'now-widget-post';
            postEl.innerHTML = `<h3>${post.title}</h3> <p>${post.content}</p>`;
            content.appendChild(postEl);
        });
    }
};

const init = async (): Promise<void> => {
    const attributes = getScriptAttributes();
    if (!attributes) return;
    const { userId, token, theme, position, buttonColor, buttonSize } = attributes;

    // Create widget container
    createWidgetContainer();

    // Create and append NowButton
    const button = createNowButton(() => togglePanel(true), {
        color: buttonColor,
        size: buttonSize ? parseInt(buttonSize) : undefined,
        backgroundColor: 'transparent',
    });
    document.getElementById('now-widget-container')?.appendChild(button);

    // Create and append Panel
    createPanel();

    // Fetch and render data
    const posts = await fetchUserPosts(userId, token);
    const user = await fetchUserInfo(userId, token);
    renderPosts(posts);

    // Apply theme and position settings
    applyTheme(theme);
    setPosition(position);

    // Add Event Listeners
    addEventListeners();
};

const addEventListeners = (): void => {
    // Click Event to Toggle Panel
    const button = document.getElementById('now-widget-button');
    button?.addEventListener('click', () => togglePanel(true));

    // Scroll Event to Hide/Show Button
    window.addEventListener('scroll', handleScroll);

    // Mouse Movement Event to Adjust Animation
    document.addEventListener('mousemove', handleMouseMove);
};

// Define the event handler functions
const handleScroll = () => {
    const nowButton = document.getElementById('now-widget-button');
    if (window.scrollY > 300) {
        nowButton?.classList.add('hidden');
    } else {
        nowButton?.classList.remove('hidden');
    }
};

const handleMouseMove = (e: MouseEvent) => {
    const nowButton = document.getElementById('now-widget-button');
    if (nowButton) {
        const rect = nowButton.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        const isNear = distance < 200; // Proximity Threshold
        const isHovered = nowButton.matches(':hover');
        const textRing = nowButton.querySelector('.text-ring') as HTMLElement;
        if (textRing) {
            adjustSpinSpeed(isNear, isHovered, textRing);
        }
    }
};

// Initialize the widget when the script is loaded
document.addEventListener('DOMContentLoaded', init);
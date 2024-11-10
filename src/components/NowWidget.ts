// Start of Selection
import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { initializeWidgetRoot, setLoading, setPosts, setUser } from '../state/state';
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

  // Show loading indicator
  setLoading(true);

  try {
    // Fetch user data and posts
    const [user, posts] = await Promise.all([
      fetchUserInfo(config.userId, config.token),
      fetchUserPosts(config.userId, config.token)
    ]);

    // Update state
    setUser(user);
    setPosts(posts);

    // Create panel with fetched data
    const panel = createNowPanel({
      userId: config.userId,
      token: config.token,
      posts,
      user
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
  } catch (error) {
    console.error('Error initializing widget:', error);
  } finally {
    setLoading(false);
  }
};
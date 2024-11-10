// Start of Selection
import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { initializeWidgetRoot, setLoading, setPosts, setUser } from '../state/state';
import { injectStyles } from '../utils/nowStyleUtils';
import { createWidgetContainer, togglePanel } from '../utils/nowWidgetUtils';
import { stopPinging } from '../utils/pingServer';
import { createNowButton } from './NowButton';
import { createNowPanel } from './NowPanelContent';

interface WidgetConfig {
  userId: string;
  token: string;
  theme?: string;
  position?: string;
  buttonColor?: string;
}

let scrollListener: EventListener;
let clickListener: EventListener;

export const teardownNowWidget = () => {
  const container = document.getElementById('now-widget-container');
  if (container) {
    container.remove();
  }
  stopPinging();
  document.removeEventListener('scroll', scrollListener);
  document.removeEventListener('click', clickListener);
};

export const initializeNowWidget = async (config: WidgetConfig): Promise<void> => {
  const container = createWidgetContainer();
  initializeWidgetRoot(container);

  // Inject dynamic styles
  injectStyles(
    config.theme as 'light' | 'dark' || 'dark',
    config.position as 'left' | 'right' || 'left',
    config.buttonColor
  );

  // Create and append button
  const button = createNowButton(() => togglePanel(true, container), {
    color: config.buttonColor || '#007bff',
    size: 120,
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
    clickListener = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!panel.contains(target) && !button.contains(target) && panel.classList.contains('open')) {
        togglePanel(false, container);
      }
    };
    document.addEventListener('click', clickListener);

    // Handle scroll events
    let scrollTimeout: NodeJS.Timeout;
    scrollListener = () => {
      if (!panel.contains(document.activeElement) && panel.classList.contains('open')) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          togglePanel(false, container);
        }, 150);
      }
    };
    document.addEventListener('scroll', scrollListener, { passive: true });
  } catch (error) {
    console.error('Error initializing widget:', error);
  } finally {
    setLoading(false);
  }
};






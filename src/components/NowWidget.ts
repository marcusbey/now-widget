// Start of Selection
// src/components/NowWidget.ts

import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { initializeWidgetRoot, setLoading, setPosts, setUser } from '../state/state';
import styles from '../styles/nowWidgetStyles.css?inline';
import { addEventListeners } from '../utils/nowEventsUtils';
import { applyTheme } from '../utils/nowStyleUtils';
import {
  createWidgetContainer,
  handleError,
  togglePanel
} from '../utils/nowWidgetUtils';
import { createNowButton } from './NowButton';
import { createNowPanel, updateNowPanel } from './NowPanelContent';

/**
 * Configuration interface for initializing the widget.
 */
interface WidgetConfig {
  userId: string;
  token: string;
  theme?: string;
  position?: string;
  buttonColor?: string;
  buttonSize?: number;
}


/**
 * Initializes the NowWidget by creating UI components, fetching user data, and setting up the environment.
 * @param config - Configuration object containing userId, token, theme, position, buttonColor, and buttonSize.
 */
export const initializeNowWidget = async (config: WidgetConfig): Promise<void> => {
  console.log('Initializing Now Widget with config:', config);
  const container = createWidgetContainer();
  console.log('Widget container created');
  initializeWidgetRoot(container);
  console.log('Widget root initialized');
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
    posts: [],
    user: null
  });
  container.appendChild(panel);

  // Append styles to the widget container
  const style = document.createElement('style');
  style.textContent = styles;
  container.appendChild(style);
  console.log('Styles appended to widget container');

  // Add Event Listeners early
  addEventListeners(container);

  // Show loading indicator
  setLoading(true);

  try {
    // Fetch user data
    const [posts, user] = await Promise.all([
      fetchUserPosts(config.userId, config.token),
      fetchUserInfo(config.userId, config.token),
    ]);
    console.log('Fetched posts:', posts);
    console.log('Fetched user:', user);

    // Update state
    setPosts(posts);
    setUser(user);

    // Update the existing panel with fetched data
    updateNowPanel(panel, { userId: config.userId, token: config.token, posts, user });

  } catch (error: any) {
    console.error('Error fetching data:', error);
    handleError(error.message, panel);
  } finally {
    setLoading(false);
  }

  // Apply theme and position settings
  applyTheme(config.theme);
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
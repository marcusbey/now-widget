// src/components/NowWidget.ts

import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { setLoading, setPosts, setUser } from '../state/state';
import { startAnimation } from '../utils/nowAnimation';
import { addEventListeners } from '../utils/nowEventHandlers';
import { applyTheme, setPosition } from '../utils/nowStyleUtils';
import {
  createWidgetContainer,
  handleError, togglePanel
} from '../utils/nowWidgetUtils';
import { createNowButton } from './NowButton';
import { createNowPanel } from './NowPanelContent';
// Import the CSS styles
import styles from '../styles/nowWidgetStyles.css';

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
  const { userId, token, theme, position, buttonColor = '#007bff', buttonSize = 60 } = config;

  // Create widget container
  const container = createWidgetContainer();

  // Create Shadow DOM container for encapsulation
  const shadow = container.attachShadow({ mode: 'open' });

  // Create and append NowButton
  const button = createNowButton(() => togglePanel(true), {
    color: buttonColor,
    size: buttonSize,
    backgroundColor: 'transparent',
  });
  shadow.appendChild(button);

  // Create and append Panel
  const panel = createNowPanel({ userId, token, posts: [], user: null });
  shadow.appendChild(panel);

  // Append styles to Shadow DOM
  const style = document.createElement('style');
  style.textContent = styles; // Use the imported CSS content
  shadow.appendChild(style);

  // Start animation loop
  startAnimation();

  // Add Event Listeners
  addEventListeners();

  // Show loading indicator
  setLoading(true);

  try {
    // Fetch user data
    const [posts, user] = await Promise.all([
      fetchUserPosts(userId, token),
      fetchUserInfo(userId, token),
    ]);

    // Update state
    setPosts(posts);
    setUser(user);

    // Update panel content based on fetched data
    panel.innerHTML = ''; // Clear existing content
    const updatedPanel = createNowPanel({ userId, token, posts, user });
    shadow.appendChild(updatedPanel);

  } catch (error: any) {
    handleError(error.message);
  } finally {
    setLoading(false);
  }

  // Apply theme and position settings
  applyTheme(theme);
  setPosition(position);
};
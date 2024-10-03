import { fetchUserInfo, fetchUserPosts } from '../api/auth';
import { setLoading, setPosts, setUser } from '../state/state';
import {
  createButton,
  createPanel,
  createWidgetContainer,
  handleError,
  setButtonStyles
} from '../utils/nowWidgetUtils';
import { applyTheme, setPosition } from '../utils/styleUtils';

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
 * Initializes the NowWidget by creating UI components and fetching user data.
 * @param config - Configuration object containing userId, token, theme, position, buttonColor, and buttonSize.
 */
export const initializeNowWidget = async (config: WidgetConfig): Promise<void> => {
  const { userId, token, theme, position, buttonColor = '#007bff', buttonSize = 60 } = config;

  // Create widget container
  createWidgetContainer();

  // Create and style NowButton
  const button = createButton(() => togglePanel(true), color || '#007bff', buttonSize);
  setButtonStyles(button, buttonColor, buttonSize);

  // Create and append panel
  createPanel({ userId, token, posts: [], user: null });

  // Fetch and render data
  setLoading(true);
  try {
    const posts = await fetchUserPosts(userId, token);
    const user = await fetchUserInfo(userId, token);
    setPosts(posts);
    setUser(user);
  } catch (error: any) {
    handleError(error.message);
  } finally {
    setLoading(false);
  }

  // Apply theme and position settings
  applyTheme(theme);
  setPosition(position);
};
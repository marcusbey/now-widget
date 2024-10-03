// src/ts/components/NowPanelContent.ts
import { Post, User } from '../types/types';
import { togglePanel } from '../utils/nowWidgetUtils';

/**
 * Configuration interface for the panel.
 */
interface PanelConfig {
  userId: string;
  token: string;
  posts: Post[];
  user: User | null;
}

/**
 * Creates the NowWidget side panel.
 * @param config - Configuration object containing userId, token, posts, and user information.
 * @returns The NowWidget panel HTMLElement.
 */
export const createNowPanel = (config: PanelConfig): HTMLElement => {
  const { userId, token, posts, user } = config;

  const panel = document.createElement('div');
  panel.id = 'now-widget-panel';
  panel.classList.add('now-widget-panel');

  // Close Button
  const closeButton = document.createElement('button');
  closeButton.id = 'now-widget-close';
  closeButton.innerText = '×';
  closeButton.addEventListener('click', () => togglePanel(false));
  panel.appendChild(closeButton);

  // User Info
  const userInfo = document.createElement('div');
  userInfo.classList.add('now-widget-user-info');

  const avatar = document.createElement('img');
  avatar.src = user?.image || '/placeholder-user.jpg';
  avatar.alt = user?.displayName || user?.name || 'User Avatar';
  avatar.classList.add('now-widget-avatar');
  userInfo.appendChild(avatar);

  const userDetails = document.createElement('div');
  userDetails.classList.add('now-widget-user-details');

  const userName = document.createElement('h2');
  userName.classList.add('now-widget-user-name');
  userName.textContent = user?.displayName || user?.name;
  userDetails.appendChild(userName);

  const userBio = document.createElement('p');
  userBio.classList.add('now-widget-user-bio');
  userBio.textContent = user?.bio || '';
  userDetails.appendChild(userBio);

  userInfo.appendChild(userDetails);
  panel.appendChild(userInfo);

  // Posts Container
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('now-widget-posts-container');
  panel.appendChild(postsContainer);

  document.body.appendChild(panel);
  return panel;
};

/**
 * Renders posts inside the specified container with hashtag highlighting.
 * @param posts - Array of Post objects to render.
 * @param container - The container HTMLElement where posts will be rendered.
 */
export const renderPosts = (posts: Post[], container: HTMLElement): void => {
  container.innerHTML = '<h2>Your Posts</h2>';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'now-widget-post-item';

    const postContent = document.createElement('p');
    postContent.classList.add('now-widget-post-content');
    postContent.innerHTML = highlightHashtags(post.content);
    postEl.appendChild(postContent);

    const postFooter = document.createElement('div');
    postFooter.classList.add('now-widget-post-footer');

    // Interactions (Comments, Bookmarks, Likes)
    const interactions = ['comments', 'bookmarks', 'likes'] as const;
    interactions.forEach(type => {
      const interactionDiv = document.createElement('div');
      interactionDiv.classList.add('now-widget-post-interaction');

      const icon = document.createElement('span');
      icon.classList.add(`icon-${type}`);
      // Add appropriate icon implementation here (e.g., SVG or icon font)
      interactionDiv.appendChild(icon);

      const count = document.createElement('span');
      count.textContent = post._count[type].toString();
      interactionDiv.appendChild(count);

      postFooter.appendChild(interactionDiv);
    });

    postEl.appendChild(postFooter);
    container.appendChild(postEl);
  });
};

/**
 * Highlights hashtags in the post content and converts them into clickable links.
 * @param content - The post content string.
 * @returns The content string with hashtags highlighted.
 */
const highlightHashtags = (content: string): string => {
  return content
    .split(' ')
    .map(word =>
      word.startsWith('#')
        ? `<span class="now-widget-hashtag"><a href="/hashtag/${word.slice(1)}">${word}</a></span>`
        : `${word} `
    )
    .join('');
};
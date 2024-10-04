// src/components/NowPanelContent.ts

import { Post, User } from '../types/types';

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

  // Populate panel with user info and posts
  if (user) {
    const userInfo = document.createElement('div');
    userInfo.className = 'now-widget-user-info';
    userInfo.innerHTML = `
      <img src="${user.image || '/placeholder-user.jpg'}" alt="${user.displayName || user.name}" class="now-widget-avatar">
      <div class="now-widget-user-details">
        <h2 class="now-widget-user-name">${user.displayName || user.name}</h2>
        <p class="now-widget-user-bio">${user.bio || ''}</p>
      </div>
    `;
    panel.appendChild(userInfo);
  }

  const postsContainer = document.createElement('div');
  postsContainer.id = 'now-widget-content';
  panel.appendChild(postsContainer);

  // Render posts
  renderPosts(posts, postsContainer);

  return panel;
};

/**
 * Renders the list of posts inside the given container.
 * @param posts - Array of Post objects.
 * @param container - The container HTMLElement where posts will be appended.
 */
const renderPosts = (posts: Post[], container: HTMLElement): void => {
  container.innerHTML = '<h2>Your Posts</h2>';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'now-widget-post';
    postEl.innerHTML = `<p>${highlightHashtags(post.content)}</p>`;
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
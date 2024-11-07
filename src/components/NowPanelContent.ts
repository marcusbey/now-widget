// src/components/NowPanelContent.ts

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
  const { posts, user } = config;

  const panel = document.createElement('div');
  panel.id = 'now-widget-panel';
  panel.classList.add('now-widget-panel');

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('now-widget-close-button');
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => togglePanel(false, panel.parentElement!);
  panel.appendChild(closeButton);

  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('now-widget-content');
  panel.appendChild(contentDiv);

  // Add user info if available
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
    contentDiv.appendChild(userInfo);
  }

  // Create posts container and render posts
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('now-widget-posts');
  contentDiv.appendChild(postsContainer);
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
  if (posts.length === 0) {
    container.innerHTML += '<p>No posts available.</p>';
  } else {
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'now-widget-post';
      postEl.innerHTML = `<p>${post.content}</p>`;
      container.appendChild(postEl);
    });
  }
};

/**
 * Highlights hashtags in the post content and converts them into clickable links.
 * @param content - The post content string.
 * @returns The content string with hashtags highlighted.
 */
const highlightHashtags = (content: string): string => {
  return content.replace(/#(\w+)/g, '<span class="highlight">#$1</span>');
};

/**
 * Updates the existing NowWidget panel with new content.
 * @param panel - The panel HTMLElement to update.
 * @param config - New configuration for the panel.
 */
export const updateNowPanel = (panel: HTMLElement, config: PanelConfig): void => {
  const { posts, user } = config;

  // Clear existing content
  panel.innerHTML = '';

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('now-widget-close-button');
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => togglePanel(false, panel.parentElement!);
  panel.appendChild(closeButton);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('now-widget-content');
  panel.appendChild(contentDiv);

  // Add user info if available
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
    contentDiv.appendChild(userInfo);
  }

  // Create posts container and render posts
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('now-widget-posts');
  contentDiv.appendChild(postsContainer);
  renderPosts(posts, postsContainer);
};

/**
 * Renders the list of posts inside the given container.
 * @param posts - Array of Post objects.
 * @param panel - The panel HTMLElement where posts will be appended.
 */
export const renderPostsInPanel = (posts: Post[], panel: HTMLElement): void => {
  const content = panel.querySelector('#now-widget-content');
  if (content) {
    content.innerHTML = '<h2>Your Posts</h2>';
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'now-widget-post';
      postEl.innerHTML = `<p>${highlightHashtags(post.content)}</p>`;
      content.appendChild(postEl);
    });
  } else {
    console.error('Content element not found in the panel');
  }
};
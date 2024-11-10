import { Post, User } from '../types/types';
import { togglePanel } from '../utils/nowWidgetUtils';
import { createPostElement } from './NowPanelPost';

interface PanelConfig {
  userId: string;
  token: string;
  posts: Post[];
  user: User | null;
}

export const createNowPanel = (config: PanelConfig): HTMLElement => {
  const { posts, user } = config;

  const panel = document.createElement('div');
  panel.id = 'now-widget-panel';
  panel.classList.add('now-widget-panel');

  // Prevent panel closure when clicking inside
  panel.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  panel.addEventListener('wheel', (e) => {
    e.stopPropagation();
  });
  // Header with user info (fixed)
  const header = document.createElement('div');
  header.classList.add('now-widget-header');

  const userInfo = document.createElement('div');
  userInfo.classList.add('now-widget-user-info');

  const avatarContainer = document.createElement('div');
  avatarContainer.classList.add('now-widget-avatar-container');

  const avatar = document.createElement('img');
  avatar.src = user?.image || '/placeholder-user.png';
  avatar.alt = user?.displayName || user?.name || 'User';
  avatar.classList.add('now-widget-avatar');
  avatarContainer.appendChild(avatar);

  const userDetails = document.createElement('div');
  userDetails.classList.add('now-widget-user-details');

  const userName = document.createElement('h2');
  userName.classList.add('now-widget-user-name');
  userName.textContent = user?.displayName || user?.name || 'User';

  const userBio = document.createElement('p');
  userBio.classList.add('now-widget-user-bio');
  userBio.textContent = user?.bio || '';

  const userStats = document.createElement('div');
  userStats.classList.add('now-widget-user-stats');

  const postsCount = document.createElement('span');
  postsCount.classList.add('now-widget-stat');
  postsCount.innerHTML = `<strong>${posts.length}</strong> posts`;

  const followersCount = document.createElement('span');
  followersCount.classList.add('now-widget-stat');
  followersCount.innerHTML = `<strong>${user?.followers || 0}</strong> followers`;

  const likesCount = document.createElement('span');
  likesCount.classList.add('now-widget-stat');
  const totalLikes = posts.reduce((sum, post) => sum + post._count.likes, 0);
  likesCount.innerHTML = `<strong>${totalLikes}</strong> likes`;

  userStats.appendChild(postsCount);
  userStats.appendChild(followersCount);
  userStats.appendChild(likesCount);

  userDetails.appendChild(userName);
  userDetails.appendChild(userBio);
  userDetails.appendChild(userStats);

  userInfo.appendChild(avatarContainer);
  userInfo.appendChild(userDetails);
  header.appendChild(userInfo);

  // Close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('now-widget-close-button');
  closeButton.innerHTML = '×';
  closeButton.onclick = (e) => {
    e.stopPropagation();
    togglePanel(false, panel.parentElement!);
  };
  header.appendChild(closeButton);

  panel.appendChild(header);

  // Scrollable content area
  const scrollArea = document.createElement('div');
  scrollArea.classList.add('now-widget-scroll-area');

  const postsContainer = document.createElement('div');
  postsContainer.classList.add('now-widget-posts');

  posts.forEach(post => {
    const postEl = createPostElement(post);
    postsContainer.appendChild(postEl);
  });

  scrollArea.appendChild(postsContainer);
  panel.appendChild(scrollArea);

  return panel;
};

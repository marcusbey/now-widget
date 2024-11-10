import { Post, User } from '../types/types';
import { togglePanel } from '../utils/nowWidgetUtils';

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

  const userFollowers = document.createElement('p');
  userFollowers.classList.add('now-widget-user-followers');
  userFollowers.textContent = `${user?.followers || 0} followers`;

  userDetails.appendChild(userName);
  userDetails.appendChild(userBio);
  userDetails.appendChild(userFollowers);

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
    const postEl = document.createElement('div');
    postEl.classList.add('now-widget-post');

    const timestamp = document.createElement('div');
    timestamp.classList.add('now-widget-post-timestamp');
    timestamp.textContent = '2 hours ago';

    const content = document.createElement('p');
    content.classList.add('now-widget-post-content');
    content.innerHTML = highlightHashtags(post.content);

    const metrics = document.createElement('div');
    metrics.classList.add('now-widget-post-metrics');

    const comments = document.createElement('span');
    comments.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> ${post._count.comments}`;

    const likes = document.createElement('span');
    likes.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> ${post._count.likes}`;

    metrics.appendChild(comments);
    metrics.appendChild(likes);

    postEl.appendChild(timestamp);
    postEl.appendChild(content);
    postEl.appendChild(metrics);

    postsContainer.appendChild(postEl);
  });

  scrollArea.appendChild(postsContainer);
  panel.appendChild(scrollArea);

  return panel;
};

const highlightHashtags = (content: string): string => {
  return content.replace(/#(\w+)/g, '<a href="/hashtag/$1" class="now-widget-hashtag">#$1</a>');
};
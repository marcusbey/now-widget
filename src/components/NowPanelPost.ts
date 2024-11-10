import { Post } from '../types/types';
import { formatRelativeDate } from '../utils/dateUtils';

export const createPostElement = (post: Post): HTMLElement => {
    const postEl = document.createElement('article');
    postEl.classList.add('now-widget-post');

    const header = document.createElement('div');
    header.classList.add('now-widget-post-header');

    const userInfo = document.createElement('div');
    userInfo.classList.add('now-widget-post-user-info');

    const avatar = document.createElement('img');
    avatar.src = post.user.image || '/placeholder-user.png';
    avatar.alt = post.user.displayName || post.user.name;
    avatar.classList.add('now-widget-post-avatar');

    const userDetails = document.createElement('div');
    userDetails.classList.add('now-widget-post-user-details');

    const userName = document.createElement('span');
    userName.classList.add('now-widget-post-username');
    userName.textContent = post.user.displayName || post.user.name;

    const timestamp = document.createElement('span');
    timestamp.classList.add('now-widget-post-timestamp');
    timestamp.textContent = formatRelativeDate(post.createdAt);

    userDetails.appendChild(userName);
    userDetails.appendChild(timestamp);
    userInfo.appendChild(avatar);
    userInfo.appendChild(userDetails);
    header.appendChild(userInfo);
    postEl.appendChild(header);

    const content = document.createElement('div');
    content.classList.add('now-widget-post-content');
    content.innerHTML = highlightHashtags(post.content);
    postEl.appendChild(content);

    if (post.attachments && post.attachments.length > 0) {
        const mediaContainer = createMediaContainer(post.attachments);
        postEl.appendChild(mediaContainer);
    }

    const divider = document.createElement('hr');
    divider.classList.add('now-widget-post-divider');
    postEl.appendChild(divider);

    const metrics = createMetricsElement(post);
    postEl.appendChild(metrics);

    // Comments section (initially hidden)
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('now-widget-comments-container');
    (commentsContainer as HTMLDivElement).style.display = 'none';

    if (post.comments) {
        post.comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('now-widget-comment');

            const commentHeader = document.createElement('div');
            commentHeader.classList.add('now-widget-comment-header');

            const commentAvatar = document.createElement('img');
            commentAvatar.src = comment.user.image || '/placeholder-user.png';
            commentAvatar.alt = comment.user.displayName || comment.user.name;
            commentAvatar.classList.add('now-widget-comment-avatar');

            const commentUserName = document.createElement('span');
            commentUserName.classList.add('now-widget-comment-username');
            commentUserName.textContent = comment.user.displayName || comment.user.name;

            const commentTime = document.createElement('span');
            commentTime.classList.add('now-widget-comment-time');
            commentTime.textContent = formatRelativeDate(comment.createdAt);

            commentHeader.appendChild(commentAvatar);
            commentHeader.appendChild(commentUserName);
            commentHeader.appendChild(commentTime);

            const commentContent = document.createElement('p');
            commentContent.classList.add('now-widget-comment-content');
            commentContent.textContent = comment.content;

            commentEl.appendChild(commentHeader);
            commentEl.appendChild(commentContent);
            commentsContainer.appendChild(commentEl);
        });
    }

    postEl.appendChild(commentsContainer);

    return postEl;
};

const createMetricsElement = (post: Post): HTMLElement => {
    const metrics = document.createElement('div');
    metrics.classList.add('now-widget-post-metrics');

    const leftGroup = document.createElement('div');
    leftGroup.classList.add('now-widget-metrics-left');

    const likes = document.createElement('button');
    likes.classList.add('now-widget-metric-button');
    likes.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> ${post._count.likes}`;

    const comments = document.createElement('button');
    comments.classList.add('now-widget-metric-button');
    comments.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> ${post._count.comments}`;

    // Toggle comments visibility
    comments.addEventListener('click', () => {
        const commentsContainer = metrics.parentElement?.querySelector('.now-widget-comments-container') as HTMLDivElement;
        if (commentsContainer) {
            const isVisible = commentsContainer.style.display !== 'none';
            commentsContainer.style.display = isVisible ? 'none' : 'block';
        }
    });

    leftGroup.appendChild(likes);
    leftGroup.appendChild(comments);
    metrics.appendChild(leftGroup);

    return metrics;
};

const createMediaContainer = (attachments: any[]): HTMLElement => {
    const container = document.createElement('div');
    container.classList.add('now-widget-media-container');

    attachments.forEach(attachment => {
        if (attachment.type === 'image') {
            const img = document.createElement('img');
            img.src = attachment.url;
            img.alt = 'Post attachment';
            img.classList.add('now-widget-media');
            container.appendChild(img);
        } else if (attachment.type === 'video') {
            const video = document.createElement('video');
            video.src = attachment.url;
            video.controls = true;
            video.classList.add('now-widget-media');
            container.appendChild(video);
        }
    });

    return container;
};

const highlightHashtags = (content: string): string => {
    return content.replace(/#(\w+)/g, '<a href="/hashtag/$1" class="now-widget-hashtag">#$1</a>');
}; 
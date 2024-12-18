// Start of Selection
import { Post, User } from '../types/types';
import { renderPostsInPanel, renderUserInfo } from '../utils/nowWidgetUtils';

let widgetRoot: HTMLElement;

// Initialize widget root with HTMLElement
export const initializeWidgetRoot = (root: HTMLElement) => {
    widgetRoot = root;
};

export interface WidgetState {
    isPanelOpen: boolean;
    isLoading: boolean;
    error: string | null;
    posts: Post[];
    user: User | null;
}

export const widgetState: WidgetState = {
    isPanelOpen: false,
    isLoading: false,
    error: null,
    posts: [],
    user: null,
};

// Update functions
export const setLoading = (isLoading: boolean): void => {
    widgetState.isLoading = isLoading;
    const panel = widgetRoot.querySelector('#now-widget-panel') as HTMLElement | null;
    if (panel) {
        if (isLoading) {
            panel.classList.add('loading');
        } else {
            panel.classList.remove('loading');
        }
    }
    updateUI();
};

export const setError = (error: string | null) => {
    widgetState.error = error;
    updateUI();
};

export const setPosts = (posts: Post[]) => {
    widgetState.posts = posts;
    updateUI();
};

export const setUser = (user: User | null) => {
    widgetState.user = user;
    updateUI();
};

// UI Update function
const updateUI = () => {
    console.log('updating UI');
    if (!widgetRoot) {
        console.error('Widget root is not initialized.');
        return;
    }
    const panel = widgetRoot.querySelector('#now-widget-panel') as HTMLElement | null;
    if (panel) {
        if (widgetState.isLoading) {
            showLoading(panel);
        } else {
            hideLoading(panel);
        }

        if (widgetState.error) {
            showError(widgetState.error);
        } else {
            hideError(panel);
            renderUserInfo(widgetState.user, panel);
            renderPostsInPanel(widgetState.posts, panel);
        }
    }
};

const showLoading = (panel: HTMLElement) => {
    let loadingDiv = panel.querySelector('.now-widget-loading') as HTMLElement | null;
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.classList.add('now-widget-loading');
        loadingDiv.textContent = 'Loading...';
        panel.appendChild(loadingDiv);
    }
    loadingDiv.style.display = 'block';
};

const hideLoading = (panel: HTMLElement) => {
    const loadingDiv = panel.querySelector('.now-widget-loading') as HTMLElement | null;
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
};

export const showError = (error: string): void => {
    const panel = widgetRoot.querySelector('#now-widget-panel') as HTMLElement | null;
    if (panel) {
        let errorDiv = panel.querySelector('.now-widget-error') as HTMLElement | null;
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('now-widget-error');
            panel.appendChild(errorDiv);
        }
        errorDiv.textContent = `Error: ${error}`;
        errorDiv.style.display = 'block';
    }
};

const hideError = (panel: HTMLElement) => {
    const errorDiv = panel.querySelector('.now-widget-error') as HTMLElement | null;
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
};
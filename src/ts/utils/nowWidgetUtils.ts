import { setError } from '../state/state';
import { Post, User } from '../types/types';

/**
 * Retrieves script attributes from the currently executing script tag.
 * @returns An object containing userId, token, and optional configuration parameters, or null if required attributes are missing.
 */
export const getScriptAttributes = (): {
    userId: string;
    token: string;
    theme?: string;
    position?: string;
    buttonColor?: string;
    buttonSize?: string;
} | null => {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const userId = currentScript.getAttribute('data-user-id');
    const token = currentScript.getAttribute('data-token');
    const theme = currentScript.getAttribute('data-theme');
    const position = currentScript.getAttribute('data-position');
    const buttonColor = currentScript.getAttribute('data-button-color');
    const buttonSize = currentScript.getAttribute('data-button-size');

    if (!userId || !token) {
        console.error("NowWidget: Missing userId or token in script attributes.");
        return null;
    }

    return {
        userId,
        token,
        theme: theme ?? undefined,
        position: position ?? undefined,
        buttonColor: buttonColor ?? undefined,
        buttonSize: buttonSize ?? undefined
    };
};

/**
 * Creates and appends the widget container to the document body.
 * @returns The widget container HTMLElement.
 */
export const createWidgetContainer = (): HTMLElement => {
    let container = document.getElementById('now-widget-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'now-widget-container';
        document.body.appendChild(container);
    }
    return container;
};

/**
 * Creates and appends the widget button to the widget container.
 * @param onClick - Callback function to execute on button click.
 * @returns The widget button HTMLElement.
 */
export const createButton = (onClick: () => void, color: string, size: number): HTMLElement => {
    const button = document.createElement('button');
    button.id = 'now-widget-button';
    button.classList.add('now-widget-button');
    button.innerText = '+';
    onClick && button.addEventListener('click', onClick);
    return button;
};

/**
 * Creates the NowWidget side panel.
 * @param config - Configuration object containing userId, token, posts, and user information.
 * @returns The NowWidget panel HTMLElement.
 */
export const createPanel = (config: { userId: string; token: string; posts: Post[]; user: User | null }): HTMLElement => {
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
 * Toggle the visibility of the NowWidget side panel.
 * @param isOpen - Boolean indicating whether to open or close the panel.
 */
export const togglePanel = (isOpen: boolean): void => {
    const panel = document.getElementById('now-widget-panel');
    if (panel) {
        if (isOpen) {
            panel.classList.add('open');
        } else {
            panel.classList.remove('open');
        }
    }
};

/**
 * Adjusts the spin speed of the text ring based on proximity and hover state.
 * @param isNear - Indicates if the cursor is near the button.
 * @param isHovered - Indicates if the button is currently hovered.
 * @param textRing - The HTMLElement representing the text ring.
 */
export const adjustSpinSpeed = (
    isNear: boolean,
    isHovered: boolean,
    textRing: HTMLElement
): void => {
    if (isHovered) {
        textRing.classList.add('fast-spin');
        textRing.classList.remove('slow-spin');
    } else if (isNear) {
        textRing.classList.add('slow-spin');
        textRing.classList.remove('fast-spin');
    } else {
        textRing.classList.remove('slow-spin', 'fast-spin');
    }
};

/**
 * Displays an error message inside the widget panel.
 * @param error - The error message to display.
 */
export const displayError = (error: string): void => {
    const panel = document.getElementById('now-widget-panel');
    if (panel) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('now-widget-error');
        errorDiv.textContent = `Error: ${error}`;
        panel.appendChild(errorDiv);
    }
};

/**
 * Handles errors by updating the widget state and displaying the error message.
 * @param error - The error message.
 */
export const handleError = (error: string): void => {
    setError(error);
};

/**
 * Displays a loading indicator inside the widget panel.
 */
export const showLoading = (): void => {
    const panel = document.getElementById('now-widget-panel');
    if (panel) {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('now-widget-loading');
        loadingDiv.textContent = 'Loading...';
        panel.appendChild(loadingDiv);
    }
};

/**
 * Hides the loading indicator inside the widget panel.
 */
export const hideLoading = (): void => {
    const loadingDiv = document.querySelector('.now-widget-loading') as HTMLElement;
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
};
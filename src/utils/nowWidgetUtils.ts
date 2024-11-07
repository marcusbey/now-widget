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
    let currentScript: HTMLScriptElement | null = null;

    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];

        // Check if the script has the required data attributes
        if (script.getAttribute('data-user-id') && script.getAttribute('data-token')) {
            currentScript = script;
            break;
        }
    }

    if (!currentScript) {
        console.error("NowWidget: Unable to locate the current script.");
        return null;
    }

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
        buttonSize: buttonSize ?? undefined,
    };
};

/**
 * Creates and appends the widget container to the document body.
 * @returns The widget container HTMLElement.
 */
export const createWidgetContainer = (): HTMLElement => {
    // Create widget container
    const container = document.createElement('div');
    container.id = 'now-widget-container';

    // Wrap existing body content
    const wrapper = document.createElement('div');
    wrapper.id = 'now-widget-host-content';

    // Move all body children to wrapper
    while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild);
    }

    document.body.appendChild(wrapper);
    document.body.appendChild(container);

    return container;
}


/**
 * Toggles the visibility of the NowWidget side panel.
 * @param isOpen - Boolean indicating whether to open or close the panel.
 * @param root - The root Element containing the panel.
 */
export const togglePanel = (isOpen: boolean, root: Element): void => {
    const panel = root.querySelector('.now-widget-panel') as HTMLElement;
    const hostContent = document.getElementById('now-widget-host-content');

    if (panel && hostContent) {
        if (isOpen) {
            panel.classList.add('open');
            hostContent.classList.add('panel-open');
        } else {
            panel.classList.remove('open');
            hostContent.classList.remove('panel-open');
        }
    }
}

/**
 * Displays user information inside the widget panel.
 * @param user - The User object containing user information.
 * @param panel - The widget panel HTMLElement.
 */
export const renderUserInfo = (user: User | null, panel: HTMLElement): void => {
    const userInfo = panel.querySelector('.now-widget-user-info');
    if (userInfo && user) {
        userInfo.innerHTML = `
            <img src="${user.image || '/placeholder-user.jpg'}" alt="${user.displayName || user.name}" class="now-widget-avatar">
            <div class="now-widget-user-details">
                <h2 class="now-widget-user-name">${user.displayName || user.name}</h2>
                <p class="now-widget-user-bio">${user.bio || ''}</p>
            </div>
        `;
    }
};

/**
 * Renders posts inside the widget panel.
 * @param posts - An array of Post objects.
 * @param panel - The widget panel HTMLElement.
 */
export const renderPostsInPanel = (posts: Post[], panel: HTMLElement): void => {
    const content = panel.querySelector('#now-widget-content');
    if (content) {
        content.innerHTML = '<h2>Your Posts</h2>';
        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'now-widget-post';
            postEl.innerHTML = `<p>${post.content}</p>`;
            content.appendChild(postEl);
        });
    } else {
        console.error('Content element not found in the panel');
    }
};

/**
 * Displays an error message inside the widget panel.
 * @param error - The error message to display.
 */
export const displayError = (error: string, panel: HTMLElement): void => {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('now-widget-error');
    errorDiv.textContent = `Error: ${error}`;
    panel.appendChild(errorDiv);
};

/**
 * Handles errors by displaying them in the panel.
 * @param message - The error message to display.
 * @param panel - The panel HTMLElement where the error should be displayed.
 */
export const handleError = (message: string, panel: HTMLElement): void => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'now-widget-error';
    errorDiv.textContent = `Error: ${message}`;
    panel.appendChild(errorDiv);
};


export const createShadowContainer = (): ShadowRoot => {
    const container = document.createElement('div');
    const shadow = container.attachShadow({ mode: 'open' });
    document.body.appendChild(container);
    return shadow;
};

export const wrapHostContent = (): void => {
    const body = document.body;
    const wrapper = document.createElement('div');
    wrapper.id = 'now-widget-host-content';

    // Move existing body children into the wrapper
    while (body.firstChild) {
        wrapper.appendChild(body.firstChild);
    }

    body.appendChild(wrapper);
};

export const injectGlobalStyles = (): void => {
    const style = document.createElement('style');
    style.textContent = `
        /* Host content container */
        #now-widget-host-content {
            transition: margin-left 0.3s ease;
        }

        /* When panel is open, push content to the right */
        #now-widget-host-content.panel-open {
            margin-left: 30vw;
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
            #now-widget-host-content.panel-open {
                margin-left: 50vw;
            }
        }

        @media (max-width: 768px) {
            #now-widget-host-content.panel-open {
                margin-left: 80vw;
            }
        }
    `;
    document.head.appendChild(style);
};
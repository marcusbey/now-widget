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
} | null => {
    const scripts = document.getElementsByTagName('script');
    let currentScript: HTMLScriptElement | null = null;

    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
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

    console.log('Retrieved script attributes:', {
        userId,
        token,
        theme,
        position,
        buttonColor,
    });

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

        // Create host content wrapper if it doesn't exist
        let hostContent = document.getElementById('now-widget-host-content');
        if (!hostContent) {
            hostContent = document.createElement('div');
            hostContent.id = 'now-widget-host-content';

            // Move existing body content to wrapper
            while (document.body.firstChild) {
                hostContent.appendChild(document.body.firstChild);
            }
            document.body.appendChild(hostContent);
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'now-widget-overlay';
        document.body.appendChild(overlay);

        document.body.appendChild(container);
    }

    return container;
};


/**
 * Toggles the visibility of the NowWidget side panel.
 * @param isOpen - Boolean indicating whether to open or close the panel.
 * @param root - The root Element containing the panel.
 */
export const togglePanel = (isOpen: boolean, root: Element): void => {
    const panel = root.querySelector('.now-widget-panel') as HTMLElement;
    const button = document.getElementById('now-widget-button') as HTMLElement;
    const hostContent = document.getElementById('now-widget-host-content') as HTMLElement;
    const overlay = document.querySelector('.now-widget-overlay') as HTMLElement;

    if (panel && hostContent && overlay) {
        if (isOpen) {
            panel.classList.add('open');
            button.classList.add('panel-open');
            hostContent.classList.add('panel-open');
            overlay.classList.add('visible');
            document.body.classList.add('no-scroll');
        } else {
            panel.classList.remove('open');
            button.classList.remove('panel-open');
            hostContent.classList.remove('panel-open');
            overlay.classList.remove('visible');
            document.body.classList.remove('no-scroll');
        }
    }
};
/**
 * Displays user information inside the widget panel.
 * @param user - The User object containing user information.
 * @param panel - The widget panel HTMLElement.
 */
export const renderUserInfo = (user: User | null, panel: HTMLElement): void => {
    const userInfo = panel.querySelector('.now-widget-user-info');
    if (userInfo && user) {
        userInfo.innerHTML = `
            <img src="${user.image || '/placeholder-user.png'}" alt="${user.displayName || user.name}" class="now-widget-avatar">
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
    }
};
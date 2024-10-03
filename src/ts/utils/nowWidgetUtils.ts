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


export const createWidgetContainer = (): HTMLElement => {
    let container = document.getElementById('now-widget-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'now-widget-container';
        document.body.appendChild(container);
    }
    return container;
};


export const createButton = (onClick: () => void): void => {
    const button = document.createElement('button');
    button.id = 'now-widget-button';
    button.innerText = '+';
    button.onclick = onClick;
    document.getElementById('now-widget-container')?.appendChild(button);
};


export const createPanel = (): HTMLElement => {
    let panel = document.getElementById('now-widget-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'now-widget-panel';
        const closeButton = document.createElement('button');
        closeButton.id = 'now-widget-close';
        closeButton.innerText = '×';
        closeButton.onclick = () => togglePanel(false);
        panel.appendChild(closeButton);
        const content = document.createElement('div');
        content.id = 'now-widget-content';
        panel.appendChild(content);
        document.body.appendChild(panel);
    }
    return panel;
};

/**
 * Toggles the visibility of the NowWidget side panel.
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
/**
 * Applies the selected theme to the widget.
 * @param theme - The theme to apply ('light' or 'dark').
 */
export const applyTheme = (theme?: string): void => {
    const panels = document.getElementsByClassName('now-widget-panel');
    if (panels.length > 0) {
        const panel = panels[0] as HTMLElement;
        if (theme === 'dark') {
            panel.classList.add('dark-theme');
        } else {
            panel.classList.remove('dark-theme');
        }
    }
};

/**
 * Sets the position of the widget button on the screen.
 * @param position - The position to set ('left' or 'right').
 */
export const setPosition = (position?: string): void => {
    const containers = document.getElementsByClassName('now-widget-container');
    if (containers.length > 0) {
        const container = containers[0] as HTMLElement;
        if (position === 'left') {
            container.style.right = 'auto';
            container.style.left = '0px';
        } else {
            container.style.left = 'auto';
            container.style.right = '0px';
        }
    }
    // Store the position in a data attribute
    document.body.setAttribute('data-widget-position', position || 'right');
};
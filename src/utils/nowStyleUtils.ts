/**
 * Applies the selected theme to the widget.
 * @param theme - The theme to apply ('light' or 'dark').
 */
export const applyTheme = (theme?: string): void => {
    const panel = document.getElementById('now-widget-panel');
    if (panel) {
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
    const container = document.getElementById('now-widget-container');
    if (container) {
        if (position === 'left') {
            container.style.right = 'auto';
            container.style.left = '20px';
        } else {
            container.style.left = 'auto';
            container.style.right = '20px';
        }
    }
};
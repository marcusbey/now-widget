// Start of Selection
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
 * @param position - The position to set ('left').
 */
export const setPosition = (): void => {
    const containers = document.getElementsByClassName('now-widget-container');
    if (containers.length > 0) {
        const container = containers[0] as HTMLElement;
        container.style.left = '0px';
        container.style.right = 'auto';
    }
    // Store the position in a data attribute
    document.body.setAttribute('data-widget-position', 'left');
};
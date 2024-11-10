import { THEMES } from '../types/theme';
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


export const injectStyles = (
    theme: 'light' | 'dark',
    position: 'left' | 'right',
    buttonColor?: string
): void => {
    const themeConfig = THEMES[theme];
    const customButtonColor = buttonColor || themeConfig.buttonColor;

    const styleEl = document.createElement('style');
    styleEl.id = 'now-widget-dynamic-styles';

    styleEl.textContent = `
    :root {
      --button-color: ${customButtonColor};
      --theme-background: ${themeConfig.background};
      --theme-text: ${themeConfig.text};
      --theme-text-secondary: ${themeConfig.textSecondary};
      --theme-border: ${themeConfig.border};
      --theme-hover: ${themeConfig.hover};
      --theme-post-bg: ${themeConfig.postBg};
    }
    
    #now-widget-button {
      ${position}: 40px;
      ${position === 'left' ? 'right: auto' : 'left: auto'};
    }
    
    .now-widget-panel {
      ${position}: 0;
      transform: translateX(${position === 'left' ? '-100%' : '100%'});
    }
    
    .now-widget-panel.open {
      transform: translateX(0);
    }
    
    #now-widget-host-content.panel-open {
      transform: translateX(${position === 'left' ? 'var(--panel-width)' : 'calc(var(--panel-width) * -1)'});
    }
  `;

    // Remove existing dynamic styles if any
    document.getElementById('now-widget-dynamic-styles')?.remove();
    document.head.appendChild(styleEl);
};
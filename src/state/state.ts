let widgetRoot: HTMLElement;

export const initializeWidgetRoot = (root: HTMLElement) => {
    widgetRoot = root;
};

export interface WidgetState {
    isPanelOpen: boolean;
    isLoading: boolean;
    error: string | null;
}

export const widgetState: WidgetState = {
    isPanelOpen: false,
    isLoading: false,
    error: null,
};

export const setLoading = (isLoading: boolean): void => {
    widgetState.isLoading = isLoading;
    const panel = widgetRoot?.querySelector('#now-widget-panel') as HTMLElement | null;
    if (panel) {
        if (isLoading) {
            panel.classList.add('loading');
        } else {
            panel.classList.remove('loading');
        }
    }
};
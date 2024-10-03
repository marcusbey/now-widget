import { createWidgetContainer, getScriptAttributes, togglePanel } from '../utils/nowWidgetUtils';

describe('Widget Utilities', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('getScriptAttributes returns null if attributes are missing', () => {
        const scripts = document.createElement('script');
        document.body.appendChild(scripts);
        expect(getScriptAttributes()).toBeNull();
    });

    test('getScriptAttributes returns userId and token', () => {
        const script = document.createElement('script');
        script.setAttribute('data-user-id', 'testUser');
        script.setAttribute('data-token', 'testToken');
        document.body.appendChild(script);
        expect(getScriptAttributes()).toEqual({ userId: 'testUser', token: 'testToken' });
    });

    test('createWidgetContainer creates and returns the container', () => {
        const container = createWidgetContainer();
        expect(container).toBeDefined();
        expect(container.id).toBe('now-widget-container');
        expect(document.getElementById('now-widget-container')).toBe(container);
    });

    test('togglePanel adds and removes the open class', () => {
        const panel = document.createElement('div');
        panel.id = 'now-widget-panel';
        document.body.appendChild(panel);

        togglePanel(true);
        expect(panel.classList.contains('open')).toBe(true);

        togglePanel(false);
        expect(panel.classList.contains('open')).toBe(false);
    });
});
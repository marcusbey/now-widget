import { createWidgetContainer, getScriptAttributes, togglePanel } from '../utils/nowWidgetUtils';

describe('Widget Utilities', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    describe('createWidgetContainer', () => {
        it('should create and append the widget container if it does not exist', () => {
            const container = createWidgetContainer();
            expect(container).toBeDefined();
            expect(container.id).toBe('now-widget-container');
            expect(document.getElementById('now-widget-container')).toBe(container);
        });

        it('should return the existing widget container if it exists', () => {
            const existingContainer = document.createElement('div');
            existingContainer.id = 'now-widget-container';
            document.body.appendChild(existingContainer);

            const container = createWidgetContainer();
            expect(container).toBe(existingContainer);
            expect(document.querySelectorAll('#now-widget-container').length).toBe(1);
        });
    });

    describe('getScriptAttributes', () => {
        it('should return null if script with required attributes is not found', () => {
            const result = getScriptAttributes();
            expect(result).toBeNull();
        });

        it('should return attributes when script tag has required data attributes', () => {
            const script = document.createElement('script');
            script.setAttribute('data-user-id', 'testUser');
            script.setAttribute('data-token', 'testToken');
            script.setAttribute('data-theme', 'dark');
            script.setAttribute('data-position', 'left');
            script.setAttribute('data-button-color', '#ff0000');
            document.body.appendChild(script);

            const result = getScriptAttributes();
            expect(result).toEqual({
                userId: 'testUser',
                token: 'testToken',
                theme: 'dark',
                position: 'left',
                buttonColor: '#ff0000',
            });
        });
    });

    describe('togglePanel', () => {
        it('should add the "open" class when isOpen is true', () => {
            const container = document.createElement('div');
            const panel = document.createElement('div');
            const hostContent = document.createElement('div');
            const overlay = document.createElement('div');

            panel.className = 'now-widget-panel';
            hostContent.id = 'now-widget-host-content';
            overlay.className = 'now-widget-overlay';

            container.appendChild(panel);
            document.body.appendChild(hostContent);
            document.body.appendChild(overlay);

            togglePanel(true, container);

            expect(panel.classList.contains('open')).toBe(true);
            expect(hostContent.classList.contains('panel-open')).toBe(true);
            expect(overlay.classList.contains('visible')).toBe(true);
        });

        it('should remove the "open" class when isOpen is false', () => {
            const container = document.createElement('div');
            const panel = document.createElement('div');
            const hostContent = document.createElement('div');
            const overlay = document.createElement('div');

            panel.className = 'now-widget-panel open';
            hostContent.id = 'now-widget-host-content';
            hostContent.className = 'panel-open';
            overlay.className = 'now-widget-overlay visible';

            container.appendChild(panel);
            document.body.appendChild(hostContent);
            document.body.appendChild(overlay);

            togglePanel(false, container);

            expect(panel.classList.contains('open')).toBe(false);
            expect(hostContent.classList.contains('panel-open')).toBe(false);
            expect(overlay.classList.contains('visible')).toBe(false);
        });
    });
});
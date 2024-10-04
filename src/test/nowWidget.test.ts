// src/test/nowWidget.test.ts

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

        it('should include optional attributes if they are present', () => {
            const script = document.createElement('script');
            script.setAttribute('data-user-id', 'testUser');
            script.setAttribute('data-token', 'testToken');
            script.setAttribute('data-theme', 'dark');
            script.setAttribute('data-position', 'left');
            script.setAttribute('data-button-color', '#ff0000');
            script.setAttribute('data-button-size', '80');
            document.body.appendChild(script);
            expect(getScriptAttributes()).toEqual({
                userId: 'testUser',
                token: 'testToken',
                theme: 'dark',
                position: 'left',
                buttonColor: '#ff0000',
                buttonSize: '80',
            });
        });
    });

    describe('togglePanel', () => {
        it('should add the "open" class when isOpen is true', () => {
            const panel = document.createElement('div');
            panel.id = 'now-widget-panel';
            document.body.appendChild(panel);

            togglePanel(true);
            expect(panel.classList.contains('open')).toBe(true);
        });

        it('should remove the "open" class when isOpen is false', () => {
            const panel = document.createElement('div');
            panel.id = 'now-widget-panel';
            panel.classList.add('open');
            document.body.appendChild(panel);

            togglePanel(false);
            expect(panel.classList.contains('open')).toBe(false);
        });
    });
});
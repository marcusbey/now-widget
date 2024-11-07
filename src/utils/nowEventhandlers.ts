import { adjustSpinSpeed } from './nowAnimation';
import { togglePanel } from './nowWidgetUtils';

/**
 * Handles the scroll event to hide or show the NowWidget button.
 */
export const handleScroll = (root: Element): void => {
    const nowButton = root.querySelector('#now-widget-button') as HTMLElement | null;
    const panel = root.querySelector('#now-widget-panel') as HTMLElement | null;

    if (window.scrollY > 300) {
        nowButton?.classList.add('hidden');
    } else {
        nowButton?.classList.remove('hidden');
    }

    // Close the panel on scroll if it's open
    if (panel?.classList.contains('open')) {
        togglePanel(false, root);
    }
};

/**
 * Handles the mouse move event to adjust the spin speed of the text ring.
 * @param e - The MouseEvent object.
 */
export const handleMouseMove = (e: MouseEvent, root: Element): void => {
    const nowButton = root.querySelector('#now-widget-button') as HTMLElement | null;
    if (nowButton) {
        const rect = nowButton.getBoundingClientRect();
        const distance = Math.hypot(
            e.clientX - (rect.left + rect.width / 2),
            e.clientY - (rect.top + rect.height / 2)
        );
        const isNear = distance < 200; // Proximity threshold
        const isHovered = nowButton.matches(':hover');
        const textRing = nowButton.querySelector('.text-ring') as HTMLElement | null;

        if (textRing) {
            adjustSpinSpeed(isNear, isHovered, textRing);
        }
    }
};

/**
 * Adds all necessary event listeners to the widget container.
 */
export const addEventListeners = (container: HTMLElement): void => {
    const button = document.querySelector('#now-widget-button') as HTMLElement;
    const panel = container.querySelector('#now-widget-panel') as HTMLElement;

    button?.addEventListener('click', () => {
        const isOpen = panel.classList.contains('open');
        togglePanel(!isOpen, container);
    });

    // Close panel on outside click
    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (
            panel?.classList.contains('open') &&
            !panel.contains(target) &&
            !button?.contains(target)
        ) {
            togglePanel(false, container);
        }
    });

    // Close panel on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel?.classList.contains('open')) {
            togglePanel(false, container);
        }
    });
};
import { adjustSpinSpeed } from '../components/NowButton';
import { togglePanel } from './nowWidgetUtils';

/**
 * Handles the scroll event to hide or show the NowWidget button.
 */
export const handleScroll = () => {
    const nowButton = document.getElementById('now-widget-button');
    if (window.scrollY > 300) {
        nowButton?.classList.add('hidden');
    } else {
        nowButton?.classList.remove('hidden');
    }
};

/**
 * Handles the mouse move event to adjust the spin speed of the text ring.
 * @param e - The MouseEvent object.
 */
export const handleMouseMove = (e: MouseEvent) => {
    const nowButton = document.getElementById('now-widget-button');
    if (nowButton) {
        const rect = nowButton.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        const isNear = distance < 200; // Proximity Threshold
        const isHovered = nowButton.matches(':hover');
        const textRing = nowButton.querySelector('.text-ring') as HTMLElement;
        if (textRing) {
            adjustSpinSpeed(isNear, isHovered, textRing);
        }
    }
};

/**
 * Adds all necessary event listeners to the document and window.
 */
export const addEventListeners = (): void => {
    // Click Event to Toggle Panel
    const button = document.getElementById('now-widget-button');
    button?.addEventListener('click', () => togglePanel(true));

    // Scroll Event to Hide/Show Button
    window.addEventListener('scroll', handleScroll);

    // Mouse Movement Event to Adjust Animation
    document.addEventListener('mousemove', handleMouseMove);
};
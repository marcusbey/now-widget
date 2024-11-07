// src/utils/nowAnimation.ts

let animationFrameId: number;

/**
 * Animates the widget by performing animation-related updates.
 */
const animate = (): void => {
    // Perform animation-related updates
    // For example, update positions, opacity, or apply CSS classes
    animationFrameId = requestAnimationFrame(animate);
};

/**
 * Starts the animation loop.
 */
export const startAnimation = (): void => {
    animate();
};

/**
 * Stops the animation loop.
 */
export const stopAnimation = (): void => {
    cancelAnimationFrame(animationFrameId);
};

/**
 * Adjusts the spin speed of the text ring based on proximity and hover state.
 * @param isNear - Indicates if the cursor is near the button.
 * @param isHovered - Indicates if the button is currently hovered.
 * @param textRing - The HTMLElement representing the text ring.
 */
export const adjustSpinSpeed = (
    isNear: boolean,
    isHovered: boolean,
    textRing: HTMLElement
): void => {
    if (isHovered) {
        textRing.classList.add('fast-spin');
        textRing.classList.remove('slow-spin');
    } else if (isNear) {
        textRing.classList.add('slow-spin');
        textRing.classList.remove('fast-spin');
    } else {
        textRing.classList.remove('slow-spin', 'fast-spin');
    }
};


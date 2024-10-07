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
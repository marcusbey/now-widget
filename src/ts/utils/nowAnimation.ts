// src/utils/animation.ts

let animationFrameId: number;

/**
 * Animates the widget by performing animation-related updates.
 */
export const animate = (): void => {
    // Perform animation-related updates here
    // For example, spinning elements, transitions, etc.

    // Continue the animation loop
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
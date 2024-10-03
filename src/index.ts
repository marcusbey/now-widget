import { initializeNowWidget } from './components/NowWidget';
import './styles/nowWidgetStyles.css'; // Ensure CSS is bundled appropriately
import { addEventListeners } from './utils/nowEventHandlers';
import { getScriptAttributes } from './utils/nowWidgetUtils';

/**
 * Initializes the NowWidget by fetching script attributes and setting up the widget.
 */
const init = async (): Promise<void> => {
    const attributes = getScriptAttributes();
    if (!attributes) return;
    const { userId, token, theme, position, buttonColor, buttonSize } = attributes;

    // Initialize the widget with the fetched configuration
    await initializeNowWidget({
        userId,
        token,
        theme,
        position,
        buttonColor,
        buttonSize: buttonSize ? parseInt(buttonSize) : undefined,
    });

    // Add Event Listeners after widget initialization
    addEventListeners();
};

// Initialize the widget when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
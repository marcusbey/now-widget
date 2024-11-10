import { initializeNowWidget } from './components/NowWidget';
import './styles/nowWidgetStyles.css';
import { getScriptAttributes } from './utils/nowWidgetUtils';
import { pingServer } from './utils/pingServer';

/**
 * Initializes the NowWidget by fetching script attributes and setting up the widget.
 */
const init = async (): Promise<void> => {
    if (document.getElementById('now-widget-container')) {
        console.log('Widget already initialized.');
        return;
    }
    const attributes = getScriptAttributes();
    console.log('Retrieved attributes:', attributes);
    if (!attributes) return;
    const { userId, token, theme, position, buttonColor } = attributes;

    // Initialize the widget with the fetched configuration
    await initializeNowWidget({
        userId,
        token,
        theme,
        position,
        buttonColor,
    });

    // Start pinging the server
    pingServer();
};

// Initialize the widget when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
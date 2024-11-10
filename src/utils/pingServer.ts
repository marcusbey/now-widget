let retryCount = 0;
const MAX_RETRIES = 5;
const BASE_DELAY = 2000;
let isPinging = false;
let timeoutId: number | null = null;
const DEBOUNCE_DELAY = 500;
let debounceTimeout: number | null = null;

export const pingServer = async () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = window.setTimeout(async () => {
        if (isPinging) return;
        isPinging = true;

        try {
            const response = await fetch('http://localhost:5173/dist/now-widget.js');
            if (response.ok) {
                console.log('Server is reachable');
                retryCount = 0;
            }
        } catch (error) {
            retryCount++;
            if (retryCount <= MAX_RETRIES) {
                const delay = BASE_DELAY * Math.pow(2, retryCount);
                console.warn(`Ping failed. Retrying in ${delay}ms`);
                timeoutId = window.setTimeout(pingServer, delay);
            } else {
                console.error('Max retry attempts reached. Stopping pings.');
            }
        } finally {
            isPinging = false;
        }
    }, DEBOUNCE_DELAY);
};

// Remove the immediate ping to control initiation externally
// pingServer();

export const stopPinging = () => {
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    isPinging = false;
};
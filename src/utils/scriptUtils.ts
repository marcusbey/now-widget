/**
 * Retrieves script attributes from the currently executing script tag.
 * @returns An object containing userId, token, and optional configuration parameters, or null if required attributes are missing.
 */
export const getScriptAttributes = (): {
    userId: string;
    token: string;
    theme?: string;
    position?: string;
    buttonColor?: string;
    buttonSize?: string;
} | null => {
    const scripts = document.getElementsByTagName('script');
    let currentScript: HTMLScriptElement | null = null;

    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        if (script.getAttribute('data-user-id') && script.getAttribute('data-token')) {
            currentScript = script;
            break;
        }
    }

    if (!currentScript) {
        console.error("NowWidget: Unable to locate the current script.");
        return null;
    }

    const userId = currentScript.getAttribute('data-user-id');
    const token = currentScript.getAttribute('data-token');
    const theme = currentScript.getAttribute('data-theme');
    const position = currentScript.getAttribute('data-position');
    const buttonColor = currentScript.getAttribute('data-button-color');
    const buttonSize = currentScript.getAttribute('data-button-size');

    if (!userId || !token) {
        console.error("NowWidget: Missing userId or token in script attributes.");
        return null;
    }

    return {
        userId,
        token,
        theme: theme ?? undefined,
        position: position ?? undefined,
        buttonColor: buttonColor ?? undefined,
        buttonSize: buttonSize ?? undefined,
    };
};
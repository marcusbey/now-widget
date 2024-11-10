interface ThemeConfig {
    background: string;
    text: string;
    textSecondary: string;
    border: string;
    hover: string;
    postBg: string;
    buttonColor: string;
}

export const THEMES: Record<'light' | 'dark', ThemeConfig> = {
    light: {
        background: '#ffffff',
        text: '#000000',
        textSecondary: '#666666',
        border: '#e0e0e0',
        hover: '#f5f5f5',
        postBg: '#f8f8f8',
        buttonColor: '#000000'
    },
    dark: {
        background: '#1c1c1c',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
        border: '#333333',
        hover: '#2a2a2a',
        postBg: '#242424',
        buttonColor: '#ffffff'
    }
};


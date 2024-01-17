declare module '*.scss';
declare module '*.jsx';

declare global {
    interface ImportMeta {
        env: {
            VITE_RELOAD_BUTTON_NAME: string;
        };
    }
}
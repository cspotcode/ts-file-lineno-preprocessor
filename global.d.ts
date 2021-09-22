// Deliberately being very explicit about this being a *global* declaration.
export {};
declare global {
    declare const __SOURCE_POSITION__: {
        FILE: string;
        LINENO: string;
    }
}
export declare class ErrorBase extends Error {
    constructor(name: string, message?: string);
}
export declare class ArgumentError extends ErrorBase {
    constructor(message?: string);
}

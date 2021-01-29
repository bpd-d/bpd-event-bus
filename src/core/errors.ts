export class ErrorBase extends Error {
    constructor(name: string, message?: string,) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}

export class ArgumentError extends ErrorBase {
    constructor(message?: string) {
        super("ArgumentError", message);
    }
}
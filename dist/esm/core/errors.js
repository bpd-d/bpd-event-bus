export class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
export class ArgumentError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}

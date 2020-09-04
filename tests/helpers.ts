import { BpdEventContext } from "../src/interfaces";

export class ExampleReceiver implements BpdEventContext {
    id: string;
    data: string;
    constructor(id?: string) {
        this.id = id ?? "ExampleReceiver";
        this.data = "#";
    }

    onEventCall(arg: string) {
        if (arg)
            this.data = arg;
    }
}

export class FailingReceiver implements BpdEventContext {
    id: string;
    data: string;
    constructor(id?: string) {
        this.id = id ?? "ExampleReceiver";
        this.data = "#";
    }

    onEventCall(arg: string) {
        throw new Error("Error");
    }
}

export class ExampleTarget implements BpdEventContext {
    id: string;
    constructor(id?: string) {
        this.id = id ?? "ExampleTarget";
    }


}
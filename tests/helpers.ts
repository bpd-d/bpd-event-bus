import { BpdEventContext } from "../src/interfaces";

export class ExampleReceiver implements BpdEventContext {
    eventId: string;
    data: string;
    constructor(id?: string) {
        this.eventId = id ?? "ExampleReceiver";
        this.data = "#";
    }

    onEventCall(arg: string) {
        if (arg)
            this.data = arg;
    }
}

export class FailingReceiver implements BpdEventContext {
    eventId: string;
    data: string;
    constructor(id?: string) {
        this.eventId = id ?? "ExampleReceiver";
        this.data = "#";
    }

    onEventCall(arg: string) {
        throw new Error("Error");
    }
}

export class ExampleTarget implements BpdEventContext {
    eventId: string;
    constructor(id?: string) {
        this.eventId = id ?? "ExampleTarget";
    }


}
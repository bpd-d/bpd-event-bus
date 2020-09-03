import { CuiEventContext } from "../src/index";

export class ExampleReceiver implements CuiEventContext {
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

export class ExampleTarget implements CuiEventContext {
    id: string;
    constructor(id?: string) {
        this.id = id ?? "ExampleTarget";
    }


}
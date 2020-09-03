import { IBpdCallbackExecutor, IBpdEventEmitHandler, BpdEventReceiver, IBpdHandlerPerformer } from "../src/interfaces";
import { BpdCallbackExecutor } from "../src/executors";
import { BpdBasicHandlePerformer, BpdAsyncHandlePerformer } from "../src/performers";
import { BasicEventEmitHandler } from "../src/handlers";
import { ExampleReceiver } from "./helpers";

describe("Tests for class [TaskedEventEmitHandler]", function () {

    let executor: IBpdCallbackExecutor;
    let performer: IBpdHandlerPerformer;
    let handler: IBpdEventEmitHandler;

    beforeEach(() => {
        executor = new BpdCallbackExecutor();
        performer = new BpdAsyncHandlePerformer(executor);
        handler = new BasicEventEmitHandler(performer);
    })

    it("Case for method [handle] - no context", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: { id: "000" } }
        }
        await handler.handle("ev", tasks, null, ["true"])

        expect(item.data).toEqual("true");
    })

    it("Case for method [handle] - no args", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null }
        }
        await handler.handle("ev", tasks, null, null)

        expect(item.data).toEqual("#");
    })

    it("Case for method [handle] - many tasks", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        await handler.handle("ev", tasks, null, ["true"])

        expect(item.data).toEqual("true");
        expect(item2.data).toEqual("true");
    })

    it("Case for method [handle] - many tasks, two events", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        await Promise.all(
            [handler.handle("ev", tasks, null, ["true"]),
            handler.handle("ev", tasks, null, ["XXX"])])

        expect(item.data).toEqual("XXX");
        expect(item2.data).toEqual("XXX");
    })
})


describe("Tests for class [SimpleEventEmitHandler]", function () {

    let executor: IBpdCallbackExecutor;
    let performer: IBpdHandlerPerformer;
    let handler: IBpdEventEmitHandler;

    beforeEach(() => {
        executor = new BpdCallbackExecutor();
        performer = new BpdBasicHandlePerformer(executor);
        handler = new BasicEventEmitHandler(performer);
    })

    it("Case for method [handle] - no context", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: "000" }
        }
        await handler.handle("ev", tasks, null, ["true"])

        expect(item.data).toEqual("true");
    })

    it("Case for method [handle] - no args", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null }
        }
        await handler.handle("ev", tasks, null, null)

        expect(item.data).toEqual("#");
    })

    it("Case for method [handle] - many tasks", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null },
            "task2": { ctx: item2, callback: item2.onEventCall, target: null }
        }
        await handler.handle("ev", tasks, null, ["true"])

        expect(item.data).toEqual("true");
        expect(item2.data).toEqual("true");
    })


    it("Case for method [handle] - many tasks, two events", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        await Promise.all(
            [handler.handle("ev", tasks, null, ["true"]),
            handler.handle("ev", tasks, null, ["XXX"])])

        expect(item.data).toEqual("XXX");
        expect(item2.data).toEqual("XXX");
    })
})
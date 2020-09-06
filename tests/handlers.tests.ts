import { IBpdCallbackExecutor, IBpdEventEmitHandler, BpdEventReceiver, IBpdHandlerPerformer } from "../src/interfaces";
import { BpdCallbackExecutor } from "../src/executors";
import { BpdBasicHandlePerformer, BpdAsyncHandlePerformer } from "../src/performers";
import { BasicEventEmitHandler, ExtendedEventEmitHandler } from "../src/handlers";
import { ExampleReceiver, FailingReceiver } from "./helpers";

describe("Tests for class [BasicEventEmitHandler]", function () {

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
            "task": { ctx: item, callback: item.onEventCall, target: { eventId: "000" } }
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

    it("Case for method [handle] - many tasks, one failing", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: FailingReceiver = new FailingReceiver();
        let failed: boolean = false;
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        try {


            await handler.handle("ev", tasks, null, ["true"])

        } catch (e) {
            failed = true;
        }

        expect(item.data).toEqual("true");
        expect(failed).toBeFalse();
    })

    it("Case for method [handle] - many tasks, two events, one failing", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: FailingReceiver = new FailingReceiver();
        let failed: boolean = false
        let taskFailng: BpdEventReceiver = {
            "task": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }

        let task: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null }
        }
        try {
            await Promise.all(
                [handler.handle("ev", taskFailng, null, ["true"]),
                handler.handle("ev", task, null, ["XXX"])])
        } catch (e) {
            failed = true;
        }


        expect(item.data).toEqual("XXX");
        expect(failed).toBeFalse();
    })

})


describe("Tests for class [ExtendedEventEmitHandler]", function () {

    let executor: IBpdCallbackExecutor;
    let performer: IBpdHandlerPerformer;
    let handler: IBpdEventEmitHandler;

    beforeEach(() => {
        executor = new BpdCallbackExecutor();
        performer = new BpdBasicHandlePerformer(executor);
        handler = new ExtendedEventEmitHandler(performer);
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

    it("Case for method [handle] - many tasks, one failing", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: FailingReceiver = new FailingReceiver();
        let failed: boolean = false;
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        try {


            await handler.handle("ev", tasks, null, ["true"])

        } catch (e) {
            failed = true;
        }

        expect(item.data).toEqual("true");
        expect(failed).toBeFalse();
    })

    it("Case for method [handle] - many tasks, two events, one failing", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: FailingReceiver = new FailingReceiver();
        let failed: boolean = false
        let taskFailng: BpdEventReceiver = {
            "task": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }

        let task: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: null }
        }
        try {
            await Promise.all(
                [handler.handle("ev", taskFailng, null, ["true"]),
                handler.handle("ev", task, null, ["XXX"])])
        } catch (e) {
            failed = true;
        }


        expect(item.data).toEqual("XXX");
        expect(failed).toBeFalse();
    })
})
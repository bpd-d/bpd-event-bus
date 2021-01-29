import { IBpdCallbackExecutor, IBpdHandlerPerformer, BpdEventReceiver } from "../src/core/interfaces";
import { BpdCallbackExecutor } from '../src/core/executors';
import { ExampleReceiver, FailingReceiver } from "./helpers";
import { BpdBasicHandlePerformer, BpdAsyncHandlePerformer } from "../src/bus/performers";

describe("Tests for class [BpdBasicHandlePerformer]", function () {

    let executor: IBpdCallbackExecutor;
    let performer: IBpdHandlerPerformer;

    beforeEach(() => {
        executor = new BpdCallbackExecutor();
        performer = new BpdBasicHandlePerformer(executor);
    })

    it("Case for method [perform]", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: "000" }
        }
        await performer.perform({
            events: tasks,
            id: null,
            args: ["XXX"]
        })

        expect(item.data).toEqual("XXX");
    })

    it("Case for method [perform] - failing callback", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: FailingReceiver = new FailingReceiver();
        let failed: boolean = false;
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: "000" },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        try {
            await performer.perform({
                events: tasks,
                id: null,
                args: ["XXX"]
            })
        }
        catch (e) {
            failed = true;
        }

        expect(item.data).toEqual("XXX");
        expect(failed).toBeTrue();
    })

})

describe("Tests for class [BpdAsyncHandlePerformer]", function () {

    let executor: IBpdCallbackExecutor;
    let performer: IBpdHandlerPerformer;

    beforeEach(() => {
        executor = new BpdCallbackExecutor();
        performer = new BpdAsyncHandlePerformer(executor);
    })

    it("Case for method [perform]", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: "000" }
        }
        await performer.perform({
            events: tasks,
            id: null,
            args: ["XXX"]
        })

        expect(item.data).toEqual("XXX");
    })


    it("Case for method [perform] - failing callback", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        let item2: FailingReceiver = new FailingReceiver();
        let failed: boolean = false;
        let tasks: BpdEventReceiver = {
            "task": { ctx: item, callback: item.onEventCall, target: "000" },
            "task2": { ctx: item2, callback: item2.onEventCall, target: "000" }
        }
        try {
            await performer.perform({
                events: tasks,
                id: null,
                args: ["XXX"]
            })
        }
        catch (e) {
            failed = true;
        }

        expect(item.data).toEqual("XXX");
        expect(failed).toBeTrue();
    })

})
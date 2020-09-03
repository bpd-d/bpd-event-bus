import { IBpdCallbackExecutor, IBpdHandlerPerformer, BpdEventReceiver } from "../src/interfaces";
import { BpdCallbackExecutor } from '../src/executors';
import { ExampleReceiver } from "./helpers";
import { BpdBasicHandlePerformer, BpdAsyncHandlePerformer } from "../src/performers";

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

})
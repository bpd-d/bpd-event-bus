import { IBpdCallbackExecutor } from "../src/interfaces";
import { BpdCallbackExecutor } from '../src/executors';
import { ExampleReceiver } from "./helpers";

describe("Tests for class [BpdCallbackExecutor]", function () {

    let executor: IBpdCallbackExecutor;

    beforeEach(() => {
        executor = new BpdCallbackExecutor();
    })

    it("Case for method [execute] - no context", async function () {
        let value: boolean = false;
        await executor.execute(() => {
            value = true;
        }, null, null)

        expect(value).toBeTrue();
    })

    it("Case for method [execute] - with context", async function () {
        let item: ExampleReceiver = new ExampleReceiver();
        await executor.execute(item.onEventCall, item, ["true"]);

        expect(item.data).toEqual("true");
    })
})


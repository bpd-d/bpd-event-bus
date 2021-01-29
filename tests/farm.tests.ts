import { BpdEventBusFactory } from "../src/bus/engine";
import { BpdEventBusSetup, IBpdEventBus } from "../src/core/interfaces";
import { ExampleReceiver } from "./helpers";

const TEST_EVENT_NAME = "Test_001";

describe("Tests for class [BpdEventBusFarm]", function () {
    let bus: IBpdEventBus;

    beforeEach(() => {
        const setup: BpdEventBusSetup = {
            queue: [
                {
                    name: "Test",
                    priority: 0,
                    handling: "basic",
                    policy: "simple",
                    eventsDef: [TEST_EVENT_NAME]
                }
            ]
        }
        bus = BpdEventBusFactory.create(setup);
    })

    it("Case for method [on]", function () {
        let item = new ExampleReceiver('001');
        let subscribing: boolean = false;

        bus.on(TEST_EVENT_NAME, item.onEventCall, { ctx: item });

        subscribing = bus.isSubscribing(TEST_EVENT_NAME, item)
        expect(subscribing).toBeTrue();
    })

    it("Case for method [detach]", function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let subscribing: boolean = false;

        bus.on(TEST_EVENT_NAME, item.onEventCall, { ctx: item });
        bus.on(TEST_EVENT_NAME, item2.onEventCall, { ctx: item2 });

        bus.detach(TEST_EVENT_NAME, item);
        subscribing = bus.isSubscribing(TEST_EVENT_NAME, item)
        expect(subscribing).toBeFalse();
    })

})
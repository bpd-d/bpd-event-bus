import { IBpdEventBus } from "../src/interfaces";
import { ExampleReceiver } from "./helpers";
import { BpdEventBusFactory } from "../src";

describe("Tests for class [CuiEventBus]", function () {
    let bus: IBpdEventBus;
    // let executor: IBpdCallbackExecutor;
    // let handler: IBpdEventEmitHandler;

    beforeEach(() => {
        // executor = new BpdCallbackExecutor();
        // handler = new TaskedEventEmitHandler(executor);
        // bus = new BpdEventBus(handler);
        bus = BpdEventBusFactory.create();
    })

    it("Case for method [on]", function () {
        let item = new ExampleReceiver('001');
        let subscribing: boolean = false;
        bus.on('test', item.onEventCall, item);
        subscribing = bus.isSubscribing('test', item)
        expect(subscribing).toBeTrue();
    })

    it("Case for method [on] - missing event name", function () {
        let item = new ExampleReceiver('001');
        let subscribing: boolean = false;

        bus.on('', item.onEventCall, item);

        subscribing = bus.isSubscribing('test', item)
        expect(subscribing).toBeFalse();
    })

    it("Case for method [on] - incorrect receiver id", function () {
        let item = new ExampleReceiver('');
        let subscribing: boolean = false;
        let subscribingId: boolean = false;
        let id = bus.on('test', item.onEventCall, item);
        console.log("ID: " + id)
        subscribing = bus.isSubscribing('test', item)
        subscribingId = bus.isSubscribing('test', id);
        expect(subscribing).toBeFalse();
        expect(subscribingId).toBeTrue();
    })

    it("Case for method [detach]", function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let subscribing: boolean = false;

        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        bus.detach('test', item);
        subscribing = bus.isSubscribing('test', item)
        expect(subscribing).toBeFalse();
    })

    it("Case for method [detach] - incorrect argument", function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let subscribing: boolean = false;
        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        bus.detach('test', null);
        subscribing = bus.isSubscribing('test', item)
        expect(subscribing).toBeTrue();
    })

    it("Case for method [detachAll]", function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let subscribing: boolean = false;
        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        bus.detachAll('test');
        subscribing = bus.isSubscribing('test', item)
        expect(subscribing).toBeFalse();
    })

    it("Case for method [detachAll] - incorrect event name", function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let subscribing: boolean = false;
        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        bus.detachAll('');
        subscribing = bus.isSubscribing('test', item)



        expect(subscribing).toBeTrue();
    })

    it("Case for method [emit]", async function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');

        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        await bus.emit('test', null, "true");

        expect(item.data).toEqual("true");
        expect(item2.data).toEqual("true");
    })

    it("Case for method [emit] - missing event name", async function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');

        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        await bus.emit('', null, "true");

        expect(item.data).toEqual("#");
        expect(item2.data).toEqual("#");
    })

    it("Case for method [emit] - different event name", async function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');

        bus.on('test', item.onEventCall, item);
        bus.on('test', item2.onEventCall, item2);

        await bus.emit('test_2', null, true);

        expect(item.data).toEqual("#");
        expect(item2.data).toEqual("#");
    })

    it("Case for method [emit] - no event attached", async function () {
        let failed: boolean = false;
        try {

            await bus.emit('test', null, true);
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })


    it("Case for method [emit] - call event only for specfic components", async function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let target: string = "000-000-01";
        let failed: boolean = false;
        try {
            bus.on('test', item.onEventCall, item, target);
            bus.on('test', item2.onEventCall, item2);

            await bus.emit('test', target, "true");
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(item.data).toEqual("true");
        expect(item2.data).toEqual("#");
    })

    it("Case for method [emit] - call event all components regardless of a attached element", async function () {
        let item = new ExampleReceiver('001');
        let item2 = new ExampleReceiver('002');
        let target: string = "000-000-01";
        let failed: boolean = false;
        try {
            bus.on('test', item.onEventCall, item, target);
            bus.on('test', item2.onEventCall, item2);

            await bus.emit('test', null, "true");
        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(item.data).toEqual("true");
        expect(item2.data).toEqual("true");
    })
})
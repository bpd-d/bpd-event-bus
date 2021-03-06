import { BpdEventBusFactory } from "./bus/engine";

export const BPD_EVENT_BUS_VERSION = "0.1.3";

declare global {
    interface Window {
        $bpdEventBusVersion: string;
        $bpdEvenBusFactory: BpdEventBusFactory;
    }
}

window.$bpdEventBusVersion = BPD_EVENT_BUS_VERSION;
window.$bpdEvenBusFactory = BpdEventBusFactory;
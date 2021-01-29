import { BpdEventBusFactory } from "./bus/engine";
export declare const BPD_EVENT_BUS_VERSION = "0.1.3";
declare global {
    interface Window {
        $bpdEventBusVersion: string;
        $bpdEvenBusFactory: BpdEventBusFactory;
    }
}

import { IBpdEventBusInstanceSetup } from "../core/interfaces";

export function getDefaultBusSetup(): IBpdEventBusInstanceSetup {
    return {
        name: "Default",
        handling: "basic",
        policy: "tasked",
        eventsDef: [],
        priority: 99
    }
} 
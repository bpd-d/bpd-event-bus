import { ContextArgument } from "./interfaces";

/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 * 
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export function is(val: any, typecheck: boolean = true): boolean {
    if (typeof val !== 'undefined' && val !== null) {
        if (!typecheck) {
            return true;
        } else {
            return !isEmpty(val)
        }
    }
    return false;
}

/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export function isEmpty(val: any): boolean {
    if (typeof val === "string") {
        return val.length === 0
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0
    }
    return false
}

/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export function are(...attributes: any[]): boolean {
    if (!is(attributes)) {
        return false
    }
    let c = attributes.length;
    for (let i = 0; i < c; i++) {
        if (!is(attributes[i])) {
            return false;
        }
    }
    return true;
}


export function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0
        }
    }
}


export function getContextArgumentId(ctx?: ContextArgument): string | null {
    if (!ctx) {
        return null;
    } else if (typeof ctx === 'string') {
        return ctx;
    } else {
        return ctx.eventId;
    }
}
import { ContextArgument } from "./interfaces";
/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export declare function is(val: any, typecheck?: boolean): boolean;
/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export declare function isEmpty(val: any): boolean;
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export declare function are(...attributes: any[]): boolean;
export declare function counter(): Generator<number, void, unknown>;
export declare function getContextArgumentId(ctx?: ContextArgument): string | null;

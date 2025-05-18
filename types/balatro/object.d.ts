/**
 * Base interface for all objects.
 */
export interface LuaObject {

	/**
	 * Initialization method called during instantiation.
	 * In Lua you’d override this in subclasses.
	 */
	init(...arguments_: any[]): void,

	/**
	 * Checks whether this object is an instance of the given class
	 * (i.e. whether T appears in its prototype chain).
	 */
	is<T extends LuaObjectConstructor>(ctor: T): boolean
}

/**
 * Constructor/function type for creating LuaObject classes.
 * Supports both `new` and callable syntax to mimic Lua’s __call.
 */
export interface LuaObjectConstructor {

	/**
	 * Call signature: e.g. `let obj = Object();`
	 */
	(this: void, ...arguments_: any[]): LuaObject,

	/**
	 * New signature: e.g. `let obj = new Object();`
	 */
	new (...arguments_: any[]): LuaObject,

	/**
	 * Create a subclass of this class.
	 * Mirrors your `Object:extend()` which copies all “__*” members
	 * and sets up metatables.
	 */
	extend<T extends LuaObjectConstructor>(this: T): T,

	/**
	 * Reference to the parent class (the “super” in Lua).
	 */
	super: LuaObjectConstructor
}

/**
 * The root Object class, exactly like your `Object` in Lua.
 */
export const Object: LuaObjectConstructor;
export default Object;

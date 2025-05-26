/* eslint-disable import-x/group-exports */
import { LuaObject, LuaObjectConstructor } from "./object";

/**
 * Represents any game object with a transform, children, and interaction logic.
 * Mirrors the Lua `Controller` class extending the base `Object` OOP system.
 */
export interface Controller extends LuaObject {
	cursor_hover: Record<string, any>,
	HID: Record<string, any>,
	is_cursor_down: boolean,

	/** Update logic per frame. */
	update(dt: number): void
}

/**
 * Constructor/callable type for creating Controller instances, mirroring Lua's __call.
 */
export interface ControllerConstructor extends LuaObjectConstructor {
	new(): Controller,
	(this: void): Controller
}

/** The Controller class, extending the base Object OOP system. */
export const Controller: ControllerConstructor;
export default Controller;

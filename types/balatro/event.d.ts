// @noSelfInFile

import { LuaObject, LuaObjectConstructor } from "./object";

/**
 * Configuration object passed to an Event constructor.
 */
export interface EventConfig {
	blockable?: boolean,
	blocking?: boolean,
	delay?: number,
	ease?: "elastic" | "lerp" | "quad",
	ease_to?: any,
	func: (this: void, ...arguments_: any[]) => any,
	no_delete?: boolean,
	pause_force?: boolean,
	ref_table?: Record<string, any>,
	ref_value?: string,
	start_timer?: boolean,
	stop_val?: any,
	timer?: "REAL" | "TOTAL" | string,
	trigger?: "after" | "before" | "condition" | "ease" | "immediate"
}

/**
 * Represents a timed or conditional event in the game loop.
 */
export interface Event extends LuaObject {
	blockable?: boolean,
	blocking?: boolean,
	complete?: boolean,
	condition?: {
		ref_table: Record<string, any>,
		ref_value: string,
		stop_val: any
	},
	created_on_pause?: boolean,
	delay?: number,
	ease?: {
		end_time?: number,
		end_val: any,
		ref_table: Record<string, any>,
		ref_value: string,
		start_time?: number,
		start_val: any,
		type: string
	},
	func: (this: void, ...arguments_: any[]) => any,
	no_delete?: boolean,
	start_timer?: boolean,
	time?: number,
	timer?: string,
	trigger?: string,

	/**
	 * Handle this event for the current frame, writing results into the provided object.
	 */
	handle?(results: {
		blocking: boolean,
		completed: boolean,
		pause_skip: boolean,
		time_done: boolean
	}): void
}

/**
 * Constructor/callable type for Event.
 */
export interface EventConstructor extends LuaObjectConstructor {
	(this: void, config: EventConfig): Event
}

/** The Event class. */
export const Event: EventConstructor;

/**
 * Queue names used by the EventManager.
 */
export type QueueName = "achievement" | "base" | "other" | "tutorial" | "unlock";

/**
 * Manages scheduling and dispatch of Event instances across named queues.
 */
export interface EventManager extends LuaObject {
	queue_dt: number,
	queue_last_processed: number,
	queue_timer: number,
	queues: Record<QueueName, Event[]>,

	/**
	 * Initialize the EventManager and its queues.
	 */
	init(): void,

	/**
	 * Add an Event to a specified queue, optionally at the front.
	 */
	add_event(event: Event, queue?: QueueName, front?: boolean): void,

	/**
	 * Clear events from a specific queue or all queues, with an optional exception.
	 */
	clear_queue(queue?: QueueName, exception?: QueueName): void,

	/**
	 * Process events based on elapsed time and blocking rules.
	 */
	update(dt: number, forced?: boolean): void
}

/**
 * Constructor/callable type for EventManager.
 */
export interface EventManagerConstructor extends LuaObjectConstructor {
	new(): EventManager,
	(): EventManager
}

/** The EventManager class. */
export const EventManager: EventManagerConstructor;

declare global {
	const Event: EventConstructor;
	const EventManager: EventManagerConstructor;
}

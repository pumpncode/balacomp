/**
 *
 */
interface Joker<
	Config extends Record<string, any> = Record<string, any>
> {

	/** what used to be `JokerType.ability` */
	readonly ability: Config,

	/** what used to be `JokerType.config` */
	readonly config: Config,

	readonly name: string,

	readonly prefix_config: Record<string, any>,

	/**
	 *
	 */
	(this: void, options: Config): Joker

}

export default Joker;

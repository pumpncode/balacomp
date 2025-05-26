/**
 *
 */
interface Atlas<
	Config extends Record<string, any> = Record<string, any>
> {
	(this: void, options: Config): Atlas
}

export default Atlas;

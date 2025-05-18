/**
 * @noResolution
 */
declare module "socket" {
	interface Connection {
		receive(): LuaMultiReturn<[null | string]>,
		receivefrom(): LuaMultiReturn<[null | string, number | string, null | number]>,
		send(string: string): LuaMultiReturn<[null | string, number | string]>,
		setpeername(string: string, number: number): LuaMultiReturn<[null | string, number | string]>,
		setsockname(string: string, number: number): LuaMultiReturn<[null | string, number | string]>,
		settimeout(number: number): any
	}

	let socket: {
		__unload: Function,
		_DATAGRAMSIZE: 8_192,
		_SETSIZE: 1_024,
		_SOCKETINVALID: -1,
		_VERSION: "LuaSocket 3.0-rc1",
		bind: Function,
		BLOCKSIZE: 2_048,
		choose: Function,
		connect: Function,
		connect4: Function,
		connect6: Function,
		dns: Record<string, any>,
		gettime: Function,
		newtry: Function,
		protect: Function,
		select: Function,
		sink: Function,
		sinkt: Record<string, any>,
		skip: Function,
		sleep: Function,
		source: Function,
		sourcet: Record<string, any>,
		tcp: Function,
		tcp4: Function,
		tcp6: Function,
		try: Function,
		udp: (...arguments_: any[]) => Connection,
		udp4: Function,
		udp6: Function
	};

	export = socket;
}

declare const json: {
	decode: (data: string) => Record<string, any>,
	encode: (data: Record<string, any>) => string
};

export default json;

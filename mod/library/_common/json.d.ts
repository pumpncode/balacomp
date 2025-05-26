declare const decode: (this: void, data: string) => Record<string, any>;
declare const encode: (this: void, data: Record<string, any>) => string;

export { decode, encode };

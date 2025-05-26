import { ansi } from "@cliffy/ansi";
import {
	formatDiagnosticsWithColorAndContext,
	ModuleKind,
	ModuleResolutionKind,
	ScriptTarget
} from "typescript";
import * as tstl from "typescript-to-lua";

/**
 * @import { FormatDiagnosticsHost } from "typescript";
 */

const {
	cwd,
	stdout,
	writeTextFile
} = Deno;

const annoyingErrorCodes = new Set([5_097]);

let lastOutputLines = 0;

/**
 *
 * @example
 */
const buildMod = async () => {
	if (lastOutputLines > 0) {
		console.info(
			ansi
				.cursorUp(lastOutputLines)
				.eraseDown()
		);
	}

	const result = tstl.transpileFiles(
		["./mod/mod.ts"],
		{
			allowJs: false,
			allowSyntheticDefaultImports: true,
			allowUnreachableCode: false,
			allowUnusedLabels: false,
			alwaysStrict: true,
			baseUrl: "./mod",
			exactOptionalPropertyTypes: true,
			luaBundle: "./mod.lua",
			luaBundleEntry: "./mod/mod.ts",
			luaLibImport: tstl.LuaLibImportKind.Require,
			luaTarget: tstl.LuaTarget.Lua51,
			module: ModuleKind.ESNext,
			moduleResolution: ModuleResolutionKind.Node10,
			noErrorTruncation: true,
			noHeader: true,
			paths: {
				"~/*": ["./*"]
			},
			strict: true,
			target: ScriptTarget.ESNext,
			types: [
				"typescript/lib/lib.esnext.d.ts",
				"@typescript-to-lua/language-extensions",
				"lua-types/5.1",
				"love-typescript-definitions",
				"./mod/types/smods.d.ts",
				"./mod/types/balatro.d.ts",
				"./mod/types/socket.d.ts"
			]
		},
		async (fileName, text) => {
			await writeTextFile(fileName, text);
		}
	);

	const { diagnostics } = result;

	const filteredDiagnostics = diagnostics
		.filter(({ code }) => !annoyingErrorCodes.has(code));

	/**
	 * @type {FormatDiagnosticsHost}
	 */
	const formatHost = {
		getCanonicalFileName: (fileName) => fileName,
		getCurrentDirectory: () => cwd(),
		getNewLine: () => "\n"
	};

	const pretty = formatDiagnosticsWithColorAndContext(filteredDiagnostics, formatHost);

	const header = `Build at ${new Date().toLocaleTimeString()}\n`;
	const outputString = header + pretty;

	lastOutputLines = outputString.split("\n").length + 2;

	await stdout.write(new TextEncoder().encode(outputString));
};

export default buildMod;

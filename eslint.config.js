import pumpnEslintConfig from "@pumpn/eslint-config";

const eslintConfig = [
	...pumpnEslintConfig,
	{
		files: [
			"**/*.js",
			"**/*.jsx",
			"**/*.ts",
			"**/*.tsx"
		],
		rules: {
			"@eslint-react/naming-convention/filename": "off",
			"@eslint-react/prefer-read-only-props": "off",
			"import-x/no-cycle": "off",
			"import-x/no-namespace": "off",
			"import-x/no-restricted-paths": "off",
			"regexp/require-unicode-sets-regexp": "error",
			"security/detect-non-literal-regexp": "off",
			"security/detect-possible-timing-attacks": "off",
			"unicorn/prevent-abbreviations": [
				"error",
				{
					ignore: [/mod/iv]
				}
			]
		}
	},
	{
		files: ["**/*.doc.js"],
		rules: {
			"import-x/unambiguous": "off",
			"unicorn/no-empty-file": "off",
			"unicorn/prevent-abbreviations": "off"
		}
	},
	{
		files: ["dev.js"],
		rules: {
			"unicorn/prevent-abbreviations": "off"
		}
	},
	{
		files: ["**/*.ts"],
		rules: {
			camelcase: "off",
			"consistent-return": "off",
			"jsdoc/check-tag-names": "off",
			"jsdoc/require-example": "off",
			"jsdoc/require-param-type": "off",
			"jsdoc/require-returns": "off"
		}
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"no-unused-vars": "off"
		}
	},
	{
		files: ["**/_exports.?(*.)ts"],
		rules: {
			"@eslint-react/naming-convention/filename": "off",
			"import-x/max-dependencies": "off",
			"import-x/prefer-default-export": "off"
		}
	},
	{
		ignores: [
			"**/*.md/*.js",
			"**/*.jsdoc-defaults",
			"**/*.jsdoc-params",
			"**/*.jsdoc-properties"
		]
	}
];

export default eslintConfig;

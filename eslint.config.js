import pumpnEslintConfig from "@pumpn/eslint-config";

const eslintConfig = [
	...pumpnEslintConfig,
	{
		rules: {
			"@eslint-react/naming-convention/filename": "off",
			"func-params-args/func-args": [
				"warn",
				{
					global: 3,
					join: -1,
					reduce: 4
				}
			],
			"import-x/no-namespace": "off",
			"import-x/no-restricted-paths": "off",
			"perfectionist/sort-classes": [
				"error",
				{
					groups: [
						"index-signature",
						["private-static-property", "private-static-accessor-property"],
						["private-static-get-method", "private-static-set-method"],
						["static-property", "static-accessor-property"],
						["static-get-method", "static-set-method"],
						["protected-static-property", "protected-static-accessor-property"],
						["protected-static-get-method", "protected-static-set-method"],
						"static-block",
						["property", "accessor-property"],
						["get-method", "set-method"],
						["protected-property", "protected-accessor-property"],
						["protected-get-method", "protected-set-method"],
						["private-property", "private-accessor-property"],
						["private-get-method", "private-set-method"],
						"constructor",
						["static-method", "static-function-property"],
						["protected-static-method", "protected-static-function-property"],
						["private-static-method", "private-static-function-property"],
						["method", "function-property"],
						["protected-method", "protected-function-property"],
						["private-method", "private-function-property"],
						"unknown"
					],
					partitionByComment: String.raw`\/\/`
				}
			],
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
		ignores: [
			"**/*.md/*.js",
			"**/*.jsdoc-defaults",
			"**/*.jsdoc-params",
			"**/*.jsdoc-properties"
		]
	}
];

export default eslintConfig;

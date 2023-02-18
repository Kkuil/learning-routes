/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
	root: true,
	"extends": [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-prettier"
	],
	parserOptions: {
		ecmaVersion: "latest"
	},
	rules: {
		"no-unused-vars": true,
		"no-extra-semi": ["error", 1],
		"indent": ["error", "tab"],
		"quotes": ["double", {
			"avoidEscape": true,
			"allowTemplateLiterals": true
		}]
	}
}

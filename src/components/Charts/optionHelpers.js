// Parse global options
export function parseOptions(parent, options) {
	for (const item in options) {
		if (typeof options[item] !== 'object') {
			parent[item] = options[item]
		} else {
			parseOptions(parent[item], options[item])
		}
	}
}

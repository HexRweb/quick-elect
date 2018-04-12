'use strict';

const hbs = require('hbs');

function renderStyle(style) {
	if (!style.href) {
		return false;
	}

	let renderedStyle = '<link';

	if (style.type) {
		renderedStyle += ` type="${hbs.Utils.escapeExpression(style.type)}"`;
	}

	renderedStyle += ` rel="${hbs.Utils.escapeExpression(style.rel || 'stylesheet')}"`
	renderedStyle += ` href="${hbs.Utils.escapeExpression(style.href)}" />`;

	return renderedStyle;
}

function renderScript(script) {
	if (!script.src) {
		return false;
	}

	let renderedScript = '<script';

	if (script.type) {
		renderedScript += `type="${hbs.Utils.escapeExpression(script.type)}"`
	}

	renderedScript += `src="${hbs.Utils.escapeExpression(script.src)}"`;

	return renderedScript;
}

module.exports = function generateRendererHelper(location) {
	return function renderItem(options) {
		const generated = [];
		const scriptsToAdd = options.data.root[location].scripts;
		const stylesToAdd = options.data.root[location].styles;

		stylesToAdd.forEach(style => {
			const renderedStyle = renderStyle(style);

			if (renderedStyle) {
				generated.push(renderedStyle);
			}
		});

		scriptsToAdd.forEach(script => {
			const renderedScript = renderScript(script);

			if (renderedScript) {
				generated.push(renderedScript);
			}
		});

		return new hbs.SafeString(generated.join('\n'));
	}
}

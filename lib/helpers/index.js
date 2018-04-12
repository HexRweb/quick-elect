'use strict';

const helpers = {
	asset_path: require('./asset-path'),
	render_item: require('./generic_item_renderer'),
	add_item: require('./generic_add_item')
};

module.exports = function registerHelpers() {
	const hbs = require('hbs');

	hbs.registerHelper('asset_path', helpers.asset_path);
	hbs.registerHelper('qe_head', helpers.render_item('head'));
	hbs.registerHelper('qe_foot', helpers.render_item('foot'));
	hbs.registerHelper('add_header_item', helpers.add_item('head'));
	hbs.registerHelper('add_footer_item', helpers.add_item('foot'));
}

module.exports.middleware = function addHandlebarsVariables(req, res, next) {
	res.locals.dev = process.env.NODE_ENV === 'development';
	res.locals.head = {
		scripts: [],
		styles: []
	};

	res.locals.foot = {
		scripts: [],
		styles: []
	};

	next();
}

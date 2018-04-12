'use strict';

const helpers = {
	asset_path: require('./asset-path')
};

module.exports = function registerHelpers() {
	const hbs = require('hbs');

	hbs.registerHelper('asset_path', helpers.asset_path);
}

module.exports.middleware = function addHandlebarsVariables(req, res, next) {
	res.locals.dev = process.env.NODE_ENV === 'development';
	next();
}

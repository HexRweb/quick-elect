'use strict';

const path = require('path');
const logger = require('morgan');
const helpers = require('./helpers');
// A lot of this has a WIP implementation that will be added in the future
// const session = require('express-session');
// const passport = require('passport');
// const FileStore = require('session-file-store')(session);
// const config = require('./config').config;

module.exports = function bootstrapExpress(instance) {
	// view engine setup
	instance.set('views', path.join(__dirname, 'views'));
	instance.set('view engine', 'hbs');
	instance.use(helpers.middleware);

	// @todo: implement proper logging
	if (process.env.NODE_ENV !== 'testing') {
		instance.use(logger('dev'));
	}
	/* instance.use(session({
		secret: 'quick-elect',
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: config.secure || false,
			path: config.path || '/'
		},
		name: config.name || 'private.auth.sid',
		store: new FileStore({})
	})); */

	// instance.use(passport.initialize());
	// instance.use(passport.session());

	// Register HBS helpers
	helpers();
}

'use strict';

const express = require('express');
const path = require('path');

const routes = {
	index: require('./routes/'),
	api: require('./routes/api'),
	dashboard: require('./routes/dashboard'),
	election: require('./routes/election')
};

module.exports = function addExpressRoutes(instance) {
	instance.use('/', routes.index);
	instance.use('/api', routes.api);
	instance.use('/dashboard', routes.dashboard);
	instance.use('/election', routes.election);

	instance.use('/assets', express.static(path.join(__dirname, 'assets')));

	instance.use('/partials/:name', (req, res) => {
		const knownPartials = [
			'vote'
		];

		if (knownPartials.includes(req.params.name)) {
			return res.render(`partial-${req.params.name}`);
		}

		res.send('/partials/:name not implemented');
	});

	// catch 404 and forward to error handler
	instance.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handler
	instance.use((err, req, res) => {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.send('error');
	});
}

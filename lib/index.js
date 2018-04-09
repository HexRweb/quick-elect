'use strict';
module.exports = function initServer() {
	const express = require('express');
	const app = express();

	// Configure passport (later)
	// require('./passport');

	// Add middleware
	require('./bootstrap')(app);

	// Add routes
	require('./router')(app);

	const server = require('./mount')(app);

	return {app, server};
};

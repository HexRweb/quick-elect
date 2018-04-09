'use strict';
const express = require('express');
/* eslint-disable new-cap*/
const router = express.Router();
/* eslint-enable new-cap*/

const adminHandler = require('./admin');

/* GET /election/{id} */
router.get('/', (req, res) => {
	res.send('/election/:id not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/apply */
router.get('/apply', (req, res) => {
	res.send('/election/:id/apply not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/vote */
router.get('/vote', (req, res) => {
	res.send('/election/:id/vote not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/admin */
router.use('/admin', adminHandler);

module.exports = router;

'use strict';
const express = require('express');
/* eslint-disable new-cap*/
const router = express.Router();
/* eslint-enable new-cap*/

const manageCandidateHandler = require('./candidate');

/* GET /election/{id}/manage. */
router.get('/', (req, res) => {
	res.send('/election/:id/manage not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/manage/candidate. */
// @todo: this should redirect to .../candidates
router.get('/candidate', (req, res) => {
	res.send('/election/:id/candidate not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/manage/candidate/{cid}. */
router.use('/candidate/:cid', manageCandidateHandler);

/* GET /election/{id}/manage/candidates. */
router.get('/candidates', (req, res) => {
	res.send('/election/:id/candidates not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/manage/votes. */
router.get('/votes', (req, res) => {
	res.send('/election/:id/manage/votes not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/manage/tabulate. */
router.get('/tabulate', (req, res) => {
	res.send('/election/:id/manage/tabulate not implemented');
	console.error('Unimplemented route requested:', req.path);
});

module.exports = router;

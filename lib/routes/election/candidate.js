'use strict';
const express = require('express');
/* eslint-disable new-cap*/
const router = express.Router();
/* eslint-enable new-cap*/

/* GET /election/{id}/manage/candidate/{id}. */
// @todo: redirect to .../view
router.get('/', (req, res) => {
	res.send('/election/:id/manage/candidate/:id not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/manage/candidate/{id}/view. */
router.get('/view', (req, res) => {
	res.send('/election/:id/manage/candidate/:id/view not implemented');
	console.error('Unimplemented route requested:', req.path);
});

/* GET /election/{id}/manage/candidate/{id}/edit. */
router.get('/edit', (req, res) => {
	res.send('/election/:id/manage/candidate/:id/edit not implemented');
	console.error('Unimplemented route requested:', req.path);
});

module.exports = router;

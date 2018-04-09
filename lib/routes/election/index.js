'use strict';
const express = require('express');
/* eslint-disable new-cap*/
const router = express.Router();
/* eslint-enable new-cap*/

const electionHandler = require('./election');

/* GET home page. */
router.get('/', (req, res) => {
	res.send('/election not implemented');
	console.error('Unimplemented route requested:', req.path);
});

router.use('/:id', electionHandler);

module.exports = router;

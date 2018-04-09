'use strict';
const express = require('express');
/* eslint-disable new-cap*/
const router = express.Router();
/* eslint-enable new-cap*/

/* GET home page. */
router.get('/', (req, res) => {
	res.send('/ route not implemented');
	console.error('Unimplemented route requested:', req.path);
});

module.exports = router;

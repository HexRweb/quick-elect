'use strict';

module.exports = function mountApp(app) {
	console.log('App listening on port 3000');
	return app.listen(3000);
}

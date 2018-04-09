'use strict';

const request = require('supertest');
const makeServer = require('../../../lib');
const sinon = require('sinon');

describe('core routes implemented', function () {
	let _app, sandbox;

	before(function startServer() {
		_app = makeServer();
		sandbox = sinon.sandbox.create();
		sandbox.stub(console, 'error');
	});

	after(function stopServer(done) {
		_app.server.close(done);
		sandbox.restore();
	});

	function _test(app, path, contentLength) {
		return request(app)
			.get(path)
			.expect(200)
			.expect('Content-Length', contentLength);
	}

	it('root', function () {
		return _test(_app.app, '/', '23');
	});

	it('dashboard', function () {
		return _test(_app.app, '/dashboard', '26');
	});

	it('api', function () {
		return _test(_app.app, '/api', '20');
	});

	describe('election', function () {
		it('/', function () {
			return _test(_app.app, '/election', '25')
		});

		it('/:id', function () {
			return _test(_app.app, '/election/32', '29');
		});

		it('/:id', function () {
			return _test(_app.app, '/election/foo', '29');
		});

		it('/apply', function () {
			return _test(_app.app, '/election/id/apply', '35');
		});

		it('/vote', function () {
			return _test(_app.app, '/election/id/vote', '34');
		});

		describe('admin', function () {
			it('/', function () {
				return _test(_app.app, '/election/id/admin/', '36');
			});

			it('/candidate', function () {
				return _test(_app.app, '/election/id/admin/candidate', '39');
			});

			it('/candidates', function () {
				return _test(_app.app, '/election/id/admin/candidates', '40');
			});

			it('/votes', function () {
				return _test(_app.app, '/election/id/admin/votes', '42');
			});

			it('/tabulate', function () {
				return _test(_app.app, '/election/id/admin/tabulate', '45');
			});

			describe('/candidate/:cid', function () {
				it('/', function () {
					return _test(_app.app, '/election/id/admin/candidate/id/', '50');
				});

				it('/view', function () {
					return _test(_app.app, '/election/id/admin/candidate/id/view', '55');
				});

				it('/edit', function () {
					return _test(_app.app, '/election/id/admin/candidate/id/edit', '55');
				});
			});
		});
	});
});


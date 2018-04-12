'use strict';

module.exports = function generateAddItemHelper(location) {
	return function addItem(options) {
		const type = (options.hash.itemType || '').toLowerCase();
		if (!['style', 'script'].includes(type)) {
			return '';
		}

		if (type === 'style') {
			options.data.root[location].styles.push(options.hash);
		} else {
			options.data.root[location].scripts.push(options.hash);
		}

		return '';
	}
}

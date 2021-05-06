const { mkdirSync, existsSync } = require('fs');

/**
 * @param {Method} page page method from puppeteer.
 * @param {String} queries valid DOM selector.
 */
exports.waitForSelector = async (page, queries) => {
	try {
		for (let query of queries) {
			await page.waitForSelector(query, { visible: true });
		}
	} catch (error) {
		return console.error(error);
	}
};

/**
 * If path doesn't exist create it, if not otherwise.
 *
 * @param {String} uploadPaths valid folder dir
 */
exports.folderCreate = async (uploadPaths) => {
	try {
		if (!uploadPaths) throw Error('path is required.');

		for (let uploadPath of uploadPaths) {
			!existsSync(uploadPath) && mkdirSync(uploadPath);
		}
	} catch (error) {
		return console.error(error);
	}
};

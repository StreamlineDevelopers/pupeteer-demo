const puppeteer = require('puppeteer');

class Puppeteer {
	/**
	 * @param {Object} viewport width, height
	 */
	constructor(viewport) {
		let option = {
			headless: false,
			userDataDir: '/data',
			// devtools: true,
		};

		/**
		 * @param {String} uri
		 * @param {Object?} pageOption
		 */
		this.launch = async (uri, pageOption) => {
			try {
				let browser = await puppeteer.launch(option);
				let page = await browser.newPage();

				viewport.width & viewport.height && (await page.setViewport(viewport));

				await page.goto(uri, pageOption);

				return page;
			} catch (error) {
				return console.error(error);
			}
		};
	}
}

module.exports = Puppeteer;

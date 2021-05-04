class Puppeteer {
	/**
	 * @param {Object} viewport width, height
	 */
	constructor(puppeteer, viewport) {
		let option = {
			headless: true,
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
				let page = await browser.page[0];

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

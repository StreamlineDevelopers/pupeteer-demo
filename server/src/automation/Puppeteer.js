const config = require('../config');

class Puppeteer {
	/**
	 * @param {Package} puppeteer npm package variable.
	 * @param {Boolean} headless show chromium or not.
	 * @param {Object?} viewport { width: '', height: ''}
	 */
	constructor(puppeteer, headless, viewport = false) {
		let option = {
			headless,
			// userDataDir: !headless ? '/data' : null,
			devtools: !headless ? true : false,
		};

		this.browser = null;
		this.page = null;

		/**
		 * @param {String} mangaUri manga name in dashed format. Ex. tales-of-demons-and-gods
		 * @param {Object?} pageOption page config
		 */
		this.launch = async (mangaUri, pageOption = false) => {
			try {
				let KISSMANGA_BASE_URI = config.puppeteer.KISSMANGA_BASE_URI;
				let uri = `${KISSMANGA_BASE_URI}/${mangaUri}`;

				let browser = await puppeteer.launch(option);

				let page = (await browser.pages())[0];
				if (!page) return { isLaunched: false, message: 'Launch failed.' };

				viewport && viewport.width & viewport.height && (await page.setViewport(viewport));

				await page.goto(uri, pageOption);
				// await page.setUserAgent(
				// 	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36 WAIT_UNTIL=load'
				// );

				this.browser = browser;
				this.page = page;

				return { isLaunched: true, message: 'Succesfully launched, you can now call the page method.', page };
			} catch (error) {
				return console.error(error);
			}
		};
	}
}

module.exports = Puppeteer;

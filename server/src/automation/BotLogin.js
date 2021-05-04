const Puppeteer = require('./Puppeteer');

class BotLogin extends Puppeteer {
	constructor(viewport, uri) {
		super(viewport);

		this.uri = uri;
	}

	/**
	 * @param {Object} data
	 */
	normalLogin = async (data) => {
		try {
			let page = await this.launch(this.uri);

			let queryEmail = data.email.query;
			let queryPassword = data.password.query;
			let queryLoginButton = data.button.query;

			await page.waitForSelector(queryEmail);
			await page.waitForSelector(queryPassword);
			await page.waitForSelector(queryLoginButton);

			await page.type(queryEmail, data.email.value);
			await page.type(queryPassword, data.password.value);

			await page.click(queryLoginButton);
		} catch (error) {
			return console.error(error);
		}
	};

	googleLogin = async (data) => {
		try {
			let page = await this.launch(this.uri);

			await page.waitForSelector(data.button.queryGoogle);

			await page.click(data.button.queryGoogle);

			await page.on('popup', async (el) => {
				await el.waitForSelector(data.email.queryGoogle);
				await el.waitForSelector(data.button.queryGoogleNext);

				await el.type(data.email.queryGoogle, data.email.value);

				await el.click(data.button.queryGoogleNext);
			});

			await page.off();
		} catch (error) {
			return console.error(error);
		}
	};
}

module.exports = BotLogin;

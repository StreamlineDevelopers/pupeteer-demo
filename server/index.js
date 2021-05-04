require('dotenv').config();

const loginDetails = require('./loginDetails.json');
const config = require('./src/config');
const BotLogin = require('./src/automation/BotLogin');

let uri = config.puppeteer.URI_TARGET;
let viewport = config.puppeteer.VIEW_PORT;

let botLogin = new BotLogin(viewport, uri);

const botLoginExecuter = (type) => {
	try {
		if (type === 1) {
			botLogin.normalLogin(loginDetails);
		} else if (type === 2) {
			botLogin.googleLogin(loginDetails);
		}
	} catch (error) {
		return console.error(error);
	}
};

(async () => {
	try {
		const ACTION = '';

		switch (ACTION) {
			case 'NORMAL_LOGIN':
				return botLoginExecuter(1, false);
			case 'GOOGLE_LOGIN':
				return botLoginExecuter(2);
			default:
				return;
		}
	} catch (error) {
		return console.error(error);
	}
})();

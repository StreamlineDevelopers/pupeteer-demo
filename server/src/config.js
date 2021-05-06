const config = {
	puppeteer: {
		KISSMANGA_BASE_URI: process.env.KISSMANGA_BASE_URI,
		VIEW_PORT: {
			width: 1900,
			height: 900,
		},
	},
};

module.exports = config;

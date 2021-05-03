const config = {
	puppeteer: {
		URI_TARGET: process.env.URI,
		VIEW_PORT: {
			width: 1200,
			height: 900,
		},
	},
};

module.exports = config;

const Grab = require('./automation/Grab');
const PromisePool = require('@supercharge/promise-pool');
const path = require('path');

const { folderCreate } = require('./helper/helper');

const main = async (puppeteer) => {
	try {
		let links, uploadPath, mangaParentPath, chaptersPath;
		let mangaToGrabUri = 'tales-of-demons-and-gods';

		let isHeadless = false;
		let startGrab = true;
		let isReverse = true;

		let parentFolder = 'manga';
		let initialPaths = [];
		let finalPaths = [];
		let errors = [];

		const grab = new Grab(puppeteer, isHeadless);

		links = await grab.chapterLinks(mangaToGrabUri, startGrab, isReverse);
		if (!links.isGrabbing) return console.error(links.message);

		// uploadPath = path.join(__dirname, parentFolder);
		// mangaParentPath = path.join(__dirname, parentFolder, mangaToGrabUri);

		// initialPaths = [uploadPath, mangaParentPath];

		// chaptersPath = await links.data.map((data) => {
		// 	let { chapter } = data;

		// 	return path.join(__dirname, parentFolder, mangaToGrabUri, chapter);
		// });

		// finalPaths = [...initialPaths, ...chaptersPath];

		// await folderCreate(finalPaths);

		// // for (let chapter of links.data) {
		// // 	await grab.imageLinks(chapter, chaptersPath);
		// // }

		await grab.browser.close();
		await grab.page.off();
	} catch (error) {
		return console.error(error);
	}
};

const maniuplateImage = async (grab, links, chaptersPath) => {
	try {
		// await PromisePool.withConcurrency(20)
		// 	.for(links.data)
		// 	.process(async (chapter) => {
		// 		let imageLinks = await grab.imageLinks(chapter, chaptersPath);

		// 		return imageLinks;
		// 	});
		console.log(links);
		for (chapter of links.data) {
			await grab.imageLinks(chapter, chaptersPath);
		}
	} catch (error) {
		return console.error(error);
	}
};
module.exports = main;

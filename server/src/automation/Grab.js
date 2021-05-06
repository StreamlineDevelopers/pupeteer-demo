const Puppeteer = require('./Puppeteer');
const download = require('image-downloader');

const config = require('../config');
const { waitForSelector } = require('../helper/helper');

let VIEW_PORT = config.puppeteer.VIEW_PORT;

class Grab extends Puppeteer {
	constructor(puppeteer, headless) {
		super(puppeteer, headless, VIEW_PORT);
	}

	/**
	 * Check if the manga is valid on kissmanga example:
	 * https://kissmanga.in/kissmanga/tales-of-demons-and-gods.
	 * The valid manga name is after 'https://kissmanga.in/kissmanga/'
	 * which is 'tales-of-demons-and-gods'.
	 *
	 * @param {String} mangaUri manga name in dashed format. Ex. tales-of-demons-and-gods.
	 * @param {Boolean} startGrab boolean for grabbing image links.
	 * @param {Boolean?} isReverse reverse the resulted array.
	 */
	async chapterLinks(mangaUri, startGrab, isReverse = false) {
		try {
			if (!startGrab) {
				return {
					isGrabbing: false,
					message: 'Set startGrab property to true if you want to start grabbing.',
				};
			}

			let page, links, releasedDate, formattedResult, linksQuery, releasedDateQuery, options;

			linksQuery = '.wp-manga-chapter a';
			releasedDateQuery = '.wp-manga-chapter span i';

			options = { waitUntil: 'networkidle0', timeout: 0 };

			await this.launch(mangaUri, options);
			page = await this.page;

			await waitForSelector(page, [linksQuery, releasedDateQuery]);

			links = await page.$$eval(linksQuery, (a) => a.map((el) => el.href));
			releasedDate = await page.$$eval(releasedDateQuery, (span) => span.map((el) => el.innerHTML));

			console.log(links);

			formattedResult = await links.map((item, i) => {
				let splitItem = item.split('/');
				let chapter = splitItem[splitItem.length - 2];

				return {
					chapter,
					links: item,
					releasedDate: releasedDate[i],
				};
			});

			return {
				isGrabbing: true,
				message: 'Grabbing links success.',
				data: isReverse ? formattedResult.reverse() : formattedResult,
			};
		} catch (error) {
			return console.error(error);
		}
	}

	async imageLinks(chapter, chapterPath) {
		try {
			if (!chapter) throw Error('Array of url is required.');

			let { links } = chapter;

			let options = { waitUntil: 'networkidle2', timeout: 0 };

			let imageQuery = '.reading-content .page-break img';

			let page = await this.page;

			await page.goto(links, options);

			await waitForSelector(page, [imageQuery]);

			let imageSrc = await page.$$eval(imageQuery, (images) => images.map((img) => img.src));
			console.log(imageSrc);

			return imageSrc;
		} catch (error) {
			return console.error(error);
		}
	}
}

module.exports = Grab;

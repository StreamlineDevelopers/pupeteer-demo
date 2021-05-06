require('dotenv').config();

const puppeteer = require('puppeteer-extra');

// puppeteer plugins
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const adblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteer.use(stealthPlugin());
puppeteer.use(adblockerPlugin({ blockTrackers: true }));

require('./main')(puppeteer);

require('dotenv').config();

const config = require('./config');
const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

const Puppeteer = require('./automation/Puppeteer');

puppeteer.use(stealth());

let VIEW_PORT = config.puppeteer.VIEW_PORT;

const automate = new Puppeteer(puppeteer, VIEW_PORT);

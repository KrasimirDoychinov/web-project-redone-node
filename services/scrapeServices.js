const puppeteer = require('puppeteer');

const scrapeNews = async function () {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const result = [];

	await page.goto('https://forums.swtor.com/discover/6/');
	try {
		for (let i = 1; i <= 10; i++) {
			const element = await page.waitForSelector(
				`#ipsLayout_mainArea > section > div:nth-child(3) > div > div > ol.ipsStream.ipsStream_withTimeline.ipsList_reset > li:nth-child(${
					i * 2
				}) > div > div.ipsStreamItem_header.ipsPhotoPanel.ipsPhotoPanel_mini > div > h2 > span > a`
			);

			const dateElement = await page.waitForSelector(
				`#ipsLayout_mainArea > section > div:nth-child(3) > div > div > ol.ipsStream.ipsStream_withTimeline.ipsList_reset > li:nth-child(${
					i * 2
				}) > div > ul > li:nth-child(1) > a > time`
			);

			const nameElement = await page.waitForSelector(
				`#ipsLayout_mainArea > section > div:nth-child(3) > div > div > ol.ipsStream.ipsStream_withTimeline.ipsList_reset > li:nth-child(${
					i * 2
				}) > div > div.ipsStreamItem_header.ipsPhotoPanel.ipsPhotoPanel_mini > div > p > a:nth-child(1) > font`
			);

			const link = await page.evaluate((element) => element.href, element);
			const title = await page.evaluate(
				(element) => element.textContent,
				element
			);
			const time = await page.evaluate(
				(dateElement) => dateElement.title,
				dateElement
			);
			const name = await page.evaluate(
				(nameElement) => nameElement.textContent,
				nameElement
			);

			result.push({ title, link, time, name });
		}
	} catch (error) {
		console.log(error);
	}

	browser.close();
	return result;
};

module.exports = {
	scrapeNews,
};

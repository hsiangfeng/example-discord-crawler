// crawler.js
const fs = require('fs');
const cheerio = require('cheerio');

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const crawler = async () => {
  const target = 'https://israynotarray.com/'; // 目標網址
  const html = await getData(target);

  const $ = cheerio.load(html);

  const postTitleLink = $('.post-title-link');

  const data = [];

  postTitleLink.each((index, element) => {
    const title = $(element).text();
    const url = $(element).attr('href');
    data.push({
      title,
      url: `${target}${url}`, // 補上網域
    });
  });

  return data;
}

module.exports = crawler;
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-import-module-exports
import fs from 'fs';

import puppeteer from 'puppeteer';

const getProductInfosFromCurPage = async (page, curPage) => {
  if (curPage < 1) return [];

  await page.waitForSelector('.col-md-6');
  const productInfos = await page.evaluate(() => {
    const productInfosArr = Array.from(document.querySelectorAll('.col-md-6'));
    return productInfosArr.map((el) => {
      const [topDiv, bottomDiv] = el.children[0].children[0].children;
      const [shopTypeEl, productTypeEl] = topDiv.children;
      const shopType = shopTypeEl.innerText;
      const productType = productTypeEl.innerText;
      const [imgEl, otherEl] = bottomDiv.children;
      const imgUrl = imgEl.children[0].src;
      const productName = otherEl.querySelector('strong').innerHTML;
      const m = otherEl.innerHTML.toString().match(/(\d+,\d+\s원)/);
      let priceStr = 0;
      if (m) priceStr = m[0].trim();
      const price = parseInt(priceStr.toString().replace(/[^\d]/g, ''), 10);
      return {
        shopType,
        productType,
        imgUrl,
        productName,
        price,
      };
    });
  });

  // 다음 페이지로 넘어가기
  await page.goto(
    `https://pyony.com/search/?page=${curPage - 1}&event_type=&category=&item=100&sort=&price=&q=`,
  );
  const nextProductInfos = await getProductInfosFromCurPage(page, curPage - 1);
  return [...productInfos, ...nextProductInfos];
};

const getProductInfos = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(
      'https://pyony.com/search/?event_type=&category=&item=100&sort=&price=&q=',
    );

    // 리스트 맨 끝부터 가기 위해 맨 끝 버튼 누르기
    await page.waitForSelector('.page-link');
    const paginationButtons = await page.$$(
      '.pagination > .pagination > .page-item > .page-link',
    );
    const _lastButton = paginationButtons[paginationButtons.length - 1];
    await _lastButton.click();
    await page.waitForNavigation();

    // 현재 페이지 location가져오면 페이지 번호 알 수 있음
    const lastPage = page.url().split('?')[1].split('&')[0].split('=')[1];

    // 그 수만큼 반복
    const productInfos = await getProductInfosFromCurPage(page, lastPage);

    await browser.close();

    // 정보 담아서 return
    return productInfos;
  } catch (error) {
    console.error(error);
  }
};

const productInfos = await getProductInfos();

// json 형태로 저장
fs.writeFileSync('./productInfos.json', JSON.stringify(productInfos));

/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-import-module-exports
import fs from 'fs';

import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
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

const clickEveryMoreButtonOfCU = async (page) => {
  try {
    await page.waitForTimeout(500);

    const moreButton = await page.$('.prodListBtn-w > a');

    if (!moreButton) return;
    await moreButton.click();

    await clickEveryMoreButtonOfCU(page);
  } catch (error) {
    console.error(error);
  }
};

const getCUProductInfos = async (page, type) => {
  const productInfos = await page.evaluate((typeText) => {
    const productInfosArr = Array.from(
      document.querySelectorAll('.prod_item > .prod_wrap'),
    );

    return productInfosArr.map((el) => {
      const [imgDiv, textDiv] = el.children;
      const imgUrl = imgDiv.children[0].src;
      const [productNameEl, priceEl] = textDiv.children;
      const productName = productNameEl.innerText;
      const price = parseInt(
        priceEl.innerText.toString().replace(/[^\d]/g, ''),
        10,
      );

      return {
        shopType: 'CU',
        productType: typeText,
        imgUrl,
        productName,
        price,
      };
    });
  }, type);

  return productInfos;
};

const getProductInfoFromCU = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    const url =
      'https://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3=';

    // 간편식사
    await page.goto(`${url}1`);
    // 도시락
    await page.waitForSelector('.eventInfo_02');
    const dosirakButton = await page.$('.eventInfo_02 > a');
    await dosirakButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    let productInfos = await getCUProductInfos(page, '도시락');

    // 샌드위치/햄버거
    await page.waitForSelector('.eventInfo_03');
    const burgerButton = await page.$('.eventInfo_03 > a');
    await burgerButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '샌드위치/햄버거')),
    ];

    // 주먹밥/김밥
    await page.waitForSelector('.eventInfo_04');
    const kimbabButton = await page.$('.eventInfo_04 > a');
    await kimbabButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '주먹밥/김밥')),
    ];

    // 헉 페이지 이동하니 조회가 제대로 되지 않는 이슈 발생! -> 그냥 버튼 누르게 해서 해결
    // 즉석 조리
    const instantFoodButton = await page.$('.prodInfo_02 > a');
    await instantFoodButton.click();

    // 튀김류
    await page.waitForSelector('.eventInfo_02');
    const tgButton = await page.$('.eventInfo_02 > a');
    await tgButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '튀김류')),
    ];

    // 베이커리
    await page.waitForSelector('.eventInfo_03');
    const bakeryButton = await page.$('.eventInfo_03 > a');
    await bakeryButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '베이커리')),
    ];

    // 즉석커피
    await page.waitForSelector('.eventInfo_04');
    const coffeeButton = await page.$('.eventInfo_04 > a');
    await coffeeButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '즉석커피')),
    ];

    // 과자류
    const snackButton = await page.$('.prodInfo_03 > a');
    await snackButton.click();

    // 스낵/비스켓
    await page.waitForSelector('.eventInfo_02');
    const sbButton = await page.$('.eventInfo_02 > a');
    await sbButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '스낵/비스켓')),
    ];

    // 빵/디저트
    await page.waitForSelector('.eventInfo_03');
    const bdButton = await page.$('.eventInfo_03 > a');
    await bdButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '빵/디저트')),
    ];

    // 껌/초콜릿/캔디
    await page.waitForSelector('.eventInfo_04');
    const gccButton = await page.$('.eventInfo_04 > a');
    await gccButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '껌/초콜릿/캔디')),
    ];

    // 아이스크림
    const icecreamButton = await page.$('.prodInfo_04 > a');
    await icecreamButton.click();

    // 아이스크림
    await page.waitForSelector('.eventInfo_02');
    const icButton = await page.$('.eventInfo_02 > a');
    await icButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '아이스크림')),
    ];

    // 식품
    const foodButton = await page.$('.prodInfo_05 > a');
    await foodButton.click();

    // 가공식사
    await page.waitForSelector('.eventInfo_02');
    const gsButton = await page.$('.eventInfo_02 > a');
    await gsButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '가공식사')),
    ];

    // 안주류
    await page.waitForSelector('.eventInfo_03');
    const ajButton = await page.$('.eventInfo_03 > a');
    await ajButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '안주류')),
    ];

    // 식재료
    await page.waitForSelector('.eventInfo_04');
    const sjButton = await page.$('.eventInfo_04 > a');
    await sjButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '식재료')),
    ];

    // 음료
    const drinkButton = await page.$('.prodInfo_06 > a');
    await drinkButton.click();

    // 음료
    await page.waitForSelector('.eventInfo_02');
    const erButton = await page.$('.eventInfo_02 > a');
    await erButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '음료')),
    ];

    // 아이스드링크
    await page.waitForSelector('.eventInfo_03');
    const idButton = await page.$('.eventInfo_03 > a');
    await idButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '아이스드링크')),
    ];

    // 유제품
    await page.waitForSelector('.eventInfo_04');
    const yjButton = await page.$('.eventInfo_04 > a');
    await yjButton.click();
    // 더보기 버튼 다 누르기
    await clickEveryMoreButtonOfCU(page);
    productInfos = [
      ...productInfos,
      ...(await getCUProductInfos(page, '유제품')),
    ];

    await browser.close();

    // 정보 담아서 return
    return productInfos;
  } catch (error) {
    console.error(error);
  }
};

const getGSProductInfos = async (page, type) => {
  const productInfos = await page.evaluate((typeText) => {
    const productInfosArr = Array.from(document.querySelectorAll('.prod_box'));

    return productInfosArr.map((el) => {
      const [imgDiv, nameDiv, priceDiv] = el.children;
      const imgUrl = imgDiv.children[0].src;
      const productName = nameDiv.innerText;
      const price = parseInt(
        priceDiv.children[0].innerText.toString().replace(/[^\d]/g, ''),
        10,
      );

      return {
        shopType: 'GS',
        productType: typeText,
        imgUrl,
        productName,
        price,
      };
    });
  }, type);

  return productInfos;
};

const getProductInfosFromGS = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      'http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood#;',
    );

    // 도시락
    const dosirakButton = await page.$('#productLunch');
    await dosirakButton.click();
    await page.waitForTimeout(500);
    const pagingNums1 = await page.$$('.paging > .num > a');
    const dosirakPromises = pagingNums1.map(async (num) => {
      await num.click();
      await page.waitForTimeout(500);
      return getGSProductInfos(page, '도시락');
    });
    let productInfos = await Promise.all(dosirakPromises);

    // 주먹밥/김밥
    const riceButton = await page.$('#productRice');
    await riceButton.click();
    await page.waitForTimeout(500);
    const pagingNums2 = await page.$$('.paging > .num > a');
    const kimbabPromises = pagingNums2.map(async (num) => {
      await num.click();
      await page.waitForTimeout(500);
      return getGSProductInfos(page, '주먹밥/김밥');
    });
    productInfos = [...productInfos, ...(await Promise.all(kimbabPromises))];

    // 샌드위치/햄버거 productBurger
    const burgerButton = await page.$('#productBurger');
    await burgerButton.click();
    await page.waitForTimeout(500);
    const pagingNums3 = await page.$$('.paging > .num > a');
    const burgerPromises = pagingNums3.map(async (num) => {
      await num.click();
      await page.waitForTimeout(500);
      return getGSProductInfos(page, '샌드위치/햄버거');
    });
    productInfos = [...productInfos, ...(await Promise.all(burgerPromises))];

    await browser.close();

    // 정보 담아서 return
    return productInfos;
  } catch (error) {
    console.error(error);
  }
};

// const productInfos = await getProductInfoFromCU();

const gsProductInfos = await getProductInfosFromGS();

// json 형태로 저장
// fs.writeFileSync('./productInfos.json', JSON.stringify(productInfos));
fs.writeFileSync('./productInfosGS.json', JSON.stringify(gsProductInfos));

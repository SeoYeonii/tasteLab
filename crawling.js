/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-import-module-exports
import puppeteer from 'puppeteer';

const getProductInfos = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        ' --disable-site-isolation-trials',
      ],
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

    // 그 수만큼 반복하면 될듯?

    // 정보 담아서 return

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

getProductInfos();

// json 형태로 저장
// 저장한 파일 백에게 전달

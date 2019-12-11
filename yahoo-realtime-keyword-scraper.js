const puppeteer = require("puppeteer");

(async () => {
    // 準備
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Yahoo リアルタイム検索の読み込みが終わるまで待機する
    await page.goto('https://search.yahoo.co.jp/realtime', { waitUntil: "networkidle2" });

    // キーワードをリストに詰める
    const keywords = await page.evaluate(() => {
        const node = document.querySelectorAll("p.que_3 a");
        const array = [];
        for (item of node) {
            array.push(item.innerText);
        }
        return array;
    });

    console.log(keywords);

    // 後始末
    await browser.close();
})();

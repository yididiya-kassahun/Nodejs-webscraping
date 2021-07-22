/*
Webscraping bit.bdu.edu.et 
*/

const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

const url = "https://bit.bdu.edu.et/";

(async () => {
    let data = []
    const response = await request({
        uri:url,
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": " en-US,en;q=0.9"
        },
        gzip: true
    });

    let $ = cheerio.load(response)
    let title = $('div[class="block block-views first odd"] > h2').text();
    let news = $('div[class="block block-views first last odd"] > h2').text();
    let copyright = $('div[id="bottom"] > p').text();
    
    data.push({
        title, news, copyright
    });
    const js2csv = new json2csv()
    const csv = js2csv.parse(data)

    fs.writeFileSync("./BitData.csv", csv, "utf-8");
}
)();
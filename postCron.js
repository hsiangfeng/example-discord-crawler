const cron = require('cron');

const client = require('./index'); // 引入 client
const crawler = require('./crawler'); // 引入爬蟲程式碼

const postCron = (client) => {
  const job = new cron.CronJob('* * * * *', async () => {
    // 呼叫爬蟲程式碼，並取得資料
    const data = await crawler();
    // 依據資料長度隨機產生一個索引值
    const randomIndex = Math.floor(Math.random() * data.length);
    // 依照隨機產生的索引值取得資料
    const randomData = data[randomIndex];
    // 取得頻道
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    // // 發送訊息
    await channel.send(`每日晚間九點隨機推薦 Ray 的一篇文章：[${randomData.title}](${randomData.url})`);
  });
  
  return job;
}


module.exports = postCron;
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

require('dotenv').config();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channel = await client.channels.fetch(process.env.bumpChannel);

  async function bump() {
    await channel.sendSlash('302050872383242240', 'bump');
    console.count('Bumped!');
  }

  (function loop() {
    var randomNum = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000;
    setTimeout(function () {
      bump();
      loop();
    }, randomNum);
  })();

  bump();
});

client.login(process.env.token);

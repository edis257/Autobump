const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');

async function bumpServer(token, bumpChannelID) {
  const client = new Client();

  client.on('ready', async () => {
    try {
      console.log(`Logged in as ${client.user.tag}!`);

      const channel = await client.channels.fetch(bumpChannelID);

      async function bump() {
        try {
          await channel.sendSlash('302050872383242240', 'bump');
          console.count(`Bumped by ${client.user.tag}:`);
        } catch (error) {
          console.error(`Error bumping for ${client.user.tag}:`, error);
        }
      }

      (function loop() {
        var randomNum = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000;
        setTimeout(function () {
          bump();
          loop();
        }, randomNum);
      })();

      bump();
    } catch (error) {
      console.error(`Error in client ready event for ${client.user.tag}:`, error);
    }
  });

  try {
    await client.login(token);
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

fs.readFile('config.json', 'utf8', async (err, data) => {
  if (err) {
    console.log('Error reading config file:', err);
    return;
  }

  const configs = JSON.parse(data);
  for (const config of configs) {
    try {
      await bumpServer(config.token, config.bumpChannel);
    } catch (error) {
      console.error('Error bumping server:', error);
    }
  }
});

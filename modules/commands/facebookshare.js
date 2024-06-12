const axios = require('axios');

module.exports.config = {
  name: "facebookshare",
  version: "1.0",
  hasPermission: 0,
  credits: "rickciel",
  usePrefix: true,
  description: "Share a post on Facebook",
  commandCategory: "Social",
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 3) {
      api.sendMessage('Invalid number of arguments. Usage: facebookshare [token] [url] [amount]', event.threadID);
      return;
    }

    const accessToken = args[0];
    const shareUrl = args[1];
    const shareAmount = parseInt(args[2]);

    if (isNaN(shareAmount) || shareAmount <= 0) {
      api.sendMessage('Invalid share amount. Please provide a valid positive number.', event.threadID);
      return;
    }

    const timeInterval = 500;
    const deleteAfter = 1 * 1;

    let sharedCount = 0;
    let timer = null;

    async function sharePost() {
      try {
        const response = await axios.post(
          `https://graph.facebook.com/v20.0/me/feed?access_token=${accessToken}&fields=id&limit=0&published=0`,
          {
            link: shareUrl,
            privacy: { value: 'SELF' },
            no_story: true,
          },
          {
            muteHttpExceptions: true,
            headers: {
              authority: 'graph.facebook.com',
              'cache-control': 'max-age=0',
              'sec-ch-ua-mobile': '?0',
              'user-agent':
                'Mozilla/5.0 (X11; U; Linux x86_64) AppleWebKit/17.4.1 (KHTML, like Gecko) Ubuntu Chromium/125.0.6422.164 Chrome/125.0.6422.141 Safari/17.4.1',
            },
            method: 'post',
          cookie: "sb=eKKAY7ArB12wNgYT_RODy7oB; datr=eaKAYzrxFe5qTVrlnmpBVn7Q; c_user=100000225673860; m_page_voice=100000225673860; wd=1920x963; xs=12%3A7KRB9gGQwaHt5g%3A2%3A1689598822%3A-1%3A6290%3A%3AAcW5-pEJJ7GoVdfiYQoo0A4VUNvOjtOqfk9iIzBoiMwB; fr=0iOsfQ339brjlxFQJ.AWXD5lYuTSLZsasLjjiskaLUDi8.Bk8hHq.Pj.AAA.0.0.Bk8hHq.AWX8yFB8Gvk; presence=C%7B%22lm3%22%3A%22u.100079086835283%22%2C%22t3%22%3A%5B%7B%22o%22%3A0%2C%22i%22%3A%22u.100039986310453%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100065586904588%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100074100303075%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100038780015811%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.7444167328943151%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100082668132301%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.1207110219342973%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100001761237574%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100087438951039%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100005201702431%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100014958216759%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.8321062807935493%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100037741424837%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.5988765337888667%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100077497896569%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100071768980176%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100063855025744%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100046691234633%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6947890241890495%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.4316745955077359%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.9891986724174760%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.4853893041400316%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100044832440420%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100029340348630%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.5668747433145242%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.1664397623%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6924951360869970%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100011663281378%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100075493308135%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.24136113082654624%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6426651960726120%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100092674113587%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.7215618755120081%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.5361215824007861%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6844521818997745%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100000692804831%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100054391143845%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100033992950950%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100028356152567%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100003255692360%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100064535052970%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100030967444445%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6362141067212155%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100063456296135%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100090035004488%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100089352882349%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100076344452639%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6351983704849926%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.1496041630%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100030050717942%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100005845206394%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100074802690241%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100081316312557%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100073926923961%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100040945304427%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100025576475462%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100040714093705%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.8050020041690648%22%7D%5D%2C%22utc3%22%3A1693586670019%2C%22v%22%3A1%7D",
          }
        );

        sharedCount++;
        const postId = response?.data?.id;

        console.log(`Post shared: ${sharedCount}`);
        console.log(`Post ID: ${postId || 'Unknown'}`);

        if (sharedCount === shareAmount) {
          clearInterval(timer);
          console.log('Finished sharing posts.');

          if (postId) {
            setTimeout(() => {
              deletePost(postId);
            }, deleteAfter * 1);
          }

          api.sendMessage('DONE SHARING', event.threadID);
        }
      } catch (error) {
        console.error('Failed to share post:', error.response.data);
      }
    }

    async function deletePost(postId) {
      try {
        await axios.delete(`https://graph.facebook.com/${postId}?access_token=${accessToken}`);
        console.log(`Post deleted: ${postId}`);
      } catch (error) {
        console.error('Failed to delete post:', error.response.data);
      }
    }

    timer = setInterval(sharePost, timeInterval);

    setTimeout(() => {
      clearInterval(timer);
      console.log('Loop stopped.');
    }, shareAmount * timeInterval);
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('An error occurred: ' + error.message, event.threadID);
  }
};

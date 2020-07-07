var request = require("request")

request.post('https://slack.com/api/chat.postMessage', {
  form: {
    token: 'トークンを書く',　// slackのトークン
    channel: 'test', // slackのチャンネル名
    username: '問い合わせ',　// slackに投稿される名前
    text: // slackに投稿される内容
      '```名前：' + formdata.name + '```'
  }
}, function (error, response, body) {
  console.log(error)
})
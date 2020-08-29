const { IncomingWebhook } = require("@slack/webhook");

const webhook = new IncomingWebhook("https://hooks.slack.com/services/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");

function notice(user) {
  (async () => {
    await webhook.send({
      text: "<@" + user.id + "> さん．　〇〇の工数について承認依頼が来ています．"
    });
  })();
}

module.exports = {
  notice
}



// text内でのメンションはプロフィール蘭のUserIDを使って <@User_ID>
//     text: "info by node.js", //通知内容
//     channel: "#random", //通知先チャンネル
//     username: "Username", //通知時ユーザー名
//     icon_emoji: ":ghost:", //アイコン絵文字
//     icon_url: "https://example.com/.../example.jpg" //アイコン画像url
//     // icon_emojiとicon_urlはアイコンの設定なので同時に使用しない
//     // 両方設定したら、icon_emojiが優先された
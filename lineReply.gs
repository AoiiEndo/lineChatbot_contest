// LINEに返信する関数
function lineReply(json, replyText2, replyText){
  // console.log(replyText);
  // console.log(replyText2);
  // 返信用のTOKENとメッセージの宣言
  let message = {
    "replyToken": json.events[0].replyToken,
    "messages": [
      {
      "type": "text",
      "text": replyText,
      },
      {
       "type": "text",
       "text": replyText2,
      }
    ], // メッセージの内容
  };
  // optionの宣言
  options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",  // JSON形式を指定、LINEの文字コードはUTF-8
      "Authorization": "Bearer " + LINE_TOKEN           // 認証タイプはBearer(トークン利用)、アクセストークン
    },
    "payload": JSON.stringify(message)                // 応答文のメッセージをJSON形式に変換する
  };
  // LINEへ応答メッセージを返す
  UrlFetchApp.fetch(LINE_ENDPOINT, options);
};
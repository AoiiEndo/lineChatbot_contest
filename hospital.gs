// 関連のある病院のかを取得する関数
function hospital(json, replyText){
  // "次の~から"というのがGPTが弱いため出力する文字の後ろに条件をつけて送った。
  // ~のスペシャリストとすることで、GPTの回答がより間違えが減ること、また質問を段階的に理解させることで回答してほしい形式を必ず守るようにした。
  let messages = [
    { "role": "system", "content": "あなたは、日本語のスペシャリストです。質問を段階的に理解し、回答してください。"},
    { "role": "system", "content": "連想される病名と症状」から関連する病院の科の名前だけを1つ回答してください。回答の病院の科の前に数字の添え字、スペース、ドットは使用しないで下さい。示した以外の回答方法で回答しないで下さい。"},
    { "role": "user", "content": replyText },
  ]
  let headers = {
    'Authorization': 'Bearer ' + GPT_TOKEN,
    'Content-type': 'application/json',
  };
  // リクエストオプション
  options = {
    'method': 'POST',
    'headers': headers,
    'payload': JSON.stringify({
      'model': MODEL_NAME,        // 使用するGPTモデル　上で宣言済み
      'max_tokens': MAX_TOKENS,   // レスポンストークンの最大値(最大4,096)　上で宣言済み
      'temperature': MODEL_TEMP,  // 応答の多様性(0-2.0)※数値が大きいほどランダムな応答になる　上で宣言済み
      'messages': messages
    })
  };
  // HTTPリクエストでChatGPTのAPIを呼び出す.GPTに上記のメッセージを送って回答をresに代入。
  // Utilities.sleep(2000);
  let res = JSON.parse(UrlFetchApp.fetch(GPT_ENDPOINT, options).getContentText());
  // resの中から必要な情報だけを取り出す。
  let subject_name = res.choices[0].message.content.trimStart();
  console.log(subject_name);
  // search_hospital関数に引数を渡して呼び出す。
  // json         : LINETOKENの値。
  // subject_name : 関連のある病院の科。
  // replyText    : 症状から連想される病名等。
  search_hospital(json, subject_name, replyText);
};
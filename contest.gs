//コンテスト本番用
const GPT_TOKEN = '---'; //ChatGPTのAPIキーを入れてください
const LINE_TOKEN = '---';    // LINEのAPIキーを入れてください
const LINE_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const GPT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MODEL_NAME = 'gpt-3.5-turbo';
const MODEL_TEMP = 0;  //ちゃっとGPTの解答ランダム性の度合い0~2.0で変更できて0ほど同じ回答を得られる。
const MAX_TOKENS = 512; //返答する際のtoken数の制限あまり多すぎると読みづらくなるため。

// LINEからPOSTリクエストが渡されてきたときに実行される処理
function doPost(e) {
  // LINEからPOSTされるJSON形式のデータをGASで扱える形式(JSオブジェクト)に変換
  let json = JSON.parse(e.postData.contents);

  // LINEから送られてきたメッセージを取得
  let user_message = json.events[0].message.text;
  // LINEのメッセージをChatGPTに投げるメッセージにセットする
  let messages = [
    { "role": "system", "content": "次の情報を表示してください。\n\n【応急処置方法】\n・箇条書き「・」を用いて3つ方法短くまとめて表示\n\n【連想される病名と症状】病名は5つ表示。症状は3つを表示。型は\n1. 病名\n- 症状1、症状2、症状3\n2. 病名\n- 症状1、症状2、症状3\n3. 病名\n- 症状1、症状2、症状3\n4. 病名\n- 症状1、症状2、症状3\n5. 病名\n- 症状1、症状2、症状3。ここに書いてあることは必ず記入してください。途中で途切れないように最後まで収めて出来る限り簡潔に表示してください。3つと書いてあったら3つ、5つと書いてあったら5つそれより多くても少なくてもダメです。かつここにある条件以外のことは表示しないで。" },
    { "role": "user", "content": user_message },
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
  let res = JSON.parse(UrlFetchApp.fetch(GPT_ENDPOINT, options).getContentText());

  // 上でもらったresはjson形式なので配列に戻す。
  let replyText = res.choices[0].message.content.trimStart();
  // hospital関数を引数を渡して呼び出す
  // json     : LINETOKENの値。
  // replyText: 症状から連想される病名等。
  hospital(json, replyText);
};
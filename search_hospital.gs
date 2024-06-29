// 関連のある病院の科から病院の情報をGoogleAPIsを使用して検索結果を取得する関数
function search_hospital(json, subject_name, replyText){
  //検索ワードと検索数を入力して代入
  // res = "内科";
  console.log(subject_name);
  // 他のAppsでもスクレイピングできたが、検索をかけてその値を取得するだけだったので、この方法にした。
  let url = "https://www.googleapis.com/customsearch/v1?key=---&cx=---=" + subject_name + "のある病院" + "&num=" + 3;
  let response = JSON.parse(UrlFetchApp.fetch(url).getContentText('UTF-8'));
  // console.log(response);
  // itemsが配列になっていてその中で連想配列を作る構造になっていた為、下記のようにタイトルとURLを取り出した。(items[{"title": "---", "link": "---"...},{"title": "---", "link": "---"...}])
  let replyText2 = response['items'][0]['title'] + "\n" + response['items'][0]['link'] + "\n";
  replyText2 = replyText2 + response['items'][1]['title'] + "\n" + response['items'][1]['link'] + "\n";
  replyText2 = replyText2 + response['items'][2]['title'] + "\n" + response['items'][2]['link'];
  console.log(replyText2);
  // lineReply関数を引数を渡して呼び出す。
  // json      : LINETOKENの値。
  // replyText : 症状から連想される病名等。
  // replyText2: 病院の科を検索かけて出てきたTOP３を必要なデータだけに整形した値。(病院名とURL)
  lineReply(json, replyText2, replyText);
};
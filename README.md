# LINEチャットボットで症状の改善案や病院検索
症状から受診すべき医療機関や一時的な症状を緩和する方法を簡単に知ることができたら便利だと考えたため。

## 使用環境
- GAS
- Google Custom Search API
- LINEチャットボット

## プログラムの説明
- LINEで症状入力を受け取る
- その症状をChatGPTに投げる
- ChatGPTから関連のある医療科情報と予測される病名を受け取る
- ChatGPTの変換内容を元に医療機関を検索
- 症状を緩和するのに有効な行動等を回答してもらう
- これらの情報をLINEに変換し表示
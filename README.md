# Java Silver 学習サイト

Oracle Certified Java Programmer, Silver SE 11 の合格を目指す自己学習用Webサイトです。

## サイト概要

- Java Silver試験の出題範囲を網羅したオリジナル問題集（35問以上）
- カテゴリ別・難易度別の問題フィルタリング
- 詳細な解説（なぜ正解か・なぜ不正解か・実務での使い方）
- 間違えた問題の自動保存と復習機能
- 学習進捗のlocalStorage保存
- 6週間学習ロードマップ
- 業務で役立つJava知識の解説
- スマートフォン対応（レスポンシブデザイン）

## 使用技術

- HTML5
- CSS3（Flexbox / Grid / CSS変数）
- JavaScript（ES6+）
- Javaサンプルコード（学習用）

バックエンド・サーバー不要の静的サイトです。

## 起動方法

ブラウザで `index.html` を直接開くだけで動作します。

```bash
# ファイルをブラウザで開く
open index.html       # Mac
start index.html      # Windows
```

またはVS Codeの「Live Server」拡張機能を使うと便利です。

## ファイル構成

```
java-silver-study-site/
├── index.html          # トップページ（概要・今日のおすすめ問題）
├── exam.html           # 試験範囲ページ（カテゴリ別ポイント整理）
├── questions.html      # 問題演習ページ
├── explanation.html    # 詳細解説ページ（== vs equals 等）
├── practical.html      # 業務で役立つJava知識
├── roadmap.html        # 6週間学習ロードマップ
├── css/
│   └── style.css       # 全ページ共通スタイル
├── js/
│   ├── questions.js    # 問題データ（35問以上）
│   ├── storage.js      # localStorage管理
│   └── app.js          # クイズ・ナビ・進捗などのロジック
├── java-samples/       # Javaサンプルコード（javacで実行可能）
│   ├── StringSample.java
│   ├── StaticSample.java
│   ├── InheritanceSample.java
│   ├── ExceptionSample.java
│   └── CollectionSample.java
└── README.md
```

## Javaサンプルの実行方法

```bash
cd java-samples

# コンパイル
javac StringSample.java

# 実行
java StringSample
```

Java 11以降が必要です。

## 学習方法

1. **試験範囲ページ**で全体像を把握
2. **詳細解説ページ**で各トピックを深く理解
3. **問題演習ページ**でアウトプット練習
4. 間違えた問題は「要復習フィルター」で何度も解く
5. **ロードマップページ**でチェックリストを活用し進捗管理
6. **業務活用ページ**で実務との繋がりを理解し記憶を定着

## 問題カテゴリ

| カテゴリ | 問題数 | 重要度 |
|---------|--------|--------|
| String | 5問 | ★★★ |
| 配列 | 4問 | ★★★ |
| static | 3問 | ★★★ |
| 継承 | 2問 | ★★★ |
| オーバーライド | 1問 | ★★★ |
| ポリモーフィズム | 1問 | ★★★ |
| インターフェース | 1問 | ★★ |
| 抽象クラス | 1問 | ★★ |
| 例外処理 | 4問 | ★★★ |
| コレクション | 4問 | ★★★ |
| ラムダ式 | 3問 | ★★ |
| データ型と変数 | 1問 | ★★ |
| 演算子 | 1問 | ★★ |
| 条件分岐 | 1問 | ★★ |
| 繰り返し処理 | 1問 | ★★ |
| クラスとオブジェクト | 1問 | ★★ |
| コンストラクタ | 1問 | ★★★ |

## 今後追加したい機能

- [ ] 問題数を50問以上に増やす
- [ ] 制限時間モード（本番試験は180分）
- [ ] 解説の音声読み上げ機能
- [ ] 学習履歴グラフ（Chart.jsによる可視化）
- [ ] PWA対応（オフラインで動作）
- [ ] 問題のシャッフル機能の改善（同じ問題が連続しないよう）
- [ ] ダークモード対応

## 注意事項

- この学習サイトの問題はOracle公式試験問題のコピーではなく、試験範囲に基づいたオリジナル問題です
- 本番試験の合格を保証するものではありません
- 学習データはブラウザのlocalStorageに保存されます（端末・ブラウザが変わるとリセット）
- Java SE 11 Silver を対象として作成しています

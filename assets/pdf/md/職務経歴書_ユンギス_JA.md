# 職 務 経 歴 書

2026年 9月 現在  
**氏名**：ユン・ギス (YUN KISOO)  
**GitHub**：[github.com/CuriousSpace](https://github.com/CuriousSpace) | **ポートフォリオ**：[curiousspace.github.io/Portfolio/index_ja.html](https://curiousspace.github.io/Portfolio/index_ja.html)

---

## ■ 職務要約 (Executive Summary)
大学卒業後、日本のIT企業（大阪）にて4年1ヶ月間、鉄道駅務システムや金属工業の工程管理システムなど、エンタープライズ領域におけるミッションクリティカルなレガシー移行（COBOL/Delphi → C#/.NET）およびPostgreSQL/BigQueryのクエリ実行計画チューニングを担当しました。  
帰国後はB2B SaaSプラットフォームのバックエンドリードとして、Java 21 / Spring Boot 3.4およびAWS環境を用いた高可用性アーキテクチャ設計、大規模集計クエリ最適化（レイテンシ95%削減）、Caffeineキャッシュ導入、マルチテナント権限分離エンジン開発を主導しました。完全リモート環境における自律的なドキュメント駆動開発（RFC, ADR, PRレビュー）を通じて高品質なシステム構築を推進します。

---

## ■ 活かせる経験・知識・技術 (Core Strengths)
- **大規模データベースクエリ最適化**：複合インデックス、時間帯バケット集計、実行計画解析（レイテンシ95%削減、2,000ms+ → 80ms）。
- **レガシーモダナイゼーション**：COBOL、DelphiからC#/.NET Webシステムへのリバースエンジニアリング・移行（計算誤差0件保証）。
- **マルチテナント認可アーキテクチャ**：3階層（発注者・元請・下請）組織データの厳格な分離およびデータ整合性100%担保エンジンの設計。
- **非同期高信頼性アーキテクチャ**：Transactional Outboxパターンによる外部通信障害遮断、WebSocket/STOMPリアルタイム通信。
- **AWS環境の運用監視・トラブルシューティング（SAA保有）**：CloudWatchによるOOM分析、Linux Swap（2GB）チューニングによるサーバーダウンゼロ達成。
- **日本語能力**：ビジネスレベル（JLPT N1、日本現地勤務4年以上）。

---

## ■ 主な技術スタック (Technical Toolkit)
- **言語**：Java (21), C# (.NET Core, WinForms), PHP, Python, SQL, JavaScript
- **フレームワーク**：Spring Boot 3.4, Spring Security, Spring Data JPA, QueryDSL, MyBatis, ASP.NET Core, Laravel
- **データベース/キャッシュ**：MariaDB, MySQL, PostgreSQL, Google BigQuery, Caffeine Cache
- **クラウド/インフラ**：AWS (EC2, RDS, S3, CloudFront, Athena, CloudWatch, EB), Docker, Nginx, GitHub Actions

---

## ■ 職務経歴詳細 (Work Experience)

### 1. 株式会社カンナム＆インコヌス（韓国 釜山）
- **期間**：2025年09月 ～ 現在在職中
- **雇用形態**：正社員
- **担当役職**：プラットフォーム開発チーム 主任研究員（バックエンドリード）

#### 【プロジェクト】：LHスマート安全管理B2B SaaSプラットフォーム v2 コア構築
- **開発環境**：Java 21, Spring Boot 3.4, MariaDB, JPA, QueryDSL, MyBatis, Caffeine, AWS (EC2, RDS, CloudWatch), Docker, WebSocket
- **担当業務および実績**：
  - **3層ハイブリッド永続化設計**：JPA（単純CRUD）、QueryDSL（動的検索）、MyBatis（大量集計）の責務分離アーキテクチャを確立。
  - **集計クエリ最適化（95%レイテンシ削減）**：生ログ全件スキャン方式を時間帯バケット集計および複合インデックスを用いたMyBatisクエリへ再設計（ダッシュボード応答時間を2,000ms+から80msへ約95%短縮）。
  - **気象庁API移行とCaffeineキャッシュ導入**：外部有料気象APIを気象庁公共データAPIに完全移行し、TTL 10〜30分のCaffeine Local Cacheを適用（外部API通信を80%以上削減、応答速度5ms以内達成）。
  - **マルチテナント認可エンジン開発**：発注者・元請・下請の3階層組織データを厳格に分離する認可エンジン（`ReadScopeResolver`）を開発（ページング総数とリストの整合性100%保証）。
  - **Transactional Outboxパターンの導入**：外部通知（FCM、カカオ通知トーク、STOMP）障害時におけるメインビジネストランザクションの巻き戻り防止。
  - **Linux Swapチューニングによる無停止運用**：CloudWatchのI/O遅延メトリクス解析に基づくLinux Swap（2GB）増設チューニング（OOMによるサーバーダウンゼロ達成）。未稼働EB環境7件・Route53レコード削除によるクラウド費用削減。
  - **位置情報サービス（LBS）事業許認可対応**：DB上のGPS座標AES-256暗号化およびアクセス監査ログ追跡システムの構築。
  - **開発者ツールの内製化**：フロントエンド非依存でリアルタイム通信を単体検証できる「WebSocket/STOMP デバッグコンソール」Webツールを独自開発。

---

### 2. 株式会社スマートソーシャル（韓国 釜山）
- **期間**：2023年05月 ～ 2025年08月（2年4ヶ月）
- **雇用形態**：正社員
- **担当役職**：サービス企画開発チーム リード（主任）

#### 【プロジェクト】：公共教育支援・多文化生徒進路プラットフォーム開発およびインフラ運用
- **開発環境**：PHP (Laravel), Spring Boot, Python, Pandas, Openpyxl, MySQL, AWS
- **担当業務および実績**：
  - **動的多言語レンダリング基盤構築**：多文化生徒進路プラットフォーム（`da2um.kr`）にて、ハードコードされた多言語画面を刷新し、Excel翻訳データ連動型の単一テンプレート動的レンダリングエンジンを構築（保守工数約90%削減）。
  - **SSO中継サーバー障害復旧と暗号化通信**：大学産学連携プラットフォーム（LINC 3.0）の上位機関セキュリティ検査に伴うSSO中継サーバー（Spring Boot）ポート遮断障害に対し、迅速なポート再割り当ておよびHTTPS/TLS暗号化通信の再構築によるサービス復旧。
  - **DB運用自動化スクリプト内製化**：Bastion SSH環境下にてPython（Pandas, Openpyxl）を用いた本番DBスキーマ自動抽出スクリプトおよび大量Excelデータ自動投入パイプライン（`readExcel`）を開発・運用。
  - **サードパーティ連携ROI検討**：外部ツール（Canva、Slack Enterprise API）の導入妥当性・ライセンスROI検討、デイリーヘルスチェック体制の運用。

---

### 3. アクサス株式会社（日本 大阪）
- **期間**：2019年04月 ～ 2023年04月（4年1ヶ月）
- **雇用形態**：正社員
- **担当役職**：第2エンジニアリング部 システムエンジニア (SE)

#### 【プロジェクト】：エンタープライズ基幹系システムのレガシー刷新およびデータチューニング
- **開発環境**：C# (.NET Core, WinForms), Delphi, COBOL, PostgreSQL, Google BigQuery, Oracle
- **担当業務および実績**：
  - **鉄道駅務内部システム刷新**：COBOLで構築された基幹業務ロジックをリバースエンジニアリングし、C# WinFormsシステムへマイグレーション。座席予約・発券・料金マスタ管理の正確な移行を実施。
  - **金属工業工程管理システムWEB化**：Delphi製オンプレミスプログラムを社内イントラネットC# Webシステムへ移行、ストアドプロシージャおよびDATバッチ処理ルーチンをモダンなC#関数ロジックへ安全に刷新。
  - **大手家電量販店 流通データチューニング**：PostgreSQLおよびGoogle BigQueryのクエリ実行計画（Execution Plan）分析に基づく不要スキャン・結合処理の改善。
  - **テスト仕様書策定とデータ整合性担保**：段階的なテスト仕様書の策定および回帰テスト体制の徹底運用により、言語移行前後で計算誤差0件・ビジネスロジックの完全な無矛盾性（100%整合性）を担保。

---

## ■ 保有資格・学歴 (Certifications & Education)
- **AWS Certified Solutions Architect – Associate (SAA)** | AWS (2025年05月)
- **AWS Certified Cloud Practitioner (CLF)** | AWS (2025年04月)
- **日本語能力試験 JLPT 1級** | 日本国際交流基金 / JEES (2025年08月)
- **東義大学校 経営情報学科 卒業**（2012年03月 ～ 2019年02月）

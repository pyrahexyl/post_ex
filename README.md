# 閲覧履歴をapi postするchrome extension

このプロジェクトは、
[https://github.com/pyrahexyl/serverless_s3_express_lambda](https://github.com/pyrahexyl/serverless_s3_express_lambda)
上記のserverless Frameworkを利用してデプロイされたAWS Lambdaのエンドポイントに、
閲覧したURLとbody text、日時をJSON形式でPOSTするchrome extensionです。

### Install

パッケージをインストールするには、
git cloneしたファイル群を
任意のディレクトリに設置後、
```javascript:background.js
//3行目
const apiBase = ''
```
ここのapiBaseに、
[冒頭のgithubプロジェクト](https://github.com/pyrahexyl/serverless_s3_express_lambda)
で発行されたエンドポイントURLを設定します。

現在、このextensionはpostするのみです。
get部分に関しては、
AWS Athenaを利用して全文検索するか、
S3ではなくDynamoDBに置き換えてしまうべきか、
選定中です。
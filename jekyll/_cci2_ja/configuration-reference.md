---
layout: classic-docs
title: "CircleCI を設定する"
short-title: "CircleCI を設定する"
description: ".circleci/config.yml に関するリファレンス"
order: 20
version:
  - Cloud
  - Server v2.x
suggested:
  - 
    title: 6 config optimization tips
    link: https://circleci.com/blog/six-optimization-tips-for-your-config/
  - 
    title: Intro to dynamic config
    link: https://discuss.circleci.com/t/intro-to-dynamic-config-via-setup-workflows/39868
  - 
    title: Using dynamic config
    link: https://circleci.com/blog/building-cicd-pipelines-using-dynamic-config/
  - 
    title: Validate your config using local CLI
    link: https://support.circleci.com/hc/en-us/articles/360006735753?input_string=configuration+error
  - 
    title: How to trigger a single job
    link: https://support.circleci.com/hc/en-us/articles/360041503393?input_string=changes+in+v2+api
---

`config.yml` ファイルで使用される CircleCI 2.x 構成キーのリファレンス ガイドです。 CircleCI によって承認されたリポジトリ ブランチに `.circleci/config.yml` ファイルが存在するということは、2.x インフラストラクチャを使用することを意味しています。

`config.yml` の全体は「[サンプル コード](#サンプル-コード)」で確認できます。

**メモ:** 既に CircleCI 1.0 バージョンの設定ファイルが存在する場合は、`config.yml` ファイルを使用することで、独立した別のブランチで 2.x ビルドをテストできます。 このとき、古い `circle.yml` スタイルの既存の構成は変更する必要がなく、CircleCI 1.0 インフラストラクチャの `.circleci/config.yml` を含まないブランチで実行できます。

---

* 目次
{:toc}


## **`setup`**
{: #setup }

| キー    | 必須 | 型    | 説明                                                                                  |
| ----- | -- | ---- | ----------------------------------------------------------------------------------- |
| setup | N  | ブール値 | config.yaml で[ダイナミック コンフィグ]({{ site.baseurl }}/2.0/dynamic-config/)機能を使用することを指定します。 |
{: class="table table-striped"}

`setup` フィールドを指定すると、プライマリ .circleci 親ディレクトリ外部にある設定ファイルのトリガー、パイプライン パラメーターの更新、およびカスタマイズされた設定ファイルの生成を、条件に従って実行できます。

## **`version`**
{: #version }

| キー      | 必須 | 型   | 説明                                                                                                                                                                                                        |
| ------- | -- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| version | Y  | 文字列 | パラメーター化された Executor の使用例については、[設定ファイルの再利用に関するドキュメント]({{ site.baseurl }}/ja/2.0/reusing-config/)の「[Executor でのパラメーターの使用](https://circleci.com/ja/docs/2.0/reusing-config/#executor-でのパラメーターの使用)」を参照してください。 |
{: class="table table-striped"}

`version` フィールドは、非推奨または互換性を損なう変更について注意を促すために使用します。

## **`orbs`** (version: 2.1 が必須)
{: #orbs-requires-version-21 }

| キー        | 必須 | 型   | 説明                                                                                                                                                                                 |
| --------- | -- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orbs      | N  | マップ | ユーザー指定の名前によるマップ。 Orb の参照名 (文字列) または Orb の定義名 (マップ) を指定します。 Orb 定義は、2.1 設定ファイルの Orb 関連サブセットである必要があります。 詳細については、[Orb の作成に関するドキュメント]({{ site.baseurl }}/2.0/creating-orbs/)を参照してください。 |
| executors | N  | マップ | Executor を定義する文字列のマップ。 このページの [executors]({{ site.baseurl }}/2.0/configuration-reference/#executors-version-21-が必須) セクションを参照してください。                                                |
| commands  | N  | マップ | コマンドを定義するコマンド名のマップ。 このページの [commands]({{ site.baseurl }}/2.0/configuration-reference/#commands-version-21-が必須) セクションを参照してください。                                                     |
{: class="table table-striped"}

以下の例では、承認済みの `circleci` 名前空間に格納された `hello-build` という名前の Orb を呼び出します。

```
version: 2.1
orbs:
    hello: circleci/hello-build@0.0.5
workflows:
    "Hello Workflow":
        jobs:
          - hello/hello-build
```
上の例で、`hello` は Orb の参照名と見なされます。 Orbs の詳細については[こちら](https://circleci.com/ja/orbs/)を参照してください。

## **`commands`** (version: 2.1 が必須)
{: #commands-requires-version-21 }

これにより、複数のジョブで [1 つのコマンド定義を再利用]({{ site.baseurl }}/ja/2.0/reusing-config/)できます。

| キー          | 必須 | 型     | 説明                                                                                                                                                              |
| ----------- | -- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| steps       | Y  | シーケンス | コマンドの呼び出し元のジョブ内で実行する一連のステップ。                                                                                                                                    |
| parameters  | N  | マップ   | パラメーター キーのマップ。 詳細については、[設定ファイルの再利用に関するドキュメント]({{ site.baseurl }}/2.0/reusing-config/)の「[パラメーターの構文]({{ site.baseurl }}/2.0/reusing-config/#パラメーターの構文)」を参照してください。 |
| description | N  | 文字列   | コマンドの目的を記述する文字列。                                                                                                                                                |
{: class="table table-striped"}

例

```yaml
commands:
  sayhello:
    description: "デモ用の簡単なコマンド"
    parameters:
      to:
        type: string
        default: "Hello World"
    steps:
      - run: echo << parameters.to >>
```

## **`parameters`** (version: 2.1 が必須)
{: #parameters-requires-version-21 }
設定ファイル内で使用するパイプライン パラメーターを定義します。 使用方法の詳細については、[パイプライン変数に関するドキュメント]({{ site.baseurl }}/2.0/pipeline-variables#設定ファイルにおけるパイプライン-パラメーター)を参照してください。

| キー         | 必須 | 型   | 説明                                                                                                                         |
| ---------- | -- | --- | -------------------------------------------------------------------------------------------------------------------------- |
| parameters | N  | マップ | パラメーター キーのマップ。 `文字列`、`ブール値`、`整数`、`列挙型`がサポートされています。 [パラメーターの構文]({{ site.baseurl }}/2.0/reusing-config/#パラメーターの構文)を参照してください。 |
{: class="table table-striped"}

## **`executors`** (version: 2.1 が必須)
{: #executors-requires-version-21 }

executors では、ジョブのステップを実行する環境を定義します。 これにより、複数のジョブで 1 つの Executor 定義を再利用できます。

| キー                | 必須               | 型   | 説明                                                                                                                                 |
| ----------------- | ---------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------- |
| docker            | ○ <sup>(1)</sup> | リスト | [docker Executor](#docker) 用のオプション。                                                                                                |
| resource_class    | N                | 文字列 | ジョブ内の各コンテナに割り当てられる CPU と RAM の量。 **注:** この機能を利用するには、Performance プランが必要です。                                                          |
| machine           | ○ <sup>(1)</sup> | マップ | [machine Executor](#machine) 用のオプション。                                                                                              |
| macos             | ○ <sup>(1)</sup> | マップ | [macOS Executor](#macos) 用のオプション。                                                                                                  |
| windows           | ○ <sup>(1)</sup> | マップ | 現在、[Windows Executor](#windows) は Orb に対応しています。 [こちらの Orb](https://circleci.com/developer/ja/orbs/orb/circleci/windows) を参照してください。 |
| shell             | N                | 文字列 | すべてのステップのコマンド実行に使用するシェル。 各ステップ内の `shell` でオーバーライドできます (デフォルト設定については、[デフォルトのシェル オプション](#デフォルトのシェル-オプション)を参照してください)。                 |
| working_directory | N                | 文字列 | ステップを実行するディレクトリ。 絶対パスとして解釈されます。                                                                                                    |
| environment       | N                | マップ | 環境変数の名前と値のマップ。                                                                                                                     |
{: class="table table-striped"}

<sup>(1)</sup> 各ジョブにいずれか 1 つの Executor タイプを指定する必要があります。 2 つ以上指定するとエラーが発生します。

例

```yaml
version: 2.1
executors:
  my-executor:
    docker:
      - image: circleci/ruby:2.5.1-node-browsers
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照

jobs:
  my-job:
    executor: my-executor
    steps:
      - run: echo outside the executor
```

パラメーター化された Executor の使用例については、[設定ファイルの再利用に関するドキュメント]({{ site.baseurl }}/2.0/reusing-config/)の「[Executor でのパラメーターの使用](https://circleci.com/ja/docs/2.0/reusing-config/#executor-でのパラメーターの使用)」を参照してください。

## **`jobs`**
{: #jobs }

ワークフローは 1 つ以上の一意の名前付きジョブで構成し、 それらのジョブは `jobs` マップで指定します。 [2.0 config.yml のサンプル]({{ site.baseurl }}/2.0/sample-config/)で `jobs` マップの例を紹介しています。 ジョブの名前がマップのキーとなり、ジョブを記述するマップが値となります。

**メモ:** ジョブの最大実行時間は 5 時間です。 ジョブがタイムアウトになる場合は、[ワークフロー]({{ site.baseurl }}/2.0/workflows/)を使用して同時実行することも検討してください。

### **<`job_name`>**
{: #lessjobnamegreater }

各ジョブは、キーとなるジョブ名と、値となるマップで構成されます。 名前は、その `jobs` リスト内で一意である必要があります。 値となるマップでは以下の属性を使用できます。

| キー                | 必須               | 型   | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | ---------------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| docker            | ○ <sup>(1)</sup> | リスト | [docker Executor](#docker) 用のオプション。                                                                                                                                                                                                                                                                                                                                                                                                      |
| machine           | ○ <sup>(1)</sup> | マップ | [machine Executor](#machine) 用のオプション。                                                                                                                                                                                                                                                                                                                                                                                                    |
| macos             | ○ <sup>(1)</sup> | マップ | [macOS Executor](#macos) 用のオプション。                                                                                                                                                                                                                                                                                                                                                                                                        |
| shell             | N                | 文字列 | すべてのステップのコマンド実行に使用するシェル。 各ステップ内の `shell` でオーバーライドできます (デフォルト設定については、[デフォルトのシェル オプション](#デフォルトのシェル-オプション)を参照してください)。                                                                                                                                                                                                                                                                                                                       |
| parameters        | N                | マップ | `ワークフロー`において `job` を明示的に構成可能にする[パラメーター](#parameters)。                                                                                                                                                                                                                                                                                                                                                                                    |
| steps             | Y                | リスト | 実行する[ステップ](#steps)のリスト。                                                                                                                                                                                                                                                                                                                                                                                                                  |
| working_directory | N                | 文字列 | ステップを実行するディレクトリ。 絶対パスとして解釈されます。 デフォルトは `~/project` となります (この `project` は特定のプロジェクトの名前ではなく、リテラル文字列)。 ジョブ内で実行するプロセスでは、`$CIRCLE_WORKING_DIRECTORY` 環境変数を介してこのディレクトリを参照できます。 **メモ:** YAML 設定ファイルに記述したパスは展開_されません_。 `store_test_results.path` を `$CIRCLE_WORKING_DIRECTORY/tests` と設定しても、CircleCI は文字どおり "`$CIRCLE_WORKING_DIRECTORY`" という、`$` 記号を含む名前のディレクトリ内に、サブディレクトリ `test` を格納しようとします。 `working_directory` で指定したディレクトリが存在しないときは自動で作成されます。 |
| parallelism       | N                | 整数  | このジョブを実行する並列インスタンスの数 (デフォルトは 1)。                                                                                                                                                                                                                                                                                                                                                                                                         |
| environment       | N                | マップ | 環境変数の名前と値のマップ。                                                                                                                                                                                                                                                                                                                                                                                                                           |
| branches          | N                | マップ | ワークフローまたはバージョン 2.1 の設定ファイル**以外**の構成に含まれる 1 つのジョブに対し、特定のブランチでの実行を許可またはブロックするルールを定義するマップ (デフォルトではすべてのブランチでの実行が許可されます)。 ワークフロー内またはバージョン 2.1 の設定ファイル内のジョブに対するブランチ実行の設定については、[workflows](#workflows) セクションを参照してください。                                                                                                                                                                                                                          |
| resource_class    | N                | 文字列 | ジョブ内の各コンテナに割り当てられる CPU と RAM の量。 **注:** この機能を利用するには、Performance プランが必要です。                                                                                                                                                                                                                                                                                                                                                                |
{: class="table table-striped"}

<sup>(1)</sup> 各ジョブにいずれか 1 つの Executor タイプを指定する必要があります。 2 つ以上指定するとエラーが発生します。

#### `environment`
{: #environment }
環境変数の名前と値のマップ。 これらは、CircleCI アプリケーションで設定した環境変数をオーバーライドします。


#### `parallelism`
{: #parallelism }

`parallelism` を 2 以上に設定すると、設定した数の Executor がそれぞれセットアップされ、そのジョブのステップを並列に実行します。 これにより、テスト ステップを最適化できます。 CircleCI CLI を使用して並列コンテナにテスト スイートを分割すると、ジョブの実行時間を短縮できます。 並列処理を設定していても、特定のステップでは並列処理がオプトアウトされ、1 つの Executor でのみ実行される場合があります (たとえば [`deploy` ステップ](#deploy-deprecated) など)。 詳細については、[並列ジョブのドキュメント]({{ site.baseurl }}/2.0/parallelism-faster-jobs/)を参照してください。

例

```yaml
version: 2.1

executors:
  linux-13:
    docker:
      - image: cimg/node:13.13
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照
  macos: &macos-executor
    macos:
      xcode: 11.4

jobs:
  test:
    parameters:
      os:
        type: executor
      node-version:
        type: string
    executor: << parameters.os >>
    steps:
      - checkout
      - when:
          condition:
            equal: [ *macos-executor, << parameters.os >> ]
          steps:
            - run: echo << parameters.node-version >>
      - run: echo 0

workflows:
  all-tests:
    jobs:
      - test:
          os: macos
          node-version: "13.13.0"
```

#### `parameters`
{: #parameters }
`parameters` は、[この`ジョブ`を`ワークフロー`で呼び出す](#jobs-in-workflow)ときに使用できます。

予約されているパラメーター名は以下のとおりです。

* `name`
* `requires`
* `context`
* `type`
* `filters`
* `matrix`
<!-- Others? -->
<!-- branches & type pass `circleci config validate`. Strange -->

定義の詳細については、「[パラメーターの構文]({{ site.baseurl }}/2.0/reusing-config/#parameter-syntax)」<!-- この参照先では、job-parameters に許可されている型について触れていません。 -->を参照してください。


#### **`docker`**/**`machine`**/**`macos`**/**`windows`** (_Executor_)
{: #docker-machine-macos-windows-executor }

Executor とは、簡単に言うと "ステップの実行環境" です。 CircleCI 2.0 では、必要な数の Docker コンテナを一度にローンチすることによって必要な環境を構築するか、完全な仮想マシンを使用します。 Executor の種類については、[こちら]({{ site.baseurl }}/2.0/executor-types/)を参照してください。

#### `docker`
{: #docker }
{:.no_toc}

`docker` キーは、以下のマップのリストで構成します。

| キー          | 必須 | 型         | 説明                                                              |
| ----------- | -- | --------- | --------------------------------------------------------------- |
| image       | Y  | 文字列       | 使用するカスタム Docker イメージの名前。                                        |
| name        | N  | 文字列       | 他から参照するためのコンテナの名前。  デフォルトでは、`localhost` を通してコンテナ サービスにアクセスできます。 |
| entrypoint  | N  | 文字列またはリスト | コンテナのローンチ時に実行するコマンド。                                            |
| command     | N  | 文字列またはリスト | コンテナのローンチ時にルート プロセスとなる PID 1 として使用するコマンド (または entrypoint の引数)。  |
| user        | N  | 文字列       | Docker コンテナ内でコマンドを実行するユーザー。                                     |
| environment | N  | マップ       | 環境変数の名前と値のマップ。                                                  |
| auth        | N  | マップ       | 標準の `docker login` 認証情報を用いたレジストリの認証情報。                          |
| aws_auth    | N  | マップ       | AWS Elastic Container Registry (ECR) の認証情報。                     |
{: class="table table-striped"}

ファイル内で最初に記述する `image` が、すべてのステップを実行するプライマリ コンテナ イメージとなります。

`entrypoint` は、イメージの `ENTRYPOINT` をオーバーライドします。

ファイル内で最初に記述する `image` が、すべてのステップを実行するプライマリ コンテナ イメージとなります。

[プライマリ コンテナ]({{ site.baseurl }}/2.0/glossary/#primary-container) (リストの最初にあるコンテナ) については、設定ファイルで `command` も `entrypoint` も指定されていない場合、イメージ内のすべての `ENTRYPOINT` と `CMD` が無視されます。 This is because the primary container is typically used only for running the `steps` and not for its `ENTRYPOINT`, and an `ENTRYPOINT` may consume significant resources or exit prematurely. ([カスタム イメージはこの挙動を無効にし、`ENTRYPOINT` を強制的に実行する場合があります]({{ site.baseurl }}/2.0/custom-images/#adding-an-entrypoint))。 ジョブの `steps` はプライマリ コンテナでのみ実行されます。

`name` では、セカンダリ サービス コンテナにアクセスするための名前を定義します。  デフォルトでは、すべてのサービスが `localhost` で直接アクセスできる状態になっています。  たとえば、同じサービスのバージョン違いを複数立ち上げるときなど、ローカル ホスト以外のホスト名を使用したい場合に、このフィールドは適しています。

`environment` 設定は、ジョブ ステップではなく Docker コンテナによって実行される ENTRYPOINT と CMD に適用されます。

タグまたはダイジェストを使用して、イメージのバージョンを指定できます。 任意の公式 Docker レジストリ (デフォルトは Docker Hub) にある任意のパブリック イメージを使用できます。 詳細については、[イメージの指定に関するドキュメント]({{ site.baseurl }}/2.0/executor-types)を参照してください。

Docker Hub など、一部のレジストリでは、匿名ユーザーによる Docker のプル回数に上限が設定されている場合があります。  こうした場合にプライベート イメージとパブリック イメージをプルするには、認証を行うことをお勧めします。 ユーザー名とパスワードは `auth` フィールドで指定できます。  詳細については、「[Docker の認証付きプルの使用]({{ site.baseurl }}/2.0/private-images/)」を参照してください。

例

```yaml
jobs:
  build:
    docker:
      - image: buildpack-deps:trusty # プライマリ コンテナ
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照
        environment:
          ENV: CI

      - image: mongo:2.6.8
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照
        command: [--smallfiles]

      - image: postgres:9.4.1
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照
        environment:
          POSTGRES_USER: root

      - image: redis@sha256:54057dd7e125ca41afe526a877e8bd35ec2cdd33b9217e022ed37bdcf7d09673
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照

      - image: acme-private/private-image:321
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  #  コンテキスト/プロジェクト UI 環境変数の参照
```

[AWS ECR](https://aws.amazon.com/jp/ecr/) でホストされているイメージを使用するには、AWS 認証情報を使用した認証が必要です。 デフォルトでは、CircleCI アプリケーションの [Project (プロジェクト)] > [Settings (設定)] > [AWS Permissions (AWS 権限)] ページで追加した AWS 認証情報、またはプロジェクト環境変数の `AWS_ACCESS_KEY_ID` と `AWS_SECRET_ACCESS_KEY` を使用します。 以下の例のように、`aws_auth` フィールドを使用して認証情報を設定することも可能です。

```yaml
jobs:
  build:
    docker:
      - image: account-id.dkr.ecr.us-east-1.amazonaws.com/org/repo:0.1
        aws_auth:
          aws_access_key_id: AKIAQWERVA  # 文字列リテラル値を指定するか
          aws_secret_access_key: $ECR_AWS_SECRET_ACCESS_KEY  # UI から設定したプロジェクトの環境変数を参照するように指定します
```

バージョン 2.1 を使用している場合、[宣言済みのコマンド]({{ site.baseurl }}/2.0/reusing-config/)をジョブで再利用できます。 以下の例では `sayhello` コマンドを呼び出しています。

```yaml
jobs:
  myjob:
    docker:
      - image: "circleci/node:9.6.1"
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/プロジェクト UI 環境変数の参照
    steps:
      - sayhello:
          to: "Lev"
```

#### **`machine`**
{: #machine }
{:.no_toc}

[machine Executor]({{ site.baseurl }}/2.0/executor-types) は、`machine` キーと以下のマップを用いて構成します。

| キー                     | 必須 | 型    | 説明                                                                                                                                                                                                                                                                          |
| ---------------------- | -- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| image                  | Y  | 文字列  | 使用する VM イメージ。 [使用可能なイメージ](#使用可能な-machine-イメージ)を参照してください。 **メモ:** このキーは、オンプレミス環境では**サポートされません**。 For information about customizing `machine` executor images on CircleCI installed on your servers, see our [VM Service documentation]. ({{ site.baseurl }}/2.0/vm-service). |
| docker_layer_caching | N  | ブール値 | `true` に設定すると、[Docker レイヤー キャッシュ]({{ site.baseurl }}/2.0/docker-layer-caching)が有効になります。 **メモ:** お使いのアカウントでこの有料の機能を有効化するには、サポート チケットをオープンしてください。 CircleCI 営業担当者から連絡を差し上げます。                                                                                                  |
{: class="table table-striped"}


例

```yaml
version: 2.1
jobs:
  build:
    machine:
      image: ubuntu-2004:202010-01
    steps:
      - checkout
      - run:
          name: "テスト"
          command: echo "Hi"
```

##### 使用可能な `machine` イメージ
{: #available-machine-images }

**Specifying an image in your config file is strongly recommended.** CircleCI supports multiple machine images that can be specified in the `image` field:

* `ubuntu-2004:202107-02` - Ubuntu 20.04, Docker v20.10.7, Docker Compose v1.29.2,
* `ubuntu-2004:202104-01` - Ubuntu 20.04、Docker v20.10.6、Docker Compose v1.29.1
* `ubuntu-2004:202101-01` - Ubuntu 20.04、Docker v20.10.2、Docker Compose v1.28.2
* `ubuntu-2004:202010-01` - Ubuntu 20.04、Docker v19.03.13、Docker Compose v1.27.4 (`ubuntu-2004:202008-01` はエイリアス)

* `ubuntu-1604:202104-01` - Ubuntu 16.04、Docker v19.03.15、Docker Compose v1.29.1 (最終版のリリース)
* `ubuntu-1604:202101-01` - Ubuntu 16.04、Docker v19.03.14、Docker Compose v1.28.2 (最新版の 1 つ前のリリース)
* `ubuntu-1604:202010-01` - Ubuntu 16.04、Docker v19.03.13、Docker Compose v1.27.4
* `ubuntu-1604:202007-01` - Ubuntu 16.04、Docker v19.03.12、Docker Compose v1.26.1
* `ubuntu-1604:202004-01` - Ubuntu 16.04、Docker v19.03.8、Docker Compose v1.25.5
* `ubuntu-1604:201903-01` - Ubuntu 16.04, Docker v18.09.3, Docker Compose v1.23.1

***Note:*** *Ubuntu 16.04 has reached the end of its LTS window as of April 2021 and will no longer be supported by Canonical. その結果、`ubuntu-1604:202104-01`がCircleCIにリリースされる最終的なUbuntu 16.04のイメージとなります。 2021年4月以降のリリースやサポートを受けるためには、最新のUbuntu 20.04イメージにアップグレードすることをお勧めします。 *</p>

machine Executor は、ジョブや Workflows で Docker イメージをビルドする際に効果的な [Docker レイヤーキャッシュ]({{ site.baseurl }}/2.0/docker-layer-caching)をサポートしています。

##### 使用可能な Linux GPU イメージ
{: #available-linux-gpu-images }

[Linux GPU Executor](#gpu-executor-linux) では、次のイメージが使用可能です。

* `ubuntu-1604-cuda-11.1:202012-01` - CUDA v11.1、Docker v19.03.13、nvidia-container-toolkit v1.4.0-1
* `ubuntu-1604-cuda-10.2:202012-01` - CUDA v10.2、Docker v19.03.13、nvidia-container-toolkit v1.3.0-1
* `ubuntu-1604-cuda-10.1:201909-23` - CUDA v10.1、Docker v19.03.0-ce、nvidia-docker v2.2.2
* `ubuntu-1604-cuda-9.2:201909-23` - CUDA v9.2、Docker v19.03.0-ce、nvidia-docker v2.2.2
* `ubuntu-1604-cuda-9.2:201909-23` - CUDA v9.2, Docker v19.03.0-ce, nvidia-docker v2.2.2

##### 使用可能な Windows GPU イメージ
{: #available-windows-gpu-image }

[Linux GPU Executor](#gpu-executor-linux) では、次のイメージが使用可能です。

* `windows-server-2019-nvidia:stable` - Windows Server 2019、CUDA 10.1。 このイメージはデフォルトです。

**例**

```yaml
version: 2.1
workflows:
  main:
    jobs:
      - build
jobs:
  build:
    machine:
      image: windows-server-2019-nvidia:stable
      docker_layer_caching: true    # デフォルトは false
```

#### **`macos`**
{: #macos }
{:.no_toc}

CircleCI は [macOS](https://developer.apple.com/jp/macos/) 上でのジョブ実行をサポートしており、macOS、[iOS](https://developer.apple.com/jp/ios/)、[tvOS](https://developer.apple.com/jp/tvos/)、および [watchOS](https://developer.apple.com/jp/watchos/) 用のアプリのビルド、テスト、デプロイが可能です。 macOS 仮想マシンでジョブを実行するには、`macos` キーをジョブ構成の最上位に追加し、使用する Xcode のバージョンを指定します。

| キー    | 必須 | 型   | 説明                                                                                                                                                |
| ----- | -- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| xcode | Y  | 文字列 | 仮想マシンにインストールする Xcode のバージョン。 iOS でのテストに関するドキュメントの「[サポートされている Xcode のバージョン]({{ site.baseurl }}/2.0/testing-ios/#サポートされている-xcode-のバージョン)」を参照してください。 |
{: class="table table-striped"}

**例:** macOS 仮想マシンを Xcode バージョン 11.3 で使用する場合

```yaml
jobs:
  build:
    macos:
      xcode: "11.3.0"
```

#### **`windows`**
{: #windows }
{:.no_toc}

CircleCI は、Windows 上でのジョブ実行をサポートしています。 Windows マシンでジョブを実行するには、`windows` キーをジョブ構成の最上位に追加する必要があります。 Orb を使用すると、Windows ジョブを簡単にセットアップできます。 Windows ジョブを実行する際の前提条件と、Windows マシンで提供される機能の詳細については、「[Windows での Hello World]({{ site.baseurl }}/2.0/hello-world-windows)」を参照してください。


**例:** Windows Executor を使用して単純なジョブを実行する場合

```yaml
version: 2.1

orbs:
  win: circleci/windows@2.3.0

jobs:
  build:
    executor: win/default
    steps:
      - checkout
      - run: echo 'Hello, Windows'
```

#### **`branches` – 非推奨**
{: #branches-deprecated }

**このキーは非推奨になりました。 実行するジョブと対象のブランチを制御するためには、[#jobfilters](#jobfilters)ワークフローでフィルターを使用してください。**

ワークフローを**構成せず**、バージョン 2.1 ではなく 2.0 の設定ファイルを使用している場合は、一部のブランチの実行を許可またはブロックするルールを定義できます。 [ワークフロー]({{ site.baseurl }}/2.0/workflows/#using-contexts-and-filtering-in-your-workflows)を使用している場合、ジョブ レベルのブランチは無視されるため、`config.yml` ファイルの workflows セクションで構成する必要があります。 2.1 の設定ファイルを使用している場合にフィルターを使用するには、ワークフローを追加する必要があります。 詳細については、「[workflows](#workflows)」セクションを参照してください。 ジョブ レベルの `branch` キーは、以下のマップで構成します。

| キー     | 必須 | 型   | 説明              |
| ------ | -- | --- | --------------- |
| only   | N  | リスト | 実行するブランチのみのリスト。 |
| ignore | N  | リスト | 無視するブランチのリスト。   |
{: class="table table-striped"}

`only` と `ignore` のリストには、完全一致のフル ネームと正規表現のどちらでも記述できます。 正規表現は、文字列**全体**に一致する必要があります。 たとえば、以下のようになります。

``` YAML
jobs:
  build:
    branches:
      only:
        - master
        - /rc-.*/
```

この場合は、"master" ブランチと、正規表現 "rc-.*" に一致するブランチのみが実行されます。

``` YAML
jobs:
  build:
    branches:
      ignore:
        - develop
        - /feature-.*/
```

こちらの例では、"develop" ブランチと正規表現 "feature-.*" に一致するブランチを除くすべてのブランチが実行されます。

設定ファイルに `ignore` と `only` の両方を記述している場合は、`ignore` のみが考慮されます。

構成されたルールによって実行されなかったジョブは、UI のジョブ一覧にスキップのマーク付きで表示されます。

**すべての**ブランチで確実にジョブを実行するには、`branches` キーを使用しないか、`only` キーに正規表現 `/.*/` を指定してすべてのブランチを対象にします。

#### **`resource_class`**
{: #resourceclass }

`resource_class` 機能を使用すると、CPU と RAM のリソース量をジョブごとに構成できます。 下表に示すように、Executor ごとにさまざまなリソース クラスが提供されています。

CircleCI では、すべてのお客様がシステムを安定した状態で利用できるよう、リソース クラスごとに同時処理数のソフト制限を設けています。 Performance プランまたは Custom プランを使用していて、特定のリソース クラスで待機時間が発生している場合は、このソフト制限に達している可能性があります。 [CircleCI サポート](https://support.circleci.com/hc/ja/requests/new)にお客様のアカウントの制限値引き上げを依頼してください。

**Note:** This feature is automatically enabled on Free and Performance plans. Available resources classes are restricted for customers on the Free plan to small/medium for linux, and medium for Windows. MacOS is not yet available on the Free plan.

**CircleCI Server をオンプレミスでホスティングしている場合は、利用可能なリソース クラスについてシステム管理者に問い合わせてください**。 詳細については、サーバーの管理に関するドキュメントで [Nomad クライアントのシステム要件]({{ site.baseurl }}/2.0/server-ports/#nomad-clients)と[サーバーのリソース クラス]({{ site.baseurl }}/2.0/customizations/#resource-classes)のセクションを参照してください。

##### Docker Executor
{: #docker-executor }

| クラス                    | vCPU | RAM  |
| ---------------------- | ---- | ---- |
| small                  | 1    | 2GB  |
| medium (デフォルト)         | 2    | 4GB  |
| medium+                | 3    | 6GB  |
| large                  | 4    | 8GB  |
| xlarge                 | 8    | 16GB |
| 2xlarge<sup>(2)</sup>  | 16   | 32GB |
| 2xlarge+<sup>(2)</sup> | 20   | 40GB |
{: class="table table-striped"}

###### 例
{: #example-usage }

```yaml
<code>ubuntu-1604:201903-01</code> - Ubuntu 16.04、Docker v18.09.3、Docker Compose v1.23.1
```
 - Ubuntu 16.04、Docker v18.09.3、Docker Compose v1.23.1
</code>

`resource_class` を使用して[ランナー インスタンス](https://circleci.com/docs/ja/2.0/runner-overview/#referencing-your-runner-on-a-job)を構成することもできます。

たとえば、以下のようになります。

```yaml
jobs:
  job_name:
    machine: true
    resource_class: my-namespace/my-runner
```

##### machine Executor (Linux)
{: #machine-executor-linux }

{% include snippets/machine-resource-table.md %}

###### 例
{: #example-usage }
```yaml
jobs:
  build:
    machine:
      image: ubuntu-2004:202010-01 # 推奨 Linux イメージ
    resource_class: large
    steps:
      ... // 他の構成
```

`machine` クラスを使用して[ランナー インスタンス](https://circleci.com/docs/ja/2.0/runner-overview/#referencing-your-runner-on-a-job)を構成することも可能です。

たとえば、以下のようになります。

```yaml
jobs:
  job_name:
    machine: true
    resource_class: my-namespace/my-runner
```

##### macOS Executor
{: #macos-executor }

| クラス                 | vCPU | RAM  |
| ------------------- | ---- | ---- |
| medium (デフォルト)      | 4    | 8GB  |
| large<sup>(3)</sup> | 8    | 16GB |
{: class="table table-striped"}

###### 例
{: #example-usage }
```yaml
jobs:
  build:
    macos:
      xcode: "11.3.0"
    resource_class: large
    steps:
      ... // 他の構成
```

##### Windows Executor
{: #windows-executor }

| クラス            | vCPU | RAM   |
| -------------- | ---- | ----- |
| medium (デフォルト) | 4    | 15GB  |
| large          | 8    | 30GB  |
| xlarge         | 16   | 60GB  |
| 2xlarge        | 32   | 128GB |
{: class="table table-striped"}

###### 例
{: #example-usage }
```yaml
version: 2.1

orbs:
  win: circleci/windows@2.3.0

jobs:
  build:
    executor:
      name: win/default
      size: "medium" # "medium"、"large"、"xlarge"、"2xlarge" のいずれを指定可能
    steps:
      - run: Write-Host 'Hello, Windows'
```

Executor が Windows Orb 内で定義されているため、`windows` ではリソース クラスの設定方法が異なっていることに注意してください。

Windows Executor の詳細と例については、[Windows に関する入門ガイド]({{ site.baseurl }}/2.0/hello-world-windows/)を参照してください。

##### GPU Executor (Linux)
{: #gpu-executor-linux }

| クラス                             | vCPU | RAM | GPU | GPU モデル         | GPU メモリ (GiB) |
| ------------------------------- | ---- | --- | --- | --------------- | ------------- |
| gpu.nvidia.small<sup>(2)</sup>  | 4    | 15  | 1   | NVIDIA Tesla P4 | 8             |
| gpu.nvidia.medium<sup>(2)</sup> | 8    | 30  | 1   | NVIDIA Tesla T4 | 16            |
{: class="table table-striped"}

###### 例
{: #example-usage }
```yaml
version: 2.1

jobs:
  build:
    machine:
      resource_class: gpu.nvidia.small
      image: ubuntu-1604-cuda-10.1:201909-23
    steps:
      - run: nvidia-smi
      - run: docker run --gpus all nvidia/cuda:9.0-base nvidia-smi
```

使用可能なイメージの一覧は、[こちらのセクション](#available-linux-gpu-images)を参照してください。

##### GPU Executor (Windows)
{: #gpu-executor-windows }

| クラス                                     | vCPU | RAM | GPU | GPU モデル         | GPU メモリ (GiB) |
| --------------------------------------- | ---- | --- | --- | --------------- | ------------- |
| windows.gpu.nvidia.medium<sup>(2)</sup> | 16   | 60  | 1   | NVIDIA Tesla T4 | 16            |
{: class="table table-striped"}

###### 例
{: #example-usage }
```yaml
version: 2.1
orbs:
  win: circleci/windows@2.3.0

jobs:
  build:
    executor: win/gpu-nvidia
    steps:
      - checkout
      - run: '&"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"'
```

<sup>(2)</sup> _このリソースは、サポート チームによる確認が必要となります。 ご利用の際は、[サポート チケットをオープン](https://support.circleci.com/hc/ja/requests/new)してください。

<sup>(3)</sup> _このリソースは、年間契約をご購入のお客様のみ使用可能です。 年間プランの詳細については、[サポート チケットをオープン](https://support.circleci.com/hc/ja/requests/new)しお問い合わせください。

**メモ:** Java、Erlang など、CPU 数に関する情報を `/proc` ディレクトリから入手する言語では、CircleCI 2.0 のリソース クラス機能を使用するときに、低速化を防ぐために追加の構成が必要になることがあります。 この問題が発生すると、32 個の CPU コアを要求していても、1 コアを要求する場合よりも実行速度が低下する場合があります。 この問題が発生する言語をお使いの場合は、保証された CPU リソースに基づいて CPU 数を固定する必要があります。


**メモ:** 割り当てられているメモリ量を確認するには、`grep hierarchical_memory_limit /sys/fs/cgroup/memory/memory.stat` を実行して cgroup メモリ階層制限をチェックしてください。

#### **`steps`**
{: #steps }

ジョブ内の `steps` は、キーと値のペアを 1 つずつ列挙する形で設定します。 キーはステップの種類を表し、 値は (そのステップの種類の要件に従って) 構成マップまたは文字列で記述します。 たとえば、マップで記述する場合は以下のようになります。

```yaml
jobs:
  build:
    working_directory: ~/canary-python
    environment:
      FOO: bar
    steps:
      - run:
          name: テストの実行
          command: make test
```

ここでは、`run` がステップの種類です。 `name` 属性は、UI に表示するために使用します。 `command` 属性は `run` ステップに固有の属性で、実行するコマンドを定義します。

Some steps may implement a shorthand semantic. For example, `run` may be also be called like this:

```
jobs:
  build:
    steps:
      - run: make test
```

省略形式の `run` ステップでは、どの `command` を実行するかを文字列値で直接指定できます。 この場合、他の属性に対しては、自動的に適切なデフォルト値が設定されます (たとえば、`name` は `command` と同じ値になります)。

さらに一部のステップには別の省略表記があり、キーと値のペアの代わりに単なる文字列のステップ名を使用できます。

```
jobs:
  build:
    steps:
      - checkout
```

この例の `checkout` ステップは、プロジェクトのソース コードをジョブの [`working_directory`](#jobs) にチェックアウトします。

通常、ステップは以下のように記述します。

| キー                   | 必須 | 型         | 説明                              |
| -------------------- | -- | --------- | ------------------------------- |
| &lt;step_type> | Y  | マップまたは文字列 | ステップの構成マップ、またはステップによって規定された文字列。 |
{: class="table table-striped"}

定義済みステップについて、以下に詳しく説明します。

##### **`run`**
{: #run }

すべてのコマンドライン プログラムの呼び出しに使用します。 構成値のマップを記述するか、省略形式で呼び出した場合には `command` と `name` の両方に使用する文字列を記述します。 run コマンドは、デフォルトでは非ログイン シェルで実行されます。 したがって、ドットファイルをコマンドの中で明示的に参照する必要があります。

| キー                  | 必須 | 型    | 説明                                                                                                                                                                                                     |
| ------------------- | -- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| command             | Y  | 文字列  | シェルから実行するコマンド。                                                                                                                                                                                         |
| name                | N  | 文字列  | CircleCI の UI に表示されるステップのタイトル (デフォルトは `command` 文字列全体)。                                                                                                                                                |
| shell               | N  | 文字列  | コマンド実行に使用するシェル (デフォルトについては「[デフォルトのシェル オプション](#default-shell-options)」を参照)。                                                                                                                             |
| environment         | N  | マップ  | コマンドに対するローカル スコープとなる追加の環境変数。                                                                                                                                                                           |
| background          | N  | ブール値 | このステップをバックグラウンドで実行するかどうかの設定 (デフォルトは false)。                                                                                                                                                            |
| working_directory   | N  | 文字列  | このステップを実行するディレクトリ。 ジョブの [`working_directory`](#jobs) からの相対パスとして解釈されます  (デフォルトは `.`)。 (default: `.`)                                                                                                    |
| no_output_timeout | N  | 文字列  | 出力のないままコマンドを実行できる経過時間。 The string is a decimal with unit suffix, such as "20m", "1.25h", "5s". 「20m」「1.25h」「5s」のように、数字の後に単位を付けた文字列で記述します (デフォルトは 10 分) デフォルトは10分で、最大値は[ジョブの実行が許される最大時間](#jobs)に制限されます。 |
| when                | N  | 文字列  | [このステップを有効または無効にする条件](#the-when-attribute)。 値は `always`、`on_success`、または `on_fail` です (デフォルトは `on_success`)。                                                                                           |
{: class="table table-striped"}

それぞれの `run` 宣言で新しいシェルが立ち上がります。 複数行の `command` を指定でき、その場合はすべての行が同じシェルで実行されます。

``` YAML
- run:
    command: |
      echo Running test
      mkdir -p /tmp/test-results
      make test
```

あるステップの完了を待つことなく後続の run ステップを実行したい場合は、[バックグラウンド](#background-commands)でコマンドを実行するように設定することもできます。

###### _デフォルトのシェル オプション_
{: #default-shell-options }

**Linux** で実行するジョブの場合、`shell` オプションのデフォルト値は、`/bin/bash`がビルド コンテナに存在すれば`/bin/bash -eo pipefail`です。 存在しなければ `/bin/sh -eo pipefail` になります。 デフォルトのシェルはログイン シェルではありません (`--login` や `-l` は指定されません)。 そのため、このシェルは `~/.bash_profile`、`~/.bash_login`、`~/.profile` といったファイルを**読み込みません**。

**macOS** で実行するジョブの場合、デフォルトのシェルは `/bin/bash --login -eo pipefail` になります。 このシェルは、非対話型のログイン シェルです。 シェルは、`/etc/profile/` を読み込み、続いて `~/.bash_profile` を読み込んでから、各ステップを実行します。

bash を呼び出したときに実行されるファイルの詳細については、[`bash` のマニュアル ページの `INVOCATION` のセクション](https://linux.die.net/man/1/bash)をご覧ください。

`-eo pipefail` オプションの意味は下記の通りです。

`-e`

> パイプライン (1 つのコマンドで構成される場合を含む)、かっこ「()」で囲まれたサブシェル コマンド、または中かっこ「{}」で囲まれたコマンド リストの一部として実行されるコマンドの 1 つが 0 以外のステータスで終了した場合は、直ちに終了します。

したがって、前の例で `mkdir` によるディレクトリの作成が失敗し、0 以外のステータスを返した場合は、コマンドの実行が終了し、ステップ全体が失敗として扱われます。 それとは反対の動作にする必要がある場合は、`command` に `set +e` を追加するか、`run` の構成マップでデフォルトの `shell` をオーバーライドします。 たとえば、以下のようになります。
``` YAML
- run:
    command: |
      echo Running test
      set +e
      mkdir -p /tmp/test-results
      make test

- run:
    shell: /bin/sh
    command: |
      echo Running test
      mkdir -p /tmp/test-results
      make test
```

`-o pipefail`

> pipefail を有効にすると、パイプラインの戻り値は、0 以外のステータスで終了した最後 (右端) のコマンドのステータス値か、すべてのコマンドが正しく終了した場合に 0 となります。 シェルは、パイプライン内のすべてのコマンドの終了を待って値を返します。

たとえば、以下のようになります。
``` YAML
- run: make test | tee test-output.log
```

この例では、`make test` が失敗した場合、`-o pipefail` オプションによってステップ全体が失敗します。 `-o pipefail` オプションを指定していなければ、パイプライン全体の結果は最後のコマンド (`tee test-output.log`) によって決まり、これは常に 0 のステータスを返すため、ステップの実行は常に成功となります。

`make` test が失敗しても、パイプラインの残りの部分は実行されることに注意してください。

この動作を回避するには、コマンドで `set +o pipefail` を指定するか、`shell` 全体をオーバーライドします (前述の例を参照)。

デフォルト オプション (`-eo pipefail`) を使用すると、途中のコマンドのエラーが表示され、失敗したジョブのデバッグが容易になるため、通常はこちらをお勧めします。 UI には、使用されているシェルと各 `run` ステップのすべての有効なオプションが表示されるため便利です。

詳細については、「[シェル スクリプトの使用]({{ site.baseurl }}/2.0/using-shell-scripts/)」を参照してください。

###### _バックグラウンド コマンド_
{: #background-commands }

`background` 属性を使用すると、コマンドをバックグラウンドで実行するように構成できます。 `background` 属性を `true` に設定した場合、コマンドの終了を待つことなく、ジョブの実行が直ちに次のステップに進みます。 以下は、Selenium テストにおいてよく必要となる、X 仮想フレームバッファをバックグラウンドで実行するための構成例です。

``` YAML
- run:
    name: X 仮想フレームバッファの実行
    command: Xvfb :99 -screen 0 1280x1024x24
    background: true

- run: make test
```

###### _省略構文_
{: #shorthand-syntax }

`run` では、たいへん便利な省略構文を使用できます。

``` YAML
- run: make test

# 簡略化したうえで複数行のコマンドを実行
- run: |
    mkdir -p /tmp/test-results
    make test
```
この例では、`command` と `name` に `run` の文字列値が割り当てられたことになり、この `run` の構成マップの残りの属性はデフォルト値になります。

###### `when` 属性
{: #the-when-attribute }

CircleCI のデフォルトでは、ジョブ ステップが `config.yml` に定義された順序で一度に 1 つずつ、いずれかのステップが失敗する (0 以外の終了コードを返す) まで実行されます。 コマンドが失敗すると、以降のジョブ ステップは実行されません。

ジョブ ステップに `when` 属性を追加すると、このデフォルトの動作をオーバーライドして、ジョブのステータスに応じてステップを実行するかスキップするかを選択できるようになります。

デフォルト値の `on_success` は、それまでのすべてのステップが成功した (終了コード 0 を返した) 場合にのみ、そのステップが実行されることを意味します。

`always` は、それまでのステップの終了ステータスに関係なく、そのステップが実行されることを意味します。 それまでのステップの成否にかかわらずタスクを実行したい場合に便利です。 例として、ログやコード カバレッジ データをどこかにアップロードする必要があるジョブ ステップが挙げられます。

`on_fail` は、それまでのステップの 1 つが失敗した (0 以外の終了コードを返した) 場合にのみ、そのステップが実行されることを意味します。 失敗したテストのデバッグに役立てるために何らかの診断データを保存したり、失敗に関するカスタム通知 (メールの送信やチャットルームへのアラートのトリガーなど) を実行したりする場合に、よく使用されます。

**メモ:** `store_artifacts`、`store_test_results` などの一部のステップは、**それより前のステップが失敗しても** (0 以外の終了コードが返された場合でも) 常に実行されます。 ただし、ジョブがキャンセル要求により**強制終了**された場合、または実行時間がグローバル タイムアウト上限である 5 時間に達した場合、`when` 属性、`store_artifacts`、`store_test_results` は実行されません。

``` YAML
- run:
    name: CodeCov.io データのアップロード
    command: bash <(curl -s https://codecov.io/bash) -F unittests
    when: always # 成功しても失敗しても、コード カバレッジの結果をアップロードします
```



###### `step` 内からのジョブの終了
{: #ending-a-job-from-within-a-step }

`run: circleci-agent step halt` を使用することで、ジョブを失敗させずに終了できます。 これは、条件に従ってジョブを実行する必要がある場合に便利です。

以下の例では、`halt` を使用して、`develop` ブランチでジョブが実行されないようにしています。

``` YAML
run: |
    if [ "$CIRCLE_BRANCH" = "develop" ]; then
        circleci-agent step halt
    fi
```

###### 例
{: #example }

```yaml
steps:
  - run:
      name: アプリケーションのテスト
      command: make test
      shell: /bin/bash
      working_directory: ~/my-app
      no_output_timeout: 30m
      environment:
        FOO: bar

  - run: echo 127.0.0.1 devhost | sudo tee -a /etc/hosts

  - run: |
      sudo -u root createuser -h localhost --superuser ubuntu &&
      sudo createdb -h localhost test_db

  - run:
      name: 失敗したテストのアップロード
      command: curl --data fail_tests.log http://example.com/error_logs
      when: on_fail
```

##### **`when` ステップ** (version: 2.1 が必須)
{: #the-when-step-requires-version-21 }

条件付きステップは、`when` キーまたは `unless` キーを含むステップで構成されます。 `when` キーの下に、`condition` サブキーと `steps` サブキーを記述します。 `when` ステップの目的は、コマンドやジョブ構成が、ワークフローの実行前にチェックされるカスタム条件 (設定ファイルのコンパイル時に決定) に基づいて実行されるようにカスタマイズすることです。 詳細については、「[条件付きステップの定義]({{ site.baseurl }}/2.0/reusing-config/#defining-conditional-steps)」を参照してください。

| キー        | 必須 | 型     | 説明                                                                                         |
| --------- | -- | ----- | ------------------------------------------------------------------------------------------ |
| condition | Y  | ロジック  | [ロジック ステートメント](https://circleci.com/docs/ja/2.0/configuration-reference/#logic-statements) |
| steps     | Y  | シーケンス | 条件が true のときに実行するステップのリスト。                                                                 |
{: class="table table-striped"}

###### *例*
{: #example }

```
version: 2.1

jobs: # conditional steps may also be defined in `commands:`
  job_with_optional_custom_checkout:
    parameters:
      custom_checkout:
        type: string
        default: ""
    machine:
      image: ubuntu-2004:202107-02
    steps:
      - when:
          condition: <<parameters.custom_checkout>>
          steps:
            - run: echo "my custom checkout"
      - unless:
          condition: <<parameters.custom_checkout>>
          steps:
            - checkout
workflows:
  build-test-deploy:
    jobs:
      - job_with_optional_custom_checkout:
          custom_checkout: "any non-empty string is truthy"
      - job_with_optional_custom_checkout
```

##### **`checkout`**
{: #checkout }

設定済みの `path` (デフォルトは `working_directory`) にソース コードをチェックアウトするために使用する特別なステップです。 これが特別なステップである理由は、単なるヘルパー関数ではなく、コードを自動的に簡単にチェックアウトできるように設計されているからです。 このステップは SSH でチェックアウトするように git を設定するため、HTTPS で git を実行する必要がある場合は、このステップを使用しないでください。

| キー   | 必須 | 型   | 説明                                                                                               |
| ---- | -- | --- | ------------------------------------------------------------------------------------------------ |
| path | N  | 文字列 | チェックアウト ディレクトリ。 ジョブの [`working_directory`](#jobs) からの相対パスとして解釈されます  (デフォルトは `.`)。 (default: `.`) |
{: class="table table-striped"}

`path` が既に存在する場合、次のように動作します。
 * Git リポジトリ - ステップはリポジトリ全体をクローンするのではなく、オリジナルをフェッチします。
 * Git リポジトリ以外 - ステップは失敗します。

`checkout` は、属性のない単なる文字列としてステップを記述します。

``` YAML
- checkout
```

**メモ:** CircleCI は、サブモジュールをチェックアウトしません。 サブモジュールが必要なプロジェクトの場合は、以下の例に示すように、適切なコマンドを実行する `run` ステップを追加します。

``` YAML
- checkout
- run: git submodule sync
- run: git submodule update --init
```

このコマンドは、SSH 経由で GitHub や Bitbucket を操作するために必要な認証鍵を自動的に挿入します。 この詳細は、カスタム チェックアウト コマンドを実装する際に役に立つ[インテグレーション ガイド]({{ site.baseurl }}/2.0/gh-bb-integration/#establishing-the-authenticity-of-an-ssh-host)で解説しています。

**メモ:** `checkout` ステップは、自動ガベージ コレクションをスキップするように Git を構成します。 [restore_cache](#restore_cache) で `.git` ディレクトリをキャッシュし、そのキャッシュ サイズをガベージ コレクションで縮小したい場合は、その前に `git gc` コマンドを指定した [run](#run) ステップを実行してください。

##### **`setup_remote_docker`**
{: #setupremotedocker }

Docker コマンドを実行するように構成されたリモート Docker 環境を作成します。 詳細については、「[Docker コマンドの実行手順]({{ site.baseurl }}/2.0/building-docker-images/)」を参照してください。

| キー                     | 必須 | 型    | 説明                                                                                                                                                    |
| ---------------------- | -- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| docker_layer_caching | N  | ブール値 | `true` に設定すると、リモート Docker 環境で [Docker レイヤー キャッシュ]({{ site.baseurl }}/2.0/docker-layer-caching/) が有効になります (デフォルトは `false`)。                            |
| version                | N  | 文字列  | 使用する Docker のバージョン文字列 (デフォルトは `17.09.0-ce`)。 サポートされている Docker バージョンについては、[こちら]({{site.baseurl}}/2.0/building-docker-images/#docker-version)を参照してください。 |
{: class="table table-striped"}

**`matrix`** (version: 2.1 が必須)

- Docker レイヤー キャッシュを利用するには、[Performance プランまたは Custom プラン](https://circleci.com/ja/pricing/)に登録済みの有料アカウントが必要です。
- `setup_remote_docker` は、`machine` Executor とは一緒に使えません。 `machine` Executor で Docker レイヤー キャッシュを有効化する方法については、[こちら]({{ site.baseurl }}/2.0/docker-layer-caching/#machine-executor)を参照してください。
- 現在、プライベート クラウドまたはデータセンターにインストールされている CircleCI では、`version` キーがサポートされていません。 お使いのリモート Docker 環境にインストールされている Docker バージョンについては、システム管理者にお問い合わせください。

##### **`save_cache`**
{: #savecache }

依存関係やソース コードなどのファイルのキャッシュ、または複数のファイルが入ったディレクトリのキャッシュを生成して、オブジェクト ストレージに格納します。 後続のジョブで、[キャッシュを復元](#restore_cache)できます。 詳細については、[キャッシュに関するドキュメント]({{ site.baseurl }}/2.0/caching/)を参照してください。

| キー    | 必須 | 型   | 説明                                                                                                           |
| ----- | -- | --- | ------------------------------------------------------------------------------------------------------------ |
| paths | Y  | リスト | キャッシュに追加するディレクトリのリスト。                                                                                        |
| key   | Y  | 文字列 | このキャッシュの一意の識別子。                                                                                              |
| name  | N  | 文字列 | CircleCI の UI に表示されるステップのタイトル (デフォルトは「Saving Cache」)。                                                        |
| when  | N  | 文字列 | [このステップを有効または無効にする条件](#the-when-attribute)。 値は `always`、`on_success`、または `on_fail` です (デフォルトは `on_success`)。 |
{: class="table table-striped"}

新しいキャッシュを格納する際に、`key` に特別なテンプレートの値を含めることも可能です。

**メモ:** `key` に指定した値が既存のキャッシュの識別子と重複する場合、そのキャッシュは変更されないまま、ジョブの実行が次のステップに進みます。

新しいキャッシュを格納する際に、`key` に特別なテンプレートの値を含めることも可能です。

| テンプレート                                                 | 説明                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {% raw %}`{{ .Branch }}`{% endraw %}                   | 現在ビルド中の VCS ブランチ。                                                                                                                                                                                                                                                                                                       |
| {% raw %}`{{ .BuildNum }}`{% endraw %}                 | このビルドの CircleCI ビルド番号。                                                                                                                                                                                                                                                                                                  |
| {% raw %}`{{ .Revision }}`{% endraw %}                 | 現在ビルド中の VCS リビジョン。                                                                                                                                                                                                                                                                                                      |
| {% raw %}`{{ .CheckoutKey }}`{% endraw %}              | リポジトリのチェックアウトに使用する SSH 鍵。                                                                                                                                                                                                                                                                                               |
| {% raw %}`{{ .Environment.variableName }}`{% endraw %} | 環境変数 `variableName` ([CircleCI からエクスポートされる環境変数](https://circleci.com/ja/docs/2.0/env-vars/#circleci-environment-variable-descriptions)、または特定の[コンテキスト](https://circleci.com/ja/docs/2.0/contexts)に追加した環境変数がサポートされ、任意の環境変数は使用できません)。                                                                                      |
| {% raw %}`{{ checksum "filename" }}`{% endraw %}       | filename で指定したファイルの内容の SHA256 ハッシュを Base64 エンコードした値。 絶対パス、または現在の作業ディレクトリからの相対パスで参照できます。 依存関係マニフェスト ファイル (`package-lock.json`、`pom.xml`、`project.clj` など) の使用をお勧めします。 また、このファイルの内容が、`restore_cache` から `save_cache` までの間に変化しないようにすることが重要です。 ファイルの内容が変化した場合、`restore_cache` のタイミングで使用されるファイルとは異なるキャッシュ キーの下でキャッシュが保存されます。 |
| {% raw %}`{{ epoch }}`{% endraw %}                     | UNIX エポックからの秒数で表される現在時刻。                                                                                                                                                                                                                                                                                                |
| {% raw %}`{{ arch }}`{% endraw %}                      | OS と CPU の情報。  OS や CPU アーキテクチャに合わせてコンパイル済みバイナリをキャッシュする場合に便利です (`darwin amd64`、`linux i386/32-bit` など)。                                                                                                                                                                                                                 |
{: class="table table-striped"}

ステップの実行中に、上記のテンプレートが実行時の値に置き換えられ、その置換後の文字列が `key` として使用されます。

テンプレートの例
 * {% raw %}`myapp-{{ checksum "package-lock.json" }}`{% endraw %} - `package-lock.json` ファイルの内容が変わるたびにキャッシュが再生成されます。 このプロジェクトのさまざまなブランチで同じキャッシュ キーが生成されます。
 * {% raw %}`myapp-{{ .Branch }}-{{ checksum "package-lock.json" }}`{% endraw %} - 上の例と同じように、ファイルの内容が変わるたびにキャッシュが再生成されますが、各ブランチで個別のキャッシュが生成されます。
 * {% raw %}`myapp-{{ epoch }}`{% endraw %} - ジョブを実行するごとに個別のキャッシュが生成されます。

キャッシュの `key` に使用するテンプレートを選択するうえでは、キャッシュの保存にはコストがかかること、キャッシュを CircleCI ストレージにアップロードするにはある程度の時間がかかることに留意してください。 したがって、実際に何か変更があった場合にのみ新しいキャッシュが生成されるような `key` を使用し、ジョブを実行するたびに新しいキャッシュが生成されることがないようにします。

<div class="alert alert-info" role="alert">
<b>ヒント:</b> キャッシュは変更不可なので、すべてのキャッシュ キーの先頭にプレフィックスとしてバージョン名 (<code class="highlighter-rouge">v1-...</code> など) を付加すると便利です。 こうすれば、プレフィックスのバージョン番号を増やしていくだけで、キャッシュ全体を再生成できます。
</div>

###### _例_
{: #example }

{% raw %}
``` YAML
- save_cache:
    key: v1-myapp-{{ arch }}-{{ checksum "project.clj" }}
    paths:
      - /home/ubuntu/.m2
```
{% endraw %}

##### **`restore_cache`**
{: #restorecache }

以前に保存したキャッシュを `key` に基づいて復元します。 あらかじめ [`save_cache` ステップ](#save_cache)を使用して、そのキーでキャッシュを保存しておく必要があります。 詳細については、[キャッシュに関するドキュメント]({{ site.baseurl }}/2.0/caching/)を参照してください。

| キー   | 必須               | 型   | 説明                                                        |
| ---- | ---------------- | --- | --------------------------------------------------------- |
| key  | ○ <sup>(1)</sup> | 文字列 | 復元するキャッシュ キーを 1 つだけ指定します。                                 |
| keys | ○ <sup>(1)</sup> | リスト | 復元するキャッシュを検索するためのキャッシュ キーのリスト。 最初に一致したキーのみが復元されます。        |
| name | N                | 文字列 | CircleCI の UI に表示されるステップのタイトル (デフォルトは "Restoring Cache")。 |
{: class="table table-striped"}

<sup>(1)</sup> 少なくとも 1 つの属性を指定する必要があります。 `key` と `keys` の両方を指定すると、最初に `key` がチェックされ、次に `keys` がチェックされます。

既存のキーを対象に前方一致で検索が行われます。

**メモ:** 複数が一致する場合は、一致度の高さに関係なく、**一致する最新のもの**が復元されます。

たとえば、以下のようになります。

``` YAML
steps:
  - save_cache:
      key: v1-myapp-cache
      paths:
        - ~/d1

  - save_cache:
      key: v1-myapp-cache-new
      paths:
        - ~/d2

  - run: rm -f ~/d1 ~/d2

  - restore_cache:
      key: v1-myapp-cache
```

上記の例では、最初のキー (`v1-myapp-cache`) が正確に一致していますが、`v1-myapp-cache` との前方一致となる最新のキャッシュ `v1-myapp-cache-new` が復元されます。

キーの書式の詳細については、[`save_cache` ステップ](#save_cache)の `key` に関する説明を参照してください。

`keys` リストが検出されると、既存のキャッシュに最初に一致するキャッシュが復元されます。 通常は、より特定度の高いキー (たとえば、`package-lock.json` ファイルの正確なバージョンに対応するキー) を最初に記述し、より汎用的なキー (たとえば、プロジェクトの任意のキャッシュが対象となるキー) をその後に記述します。 キーに該当するキャッシュが存在しない場合は、警告が表示され、ステップがスキップされます。

キャッシュは元々保存されていた場所に復元されるため、ここでパスは必要ありません。

###### 例
{: #example }

{% raw %}
``` YAML
- restore_cache:
    keys:
      - v1-myapp-{{ arch }}-{{ checksum "project.clj" }}
      # `project.clj` の正確なバージョンに対応するキャッシュが存在しない場合は、最新のキャッシュをロードします
      - v1-myapp-

# ... アプリケーションをビルドおよびテストするステップ ...

# キャッシュは「project.clj」のバージョンごとに一度だけ保存する
- save_cache:
    key: v1-myapp-{{ arch }}-{{ checksum "project.clj" }}
    paths:
      - /foo
```
{% endraw %}

##### **`deploy` – 非推奨**
{: #deploy-deprecated }

**このキーは非推奨になりました。 デプロイの制御性を高めるため、[workflows](#workflows) と filters キーおよび schedule キーを適切に組み合わせて使用してください。**

アーティファクトをデプロイするための特別なステップです。

`deploy` は、[`run`](#run) ステップと同じ構成マップおよび構文を用います。 ジョブに 2 つ以上の `deploy` ステップを記述できます。

通常、以下の 2 つの例外を除いて、`deploy` ステップは `run` と同じように動作します。

- `parallelism` を指定したジョブにおいて、`deploy` ステップは、すべてのノードが成功した場合にノード #0 でのみ実行されます。 #0 以外のノードは、このステップをスキップします。
- SSH を使用して実行するジョブでは、`deploy` ステップは実行されず、代わりに以下のアクションが表示されます。 > **skipping deploy** > Running in SSH mode.  Avoid deploying.

`deploy` ステップを使用するときには、ワークフローを使用してジョブのオーケストレーションやトリガーを実行する方法を理解しておくことをお勧めします。 ワークフローの使用方法については、以下を参照してください。

- [ワークフロー](https://circleci.com/docs/ja/2.0/workflows/)
- [`workflows`](https://circleci.com/docs/ja/2.0/configuration-reference/#section=configuration)

###### 例
{: #example }

``` YAML
- deploy:
    command: |
      if [ "${CIRCLE_BRANCH}" == "master" ]; then
        ansible-playbook site.yml
      fi
```

**注:** `run` ステップでは `run: my command` のようなショートカットを使用できますが、`deploy` ステップで同様に `deploy: my command` のようにショートカットを使用すると、CircleCI から以下のエラー メッセージが出力されます。

`ステップ 3 の定義について、このタイプのステップでは省略構文は使用できません`

##### **`store_artifacts`**
{: #storeartifacts }

Web アプリまたは API からアクセスできるアーティファクト (ログ、バイナリなど) を格納するステップです。 詳細については、[アーティファクトに関するドキュメント]({{ site.baseurl }}/2.0/artifacts/)を参照してください。

| キー          | 必須 | 型   | 説明                                                                         |
| ----------- | -- | --- | -------------------------------------------------------------------------- |
| path        | Y  | 文字列 | ジョブ アーティファクトとして保存するプライマリ コンテナ内のディレクトリ。                                     |
| destination | N  | 文字列 | アーティファクト API でアーティファクトの保存先パスに追加するプレフィックス (デフォルトは `path` で指定したファイルのディレクトリ)。 |
{: class="table table-striped"}

1 つのジョブに複数の `store_artifacts` ステップを記述できます。 各ステップで一意のプレフィックスを使用すると、ファイルの上書きを防止できます。

###### 例
{: #example }

``` YAML
- run:
    name: Jekyll サイトのビルド
    command: bundle exec jekyll build --source jekyll --destination jekyll/_site/docs/
- store_artifacts:
    path: jekyll/_site/docs/
    destination: circleci-docs
```

##### **`store_test_results`**
{: #storetestresults }

ビルドのテスト結果をアップロードおよび保存するための特別なステップです。 テスト結果は、CircleCI Web アプリケーションで各ビルドの「テスト サマリー」セクションに表示されます。 テスト結果を保存すると、テスト スイートのタイミング分析に役立ちます。

テスト結果をビルド アーティファクトとして保存することもできます。 その方法については [**store_artifacts** ステップ](#store_artifacts)を参照してください。

| キー   | 必須 | 型   | 説明                                                                                                                                                         |
| ---- | -- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path | Y  | 文字列 | Path (absolute, or relative to your `working_directory`) to directory containing JUnit XML or Cucumber JSON test metadata files, or to a single test file. |
{: class="table table-striped"}

###### _例_
{: #example }

Directory structure:

```
test-results
├── jest
│   └── results.xml
├── mocha
│   └── results.xml
└── rspec
    └── results.xml
```

`config.yml` syntax:

``` YAML
- store_test_results:
    path: test-results
```

##### **`persist_to_workspace`**
{: #persisttoworkspace }

Special step used to persist a temporary file to be used by another job in the workflow.

**Note:** Workspaces are stored for up to 15 days after being created. All jobs that try to use a Workspace older than 15 days, including partial reruns of a Workflow and SSH reruns of individual jobs, will fail.

| Key   | Required | Type   | Description                                                                                                                                                                       |
| ----- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| root  | Y        | String | Either an absolute path or a path relative to `working_directory`                                                                                                                 |
| paths | Y        | List   | Glob identifying file(s), or a non-glob path to a directory to add to the shared workspace. Interpreted as relative to the workspace root. Must not be the workspace root itself. |
{: class="table table-striped"}

The root key is a directory on the container which is taken to be the root directory of the workspace. The paths values are all relative to the root.

##### _root キーの例_
{: #example-for-root-key }

For example, the following step syntax persists the specified paths from `/tmp/dir` into the workspace, relative to the directory `/tmp/dir`.

``` YAML
- persist_to_workspace:
    root: /tmp/dir
    paths:
      - foo/bar
      - baz
```

After this step completes, the following directories are added to the workspace:

```
/tmp/dir/foo/bar
/tmp/dir/baz
```

###### _paths キーの例_
{: #example-for-paths-key }

``` YAML
- persist_to_workspace:
    root: /tmp/workspace
    paths:
      - target/application.jar
      - build/*
```

The `paths` list uses `Glob` from Go, and the pattern matches [filepath.Match](https://golang.org/pkg/path/filepath/#Match).

```
pattern:
        { term }
term:
        '*'         区切り文字を除く任意の文字シーケンスに一致します
        '?' 区切り文字を除く任意の 1 文字に一致します
        '[' [ '^' ] { character-range } ']'
                    文字クラス (空白は不可)
        c           文字 c に一致します ('*'、'?'、'\\'、'[' 以外)
        '\\' c      文字 c に一致します
character-range:
        c           文字 c に一致します ('\\'、'-'、']' 以外)
        '\\' c      文字 c に一致します
        lo '-' hi   lo <= c <= hi の範囲にある文字 c に一致します
```

The Go documentation states that the pattern may describe hierarchical names such as `/usr/*/bin/ed` (assuming the Separator is '/'). **Note:** Everything must be relative to the work space root directory.

##### **`attach_workspace`**
{: #attachworkspace }

Special step used to attach the workflow's workspace to the current container. The full contents of the workspace are downloaded and copied into the directory the workspace is being attached at.

| Key | Required | Type   | Description                           |
| --- | -------- | ------ | ------------------------------------- |
| at  | Y        | String | Directory to attach the workspace to. |
{: class="table table-striped"}

###### _例_
{: #example }

``` YAML
- attach_workspace:
    at: /tmp/workspace
```

Each workflow has a temporary workspace associated with it. The workspace can be used to pass along unique data built during a job to other jobs in the same workflow. Jobs can add files into the workspace using the `persist_to_workspace` step and download the workspace content into their file system using the `attach_workspace` step. The workspace is additive only, jobs may add files to the workspace but cannot delete files from the workspace. Each job can only see content added to the workspace by the jobs that are upstream of it. When attaching a workspace the "layer" from each upstream job is applied in the order the upstream jobs appear in the workflow graph. When two jobs run concurrently the order in which their layers are applied is undefined. If multiple concurrent jobs persist the same filename then attaching the workspace will error.

If a workflow is re-run it inherits the same workspace as the original workflow. When re-running failed jobs only the re-run jobs will see the same workspace content as the jobs in the original workflow.

Note the following distinctions between Artifacts, Workspaces, and Caches:

| Type       | lifetime                             | Use                                                                                     | Example                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Artifacts  | 1 Month                              | Preserve long-term artifacts.                                                           | Available in the Artifacts tab of the **Job page** under the `tmp/circle-artifacts.<hash>/container`   or similar directory.                                                                                                           |
| Workspaces | Duration of workflow (up to 15 days) | Attach the workspace in a downstream container with the `attach_workspace:` step.       | The `attach_workspace` copies and re-creates the entire workspace content when it runs.                                                                                                                                                      |
| Caches     | 15 Days                              | Store non-vital data that may help the job run faster, for example npm or Gem packages. | The `save_cache` job step with a `path` to a list of directories to add and a `key` to uniquely identify the cache (for example, the branch, build number, or revision).   Restore the cache with `restore_cache` and the appropriate `key`. |
{: class="table table-striped"}

Refer to the [Persisting Data in Workflows: When to Use Caching, Artifacts, and Workspaces](https://circleci.com/blog/persisting-data-in-workflows-when-to-use-caching-artifacts-and-workspaces/) for additional conceptual information about using workspaces, caching, and artifacts.

##### **`add_ssh_keys`**
{: #addsshkeys }

Special step that adds SSH keys from a project's settings to a container. Also configures SSH to use these keys.

| Key          | Required | Type | Description                                                                          |
| ------------ | -------- | ---- | ------------------------------------------------------------------------------------ |
| fingerprints | N        | List | List of fingerprints corresponding to the keys to be added (default: all keys added) |
{: class="table table-striped"}

```yaml
steps:
  - add_ssh_keys:
      fingerprints:
        - "b7:35:a6:4e:9b:0d:6d:d4:78:1e:9a:97:2a:66:6b:be"
```

**Note:** Even though CircleCI uses `ssh-agent` to sign all added SSH keys, you **must** use the `add_ssh_keys` key to actually add keys to a container.

##### `pipeline.` 値の使用
{: #using-pipeline-values }

Pipeline values are available to all pipeline configurations and can be used without previous declaration. The pipeline values available are as follows:

| Value                      | Description                                        |
| -------------------------- | -------------------------------------------------- |
| pipeline.id                | A globally unique id representing for the pipeline |
| pipeline.number            | A project unique integer id for the pipeline       |
| pipeline.project.git_url   | E.g. https://github.com/circleci/circleci-docs     |
| pipeline.project.type      | E.g. "github"                                      |
| pipeline.git.tag           | The tag triggering the pipeline                    |
| pipeline.git.branch        | The branch triggering the pipeline                 |
| pipeline.git.revision      | The current git revision                           |
| pipeline.git.base_revision | The previous git revision                          |
{: class="table table-striped"}

For example:

```yaml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:latest
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # コンテキスト/UI 環境変数の参照
    environment:
      IMAGETAG: latest
    working_directory: ~/main
    steps:
      - run: echo "This is pipeline ID << pipeline.id >>"
```

#### **`circleci_ip_ranges`**
{: #circleciipranges }

Enables jobs to go through a set of well-defined IP address ranges. See [IP ranges]({{ site.baseurl }}/2.0/ip-ranges/) for details.

###### _例_
{: #example }

```yaml
version: 2.1

jobs:
  bar:
    machine: true
    steps:
      - checkout
      - run:
          command: echo "building"
      - run:
          command: echo "testing"

workflows:
  build:
    jobs:
      - bar:
          pre-steps: # bar ジョブで定義されているステップの前に実行するステップ
            - run:
                command: echo "install custom dependency"
          post-steps: # bar ジョブで定義されているステップの後に実行するステップ
            - run:
                command: echo "upload artifact to s3"
```

**Notes**:

- `only` を指定した場合、一致するブランチでジョブが実行されます。
- IP ranges is currently in open preview for paid accounts. Specific rates and details are being finalized and will be published when the feature is generally available.

## **`workflows`**
{: #workflows }
Used for orchestrating all jobs. Each workflow consists of the workflow name as a key and a map as a value. A name should be unique within the current `config.yml`. The top-level keys for the Workflows configuration are `version` and `jobs`.

### **`version`**
{: #version }
The Workflows `version` field is used to issue warnings for deprecation or breaking changes during Beta.

| Key     | Required | Type   | Description             |
| ------- | -------- | ------ | ----------------------- |
| version | Y        | String | Should currently be `2` |
{: class="table table-striped"}

### **<`workflow_name`>**
{: #lessworkflownamegreater }

A unique name for your workflow.

#### **`triggers`**
{: #triggers }
Specifies which triggers will cause this workflow to be executed. Default behavior is to trigger the workflow when pushing to a branch.

| Key      | Required | Type  | Description                     |
| -------- | -------- | ----- | ------------------------------- |
| triggers | N        | Array | Should currently be `schedule`. |
{: class="table table-striped"}

##### **`schedule`**
{: #schedule }
A workflow may have a `schedule` indicating it runs at a certain time, for example a nightly build that runs every day at 12am UTC:

```
workflows:
   version: 2
   nightly:
     triggers:
       - schedule:
           cron: "0 0 * * *"
           filters:
             branches:
               only:
                 - master
                 - beta
     jobs:
       - test
```
###### **`cron`**
{: #cron }
The `cron` key is defined using POSIX `crontab` syntax.

| Key  | Required | Type   | Description                                                                                |
| ---- | -------- | ------ | ------------------------------------------------------------------------------------------ |
| cron | Y        | String | See the [crontab man page](http://pubs.opengroup.org/onlinepubs/7908799/xcu/crontab.html). |
{: class="table table-striped"}

###### **`filters`**
{: #filters }
Trigger Filters can have the key `branches`.

| Key     | Required | Type | Description                                             |
| ------- | -------- | ---- | ------------------------------------------------------- |
| filters | Y        | Map  | A map defining rules for execution on specific branches |
{: class="table table-striped"}

###### **`branches`**
{: #branches }
{:.no_toc}

The `branches` key controls whether the *current* branch should have a schedule trigger created for it, where *current* branch is the branch containing the `config.yml` file with the `trigger` stanza. That is, a push on the `master` branch will only schedule a [workflow]({{ site.baseurl }}/2.0/workflows/#using-contexts-and-filtering-in-your-workflows) for the `master` branch.

Branches can have the keys `only` and `ignore` which either map to a single string naming a branch. You may also use regular expressions to match against branches by enclosing them with `/`'s, or map to a list of such strings. Regular expressions must match the **entire** string.

- `only` を指定した場合、一致するブランチでジョブが実行されます。
- `ignore` を指定した場合、一致するブランチではジョブは実行されません。
- `only` と `ignore` のいずれも指定していない場合、すべてのブランチでジョブが実行されます。
- If both `only` and `ignore` are specified the `only` is considered before `ignore`.

| Key      | Required | Type                       | Description                                                      |
| -------- | -------- | -------------------------- | ---------------------------------------------------------------- |
| branches | Y        | Map                        | A map defining rules for execution on specific branches          |
| only     | Y        | String, or List of Strings | Either a single branch specifier, or a list of branch specifiers |
| ignore   | N        | String, or List of Strings | Either a single branch specifier, or a list of branch specifiers |
{: class="table table-striped"}

#### **`jobs`**
{: #jobs-in-workflow }
A job can have the keys `requires`, `context`, `type`, and `filters`.

| Key  | Required | Type | Description                                   |
| ---- | -------- | ---- | --------------------------------------------- |
| jobs | Y        | List | A list of jobs to run with their dependencies |
{: class="table table-striped"}

##### **<`job_name`>**
{: #lessjobnamegreater }

A job name that exists in your `config.yml`.

###### **`requires`**
{: #requires }
Jobs are run in parallel by default, so you must explicitly require any dependencies by their job name.

| Key      | Required | Type   | Description                                                                                                                                                                                                                                                                                                                                                                     |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| requires | N        | List   | A list of jobs that must succeed for the job to start. Note: When jobs in the current workflow that are listed as dependencies are not executed (due to a filter function for example), their requirement as a dependency for other jobs will be ignored by the requires option. However, if all dependencies of a job are filtered, then that job will not be executed either. |
| name     | N        | String | A replacement for the job name. Useful when calling a job multiple times. If you want to invoke the same job multiple times and a job requires one of the duplicate jobs, this is required. (2.1 only)                                                                                                                                                                          |
{: class="table table-striped"}

###### **`context`**
{: #context }
Jobs may be configured to use global environment variables set for an organization, see the [Contexts]({{ site.baseurl }}/2.0/contexts) document for adding a context in the application settings.

| Key     | Required | Type        | Description                                                                                                                                                                                                                                                    |
| ------- | -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| context | N        | String/List | The name of the context(s). The initial default name is `org-global`. Each context name must be unique. If using CircleCI Server, only a single Context per workflow is supported. **Note:** A maximum of 100 unique contexts across all workflows is allowed. |
{: class="table table-striped"}

###### **`type`**
{: #type }
A job may have a `type` of `approval` indicating it must be manually approved before downstream jobs may proceed. Jobs run in the dependency order until the workflow processes a job with the `type: approval` key followed by a job on which it depends, for example:

```
      - hold:
          type: approval
          requires:
            - test1
            - test2
      - deploy:
          requires:
            - hold
```
**Note:** The `hold` job name must not exist in the main configuration.

###### **`filters`**
{: #jobfilters }
Job Filters can have the key `branches` or `tags`. **Note** Workflows will ignore job-level branching. If you use job-level branching and later add workflows, you must remove the branching at the job level and instead declare it in the workflows section of your `config.yml`, as follows:

| Key     | Required | Type | Description                                             |
| ------- | -------- | ---- | ------------------------------------------------------- |
| filters | N        | Map  | A map defining rules for execution on specific branches |
{: class="table table-striped"}

The following is an example of how the CircleCI documentation uses a regex to filter running a workflow for building PDF documentation:

```yaml
# ...
workflows:
  build-deploy:
    jobs:
      - js_build
      - build_server_pdfs: # << ブランチ名フィルターに応じて実行されるジョブ
          filters:
            branches:
              only: /server\/.*/
          filters:
            branches:
              only: /server\/.*/
```

The above snippet causes the job  `build_server_pdfs` to only be run when the branch being built starts with "server/" in it.

You can read more about using regex in your config in the [Workflows document]({{ site.baseurl }}/2.0/workflows/#using-regular-expressions-to-filter-tags-and-branches).

###### **`branches`**
{: #branches }
{:.no_toc}
Branches can have the keys `only` and `ignore` which either map to a single string naming a branch. You may also use regular expressions to match against branches by enclosing them with slashes, or map to a list of such strings. Regular expressions must match the **entire** string.

- `only` を指定した場合、一致するタグの場合にジョブが実行されます。
- `ignore` を指定した場合、一致するタグの場合にはジョブは実行されません。
- `only` と `ignore` のどちらも指定していない場合、すべてのタグのジョブがスキップされます。
- If both `only` and `ignore` are specified the `only` is considered before `ignore`.

| Key      | Required | Type                       | Description                                                      |
| -------- | -------- | -------------------------- | ---------------------------------------------------------------- |
| branches | N        | Map                        | A map defining rules for execution on specific branches          |
| only     | N        | String, or List of Strings | Either a single branch specifier, or a list of branch specifiers |
| ignore   | N        | String, or List of Strings | Either a single branch specifier, or a list of branch specifiers |
{: class="table table-striped"}

###### **`tags`**
{: #tags }
{:.no_toc}

CircleCI does not run workflows for tags unless you explicitly specify tag filters. Additionally, if a job requires any other jobs (directly or indirectly), you must specify tag filters for those jobs.

Tags can have the keys `only` and `ignore` keys. You may also use regular expressions to match against tags by enclosing them with slashes, or map to a list of such strings. Regular expressions must match the **entire** string. Both lightweight and annotated tags are supported.

- `only` と `ignore` のいずれも指定していない場合、すべてのブランチでジョブが実行されます。
- `ignore` を指定した場合、一致するブランチではジョブは実行されません。
- `only` と `ignore` の両方を指定した場合、`ignore` よりも `only` が先に処理されます。
- If both `only` and `ignore` are specified the `only` is considered before `ignore`.

| Key    | Required | Type                       | Description                                                |
| ------ | -------- | -------------------------- | ---------------------------------------------------------- |
| tags   | N        | Map                        | A map defining rules for execution on specific tags        |
| only   | N        | String, or List of Strings | Either a single tag specifier, or a list of tag specifiers |
| ignore | N        | String, or List of Strings | Either a single tag specifier, or a list of tag specifiers |
{: class="table table-striped"}

For more information, see the [Executing Workflows For a Git Tag]({{ site.baseurl }}/2.0/workflows/#executing-workflows-for-a-git-tag) section of the Workflows document.

###### マトリックスから一部のパラメーターを除外する
{: #matrix-requires-version-21 }
The `matrix` stanza allows you to run a parameterized job multiple times with different arguments.

**Note**

In order to use the `matrix` stanza, you must use parameterized jobs.

| Key        | Required | Type   | Description                                                                                                          |
| ---------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| parameters | Y        | Map    | A map of parameter names to every value the job should be called with                                                |
| exclude    | N        | List   | A list of argument maps that should be excluded from the matrix                                                      |
| alias      | N        | String | An alias for the matrix, usable from another job's `requires` stanza. Defaults to the name of the job being executed |
{: class="table table-striped"}

**Note:**

The following is a basic example of using matrix jobs.

```yaml
workflows:
  workflow:
    jobs:
      - build:
          matrix:
            parameters:
              version: ["0.1", "0.2", "0.3"]
              platform: ["macos", "windows", "linux"]
```

This expands to 9 different `build` jobs, and could be equivalently written as:

```yaml
workflows:
  workflow:
    jobs:
      - build:
          name: build-macos-0.1
          version: 0.1
          platform: macos
      - build:
          name: build-macos-0.2
          version: 0.2
          platform: macos
      - build:
          name: build-macos-0.3
          version: 0.3
          platform: macos
      - build:
          name: build-windows-0.1
          version: 0.1
          platform: windows
      - ...
```

###### 依存関係とマトリックス ジョブ
{: #excluding-sets-of-parameters-from-a-matrix }
{:.no_toc}
Sometimes you may wish to run a job with every combination of arguments _except_ some value or values. You can use an `exclude` stanza to achieve this:

```yaml
workflows:
  workflow:
    jobs:
      - build:
          matrix:
            parameters:
              a: [1, 2, 3]
              b: [4, 5, 6]
            exclude:
              - a: 3
                b: 5
```

The matrix above would expand into 8 jobs: every combination of the parameters `a` and `b`, excluding `{a: 3, b: 5}`

###### 依存関係とマトリックスジョブ
{: #dependencies-and-matrix-jobs }
{:.no_toc}

To `require` an entire matrix (every job within the matrix), use its `alias`. The `alias` defaults to the name of the job being invoked.

```yaml
workflows:
  workflow:
    jobs:
      - deploy:
          matrix:
            parameters:
              version: ["0.1", "0.2"]
      - another-job:
          requires:
            - deploy
```

This means that `another-job` will require both deploy jobs in the matrix to finish before it runs.

Additionally, matrix jobs expose their parameter values via `<< matrix.* >>` which can be used to generate more complex workflows. For example, here is a `deploy` matrix where each job waits for its respective `build` job in another matrix.

```yaml
workflows:
  workflow:
    jobs:
      - build:
          name: build-v<< matrix.version >>
          matrix:
            parameters:
              version: ["0.1", "0.2"]
      - deploy:
          name: deploy-v<< matrix.version >>
          matrix:
            parameters:
              version: ["0.1", "0.2"]
          requires:
            - build-v<< matrix.version >>
```

This workflow will expand to:

```yaml
workflows:
  workflow:
    jobs:
      - build:
          name: build-v0.1
          version: 0.1
      - build:
          name: build-v0.2
          version: 0.2
      - deploy:
          name: deploy-v0.1
          version: 0.1
          requires:
            - build-v0.1
      - deploy:
          name: deploy-v0.2
          version: 0.2
          requires:
            - build-v0.2
```

###### **`pre-steps`** and **`post-steps`** (requires version: 2.1)
{: #pre-steps-and-post-steps-requires-version-21 }
Every job invocation in a workflow may optionally accept two special arguments: `pre-steps` and `post-steps`.

Steps under `pre-steps` are executed before any of the other steps in the job. The steps under `post-steps` are executed after all of the other steps.

Pre and post steps allow you to execute steps in a given job without modifying the job. This is useful, for example, to run custom setup steps before job execution.

```yaml
version: 2.1

jobs:
  bar:
    machine:
      image: ubuntu-2004:202107-02
    steps:
      - checkout
      - run:
          command: echo "building"
      - run:
          command: echo "testing"

workflows:
  build:
    jobs:
      - bar:
          pre-steps: # steps to run before steps defined in the job bar
            - run:
                command: echo "install custom dependency"
          post-steps: # steps to run after steps defined in the job bar
            - run:
                command: echo "upload artifact to s3"
```

##### **ワークフローでの `when` の使用**
{: #using-when-in-workflows }

With CircleCI v2.1 configuration, you may use a `when` clause (the inverse clause `unless` is also supported) under a workflow declaration with a [logic statement](https://circleci.com/docs/2.0/configuration-reference/#logic-statements) to determine whether or not to run that workflow.

The example configuration below uses a pipeline parameter, `run_integration_tests` to drive the `integration_tests` workflow.

```yaml
version: 2.1

parameters:
  run_integration_tests:
    type: boolean
    default: false

workflows:
  integration_tests:
    when: << pipeline.parameters.run_integration_tests >>
    jobs:
      - mytestjob

jobs:
...
```

This example prevents the workflow `integration_tests` from running unless the tests are invoked explicitly when the pipeline is triggered with the following in the `POST` body:

```sh
{
    "parameters": {
        "run_integration_tests": true
    }
}
```

Refer to the [Orchestrating Workflows]({{ site.baseurl }}/2.0/workflows) document for more examples and conceptual information.

## ロジック ステートメント
{: #logic-statements }

Certain dynamic configuration features accept logic statements as arguments. Logic statements are evaluated to boolean values at configuration compilation time, that is - before the workflow is run. The group of logic statements includes:

| Type                                                                                                | Arguments             | `true` if                              | Example                                                                  |
|-----------------------------------------------------------------------------------------------------+-----------------------+----------------------------------------+--------------------------------------------------------------------------|
| YAML literal                                                                                        | None                  | is truthy                              | `true`/`42`/`"a string"`                                                 |
| YAML alias                                                                                          | None                  | resolves to a truthy value             | *my-alias                                                                |
| [Pipeline Value]({{site.baseurl}}/2.0/pipeline-variables/#pipeline-values)                          | None                  | resolves to a truthy value             | `<< pipeline.git.branch >>`                                              |
| [Pipeline Parameter]({{site.baseurl}}/2.0/pipeline-variables/#pipeline-parameters-in-configuration) | None                  | resolves to a truthy value             | `<< pipeline.parameters.my-parameter >>`                                 |
| and                                                                                                 | N logic statements    | all arguments are truthy               | `and: [ true, true, false ]`                                             |
| or                                                                                                  | N logic statements    | any argument is truthy                 | `or: [ false, true, false ]`                                             |
| not                                                                                                 | 1 logic statement     | the argument is not truthy             | `not: true`                                                              |
| equal                                                                                               | N values              | all arguments evaluate to equal values | `equal: [ 42, << pipeline.number >>]`                                    |
| matches                                                                                             | `pattern` and `value` | `value` matches the `pattern`          | `matches: { pattern: "^feature-.+$", value: << pipeline.git.branch >> }` |
{: class="table table-striped"}

The following logic values are considered falsy:

- false
- null
- 0
- NaN
- 空の文字列 ("")
- 引数を持たないステートメント

All other values are truthy. Further, Please also note that using logic with an empty list will cause a validation error.

Logic statements always evaluate to a boolean value at the top level, and coerce as necessary. They can be nested in an arbitrary fashion, according to their argument specifications, and to a maximum depth of 100 levels.

`matches` uses [Java regular expressions](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) for its `pattern`. A full match pattern must be provided, prefix matching is not an option. Though, it is recommended to enclose a pattern in `^` and `$` to avoid accidental partial matches.

**Note:** When using logic statements at the workflow level, do not include the `condition:` key (the `condition` key is only needed for `job` level logic statements).

### ロジック ステートメントの例
{: #logic-statement-examples }

```yaml
workflows:
  my-workflow:
      when:
        or:
          - equal: [ master, << pipeline.git.branch >> ]
          - equal: [ staging, << pipeline.git.branch >> ]
```

```yaml
workflows:
  my-workflow:
    when:
      and:
        - not:
            matches:
              pattern: "^master$"
              value: << pipeline.git.branch >>
        - or:
            - equal: [ canary, << pipeline.git.tag >> ]
            - << pipeline.parameters.deploy-canary >>
```

```yaml
version: 2.1

executors:
  linux-13:
    docker:
      - image: cimg/node:13.13
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference
  macos: &macos-executor
    macos:
      xcode: 11.4

jobs:
  test:
    parameters:
      os:
        type: executor
      node-version:
        type: string
    executor: << parameters.os >>
    steps:
      - checkout
      - when:
          condition:
            equal: [ *macos-executor, << parameters.os >> ]
          steps:
            - run: echo << parameters.node-version >>
      - run: echo 0

workflows:
  all-tests:
    jobs:
      - test:
          os: macos
          node-version: "13.13.0"
```

## 完全版設定ファイル サンプル
{: #example-full-configuration }

{% raw %}
```yaml
version: 2
jobs:
  build:
    docker:
      - image: ubuntu:14.04
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference

      - image: mongo:2.6.8
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference
        command: [mongod, --smallfiles]

      - image: postgres:9.4.1
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference
        # some containers require setting environment variables
        environment:
          POSTGRES_USER: root

      - image: redis@sha256:54057dd7e125ca41afe526a877e8bd35ec2cdd33b9217e022ed37bdcf7d09673
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference

      - image: rabbitmq:3.5.4
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference

    environment:
      TEST_REPORTS: /tmp/test-reports

    working_directory: ~/my-project

    steps:
      - checkout

      - run:
          command: echo 127.0.0.1 devhost | sudo tee -a /etc/hosts

      # Create Postgres users and database
      # Note the YAML heredoc '|' for nicer formatting
      - run: |
          sudo -u root createuser -h localhost --superuser ubuntu &&
          sudo createdb -h localhost test_db

      - restore_cache:
          keys:
            - v1-my-project-{{ checksum "project.clj" }}
            - v1-my-project-

      - run:
          environment:
            SSH_TARGET: "localhost"
            TEST_ENV: "linux"
          command: |
            set -xu
            mkdir -p ${TEST_REPORTS}
            run-tests.sh
            cp out/tests/*.xml ${TEST_REPORTS}

      - run: |
          set -xu
          mkdir -p /tmp/artifacts
          create_jars.sh ${CIRCLE_BUILD_NUM}
          cp *.jar /tmp/artifacts

      - save_cache:
          key: v1-my-project-{{ checksum "project.clj" }}
          paths:
            - ~/.m2

      # Save artifacts
      - store_artifacts:
          path: /tmp/artifacts
          destination: build

      # Upload test results
      - store_test_results:
          path: /tmp/test-reports

  deploy-stage:
    docker:
      - image: ubuntu:14.04
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference
    working_directory: /tmp/my-project
    steps:
      - run:
          name: Deploy if tests pass and branch is Staging
          command: ansible-playbook site.yml -i staging

  deploy-prod:
    docker:
      - image: ubuntu:14.04
        auth:
          username: mydockerhub-user
          password: $DOCKERHUB_PASSWORD  # context / project UI env-var reference
    working_directory: /tmp/my-project
    steps:
      - run:
          name: Deploy if tests pass and branch is Master
          command: ansible-playbook site.yml -i production

workflows:
  version: 2
  build-deploy:
    jobs:
      - build:
          filters:
            branches:
              ignore:
                - develop
                - /feature-.*/
      - deploy-stage:
          requires:
            - build
          filters:
            branches:
              only: staging
      - deploy-prod:
          requires:
            - build
          filters:
            branches:
              only: master
```
{% endraw %}

## 関連項目
{: #see-also }
{:.no_toc}

[Config Introduction]({{site.baseurl}}/ja/2.0/config-intro/)

<div align="center">
  <h1>ssr-contributions-img</h1>
  <p>GitHub のコントリビューション履歴を、README、プロフィールページ、ウィジェットに埋め込める SVG チャートとして描画します。</p>
  <p>
    <a href="./README.md">简体中文</a>
    ·
    <a href="./README-EN.md">English</a>
    ·
    <strong>日本語</strong>
  </p>
  <p>
    <a href="https://ssr-contributions-img.zhouhaoyiu.workers.dev/health">公開サービス</a>
    ·
    <a href="#クイックスタート">クイックスタート</a>
    ·
    <a href="#設定項目">設定項目</a>
    ·
    <a href="#ローカル実行">ローカル実行</a>
  </p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=42&amp;animation=wave&amp;theme=prism_break&amp;dark=true&amp;gradient=true&amp;legend=true&amp;legendPosition=bottom&amp;legendDirection=row">
    <source media="(prefers-color-scheme: light)" srcset="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=42&amp;animation=wave&amp;theme=prism_break&amp;dark=false&amp;gradient=true&amp;legend=true&amp;legendPosition=bottom&amp;legendDirection=row">
    <img alt="zhouhaoyiu の GitHub コントリビューション 3D チャート" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=42&amp;animation=wave&amp;theme=prism_break&amp;dark=false&amp;gradient=true&amp;legend=true&amp;legendPosition=bottom&amp;legendDirection=row" width="100%">
  </picture>
</div>

## 機能

- `calendar` と `3dbar` の 2 種類のチャート
- 53 種類のプリセットテーマとカスタム 16 進カラーパレット
- `fall`、`raise`、`wave`、`mess`、`spin`、`fadeIn` の 6 種類の SVG アニメーション
- 3D バーのグラデーション、凡例、枠線、ライティング、間隔、フラット表示
- SVG 画像を返す Cloudflare Worker
- `svg`、`xml`、`html`、`png`、`jpeg` に対応する Nest API
- プレビュー、設定変更、SVG ダウンロード、リンクコピーができる Vue Playground

## クイックスタート

Worker URL：

```text
https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/{username}?{queryString}
```

最小構成：

```text
https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&format=svg
```

GitHub README に埋め込む場合：

```md
![GitHub contributions](https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&format=svg&weeks=42&theme=prism_break&gradient=true&legend=true&legendPosition=bottom&legendDirection=row)
```

URL 内の `zhouhaoyiu` を別の GitHub ユーザー名に置き換えて使います。Worker のキャッシュは 5 分です。GitHub の画像プロキシ側では、さらに長くキャッシュされることがあります。

## Playground

Vue Playground では、チャートのプレビュー、テーマ切り替え、パラメータ調整、SVG ダウンロード、リンクコピーができます。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/screenshots/playground-en-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="./assets/screenshots/playground-en-light.gif">
  <img alt="Vue Playground の General、3D Bar、Animation 設定画面" src="./assets/screenshots/playground-en-light.gif" width="100%">
</picture>

## 表示例

### GitHub 形式のカレンダー

```text
https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=calendar&format=svg&weeks=50&theme=native
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=calendar&amp;format=svg&amp;weeks=50&amp;theme=native&amp;dark=true">
  <source media="(prefers-color-scheme: light)" srcset="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=calendar&amp;format=svg&amp;weeks=50&amp;theme=native&amp;dark=false">
  <img alt="zhouhaoyiu の GitHub 形式コントリビューションカレンダー" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=calendar&amp;format=svg&amp;weeks=50&amp;theme=native&amp;dark=false" width="100%">
</picture>

### アニメーションと凡例付きの 3D バー

```text
https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&format=svg&weeks=42&theme=prism_break&gradient=true&strokeWidth=1&legend=true&legendPosition=bottom&legendDirection=row&animation=wave
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=42&amp;theme=prism_break&amp;gradient=true&amp;strokeWidth=1&amp;legend=true&amp;legendPosition=bottom&amp;legendDirection=row&amp;animation=wave&amp;dark=true">
  <source media="(prefers-color-scheme: light)" srcset="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=42&amp;theme=prism_break&amp;gradient=true&amp;strokeWidth=1&amp;legend=true&amp;legendPosition=bottom&amp;legendDirection=row&amp;animation=wave&amp;dark=false">
  <img alt="zhouhaoyiu のアニメーション付き 3D コントリビューションチャート" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=42&amp;theme=prism_break&amp;gradient=true&amp;strokeWidth=1&amp;legend=true&amp;legendPosition=bottom&amp;legendDirection=row&amp;animation=wave&amp;dark=false" width="100%">
</picture>

### カスタムパレット

`colors` を指定すると `theme` より優先されます。`#` を省き、各色をカンマで区切ります。

```text
https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&format=svg&weeks=36&colors=0b132b,1c2541,3a506b,5bc0be,6fffe9&gradient=true
```

### アニメーション例

<table>
  <tr>
    <th><code>fall</code></th>
    <th><code>raise</code></th>
    <th><code>wave</code></th>
  </tr>
  <tr>
    <td><img alt="fall アニメーション" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=20&amp;flatten=1&amp;theme=prism_break&amp;gradient=true&amp;animation=fall" width="300"></td>
    <td><img alt="raise アニメーション" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=20&amp;flatten=1&amp;theme=prism_break&amp;gradient=true&amp;animation=raise" width="300"></td>
    <td><img alt="wave アニメーション" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=20&amp;flatten=1&amp;theme=prism_break&amp;gradient=true&amp;animation=wave" width="300"></td>
  </tr>
</table>

### 2 種類のフラット表示

<table>
  <tr>
    <th><code>flatten=1</code></th>
    <th><code>flatten=2</code></th>
  </tr>
  <tr>
    <td><img alt="すべてのキューブを平面化" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=30&amp;flatten=1&amp;theme=native" width="440"></td>
    <td><img alt="空のキューブを省いたフラット表示" src="https://ssr-contributions-img.zhouhaoyiu.workers.dev/_/zhouhaoyiu?chart=3dbar&amp;format=svg&amp;weeks=30&amp;flatten=2&amp;theme=native" width="440"></td>
  </tr>
</table>

## 実行方式

| 項目 | Cloudflare Worker | Nest API |
| --- | --- | --- |
| 用途 | GitHub README、プロフィールページ、公開画像 URL | Playground、フル API、セルフホスト |
| チャートルート | `/_/:username`、`/svg/:username` | `/_/:username`、`/svg/:username` |
| 出力形式 | SVG のみ | `svg`、`xml`、`html`、`png`、`jpeg` |
| その他のルート | `/health` | `/themes`、`/config`、`/contributions/:username` |
| アドレス | `ssr-contributions-img.zhouhaoyiu.workers.dev` | ローカルまたはセルフホスト |

Worker は GitHub の公開コントリビューションページを読み込みます。Nest API も同じデータ取得を優先し、`GITHUB_PAT` が設定されている場合は GraphQL にフォールバックできます。

## 設定項目

オプションは URL のクエリ文字列で指定します。真偽値は `true` または `false` です。16 進カラーは、URL のフラグメント記号と衝突しないように `#` を省いてください。

クエリパラメータは 3 グループ、合計 28 項目です。

| グループ | 数 | パラメータ |
| --- | ---: | --- |
| 共通 | 9 | `chart`、`theme`、`colors`、`dark`、`widget_size`、`weeks`、`tz`、`format`、`quality` |
| 3D バー | 11 | `gap`、`scale`、`light`、`gradient`、`flatten`、`legend`、`legendPosition`、`legendDirection`、`foregroundColor`、`strokeWidth`、`strokeColor` |
| アニメーション | 8 | `animation`、`animation_duration`、`animation_delay`、`animation_amplitude`、`animation_frequency`、`animation_wave_center`、`animation_loop`、`animation_reverse` |

`tz` は URL で直接指定します。`animation_loop` と `animation_reverse` は対応するアニメーションを選んだときだけ表示されるため、Playground に 28 項目が同時に並ぶことはありません。

### 共通オプション

| パラメータ | 値 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `chart` | `calendar`、`3dbar` | Worker: `3dbar`、Nest: `calendar` | チャート形式 |
| `theme` | プリセット名、`random` | `green` | `random` は描画ごとにパレットを選択 |
| `colors` | カンマ区切りの 16 進カラー | 未指定 | カスタムパレット。`theme` より優先 |
| `dark` | `true`、`false` | `false` | テーマのダーク版を使用 |
| `widget_size` | `small`、`medium`、`large` | `medium` | それぞれ 7、16、40 週を選択 |
| `weeks` | `1` から `50` | `widget_size` から決定 | 週数を指定し、`widget_size` を上書き |
| `tz` | `Asia/Shanghai` などの IANA タイムゾーン | `Asia/Shanghai` | 現在の日付計算に使うタイムゾーン |
| `format` | `svg`、`xml`、`html`、`png`、`jpeg` | Nest: `html` | Worker は常に SVG。その他の形式は Nest API のみ |
| `quality` | `0.1` から `10` | `1` | PNG/JPEG の出力倍率 |

### 3D バーオプション

以下は `chart=3dbar` のときだけ有効です。

| パラメータ | 値 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `gap` | `0` から `20` | `1.2` | キューブ間の余白 |
| `scale` | `1` 以上 | `2` | アイソメトリック表示の傾き。Playground の上限は 100 |
| `light` | `1` から `60` | `10` | キューブ各面の明暗差 |
| `gradient` | `true`、`false` | `false` | グラデーション塗りを使用 |
| `flatten` | `0`、`1`、`2` | `0` | `0` は高さを保持、`1` はすべて平面化、`2` は空のキューブを省略 |
| `legend` | `true`、`false` | `false` | コントリビューション範囲の凡例を表示。旧名 `lengend` も使用可能 |
| `legendPosition` | `top`、`right`、`bottom`、`left`、`topRight`、`bottomLeft` | `right` | 凡例の位置 |
| `legendDirection` | `row`、`column` | `column` | 凡例を横または縦に配置 |
| `foregroundColor` | 16 進カラー | 自動 | 凡例文字色。ライト時は `#222`、ダーク時は `#ddd` |
| `strokeWidth` | `0` から `20` | `0` | キューブの枠線幅。`0` で無効 |
| `strokeColor` | 16 進カラー | 自動 | キューブの枠線色。これだけを指定した場合、幅は `1` |

### アニメーションオプション

アニメーションは 3D SVG 出力で使用できます。Nest API は PNG/JPEG 出力時にアニメーションを削除します。

| パラメータ | 値または形式 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `animation` | `fall`、`raise`、`wave`、`mess`、`spin`、`fadeIn`、`none` | 未指定 | アニメーション形式 |
| `animation_duration` | 秒 | アニメーションによる | 1 サイクルの長さ |
| `animation_delay` | 秒 | アニメーションによる | キューブごとの遅延 |
| `animation_amplitude` | ピクセル | `10` | `wave` の上下振幅 |
| `animation_frequency` | `0.01` から `0.5` | `0.05` | `wave` の周波数 |
| `animation_wave_center` | `週インデックス_曜日インデックス`。例：`19_3` | `0_0` | `wave` の起点 |
| `animation_loop` | `true`、`false` | `false` | `mess` または `spin` をループ。`wave` は常にループ |
| `animation_reverse` | `true`、`false` | `false` | `fadeIn` のキューブ順を反転 |

時間を指定しない場合、`fall` と `raise` は 1 秒、`wave`、`mess`、`spin` は 3 秒、`fadeIn` は 0.5 秒です。

### テーマ

53 種類の固定テーマと `random` モードがあります。

<details>
  <summary>テーマ名をすべて表示</summary>

基本テーマ：

```text
green, dark_green, red, purple, blue, yellow, cyan, yellow_wine, pink, sunset, native
```

拡張テーマ：

```text
purple_nebula, blue_orbit, sunset_ember, teal_lagoon, rose_pulse,
amber_forge, emerald_canopy, cyan_depth, indigo_night, mono_slate,
neon_horizon, aurora_drift, lava_surge, frost_byte, acid_rain,
volt_riot, toxic_glitch, plasma_storm, chrome_pulse, cyber_sakura,
obsidian_bloom, desert_mirage, hologram_pop, circuit_bronze, lotus_eclipse,
tropic_burst, deco_nights, supernova_crash, vaporwave_dream, quantum_leap,
dragonfire_scales, halloween_pumpkin, nordic_frost, cosmic_latte, tokyo_night,
autumn_maple, laser_grid, blacklight, prism_break, matrix_rain,
solar_flare, ocean_reactor
```

</details>

Nest API では、全テーマを 1 ページに描画できます。

```text
http://localhost:3000/themes?format=svg
http://localhost:3000/themes?format=svg&dark=true
```

## ローカル実行

必要な環境：Node.js `22.x` または `26.x`、pnpm `11.15.1`。

```shell
pnpm install
```

ターミナル 1 で Nest API を起動します。`PLAYGROUND_ALLOWED_ORIGINS` には Playground を開くブラウザのオリジンを含めてください。含まれていない場合、データ API は `403 Origin not allowed` を返します。

```shell
PLAYGROUND_ALLOWED_ORIGINS=http://localhost:5173 SERVER_PORT=3000 pnpm start:dev
```

ターミナル 2 で Vue Playground を起動します。

```shell
VITE_DEV_SERVER_PROXY_TARGET=http://localhost:3000 pnpm -C playground dev
```

`http://localhost:5173` を開きます。API を直接呼び出す場合：

```text
http://localhost:3000/_/zhouhaoyiu?chart=3dbar&format=svg&weeks=40&theme=prism_break
```

### 環境変数

| 変数 | デフォルト | 説明 |
| --- | --- | --- |
| `SERVER_PORT` | `3000` | Nest API のポート |
| `GITHUB_PAT` | 未指定 | 公開コントリビューションページが利用できない場合の GraphQL フォールバックと診断に使用 |
| `PLAYGROUND_ALLOWED_ORIGINS` | 未指定 | Playground のデータ API を呼び出せるブラウザオリジン。複数指定はカンマ区切り |
| `PLAYGROUND_DATA_RATE_LIMIT_MAX` | `30` | 1 つの IP とユーザー名に対して、1 ウィンドウ内で許可するリクエスト数 |
| `PLAYGROUND_DATA_RATE_LIMIT_WINDOW_MS` | `60000` | レート制限ウィンドウ。単位はミリ秒 |
| `PLAYGROUND_DATA_CACHE_TTL_MS` | `300000` | コントリビューションと描画結果のキャッシュ時間。単位はミリ秒 |

### ビルドとテスト

```shell
pnpm build
pnpm test --runInBand
```

## デプロイ

Cloudflare Worker のエントリーポイントは `worker/index.ts`、設定ファイルは `wrangler.toml` です。ルートパスはリポジトリページへリダイレクトします。

Nest/Vercel のエントリーポイントは `api/index.ts`、設定ファイルは `vercel.json` です。PNG、JPEG、HTML、テーマ一覧、Playground API を使う場合はこちらをデプロイします。

## 謝辞

[CatsJuice/ssr-contributions-img](https://github.com/CatsJuice/ssr-contributions-img) のオープンソース実装を基にしています。3D バーの実装方法は、作者の [Medium 記事](https://medium.com/@catsjuice/fake-3d-bar-chart-with-svg-js-134684bd5100) と [CodePen サンプル](https://codepen.io/catsjuice/pen/MWVqNdQ) にまとめられています。

## ライセンス

[MIT](./LICENSE)

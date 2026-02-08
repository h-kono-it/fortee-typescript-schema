実データで個人情報等を含むので`.gitignore`に実際のjsonファイルは追加済み

## ディレクトリ構成

イベント（カンファレンス）ごとにディレクトリを分けて格納する。

```
sample/
  kinoko-2025/       # きのこ 2025 のサンプルデータ
    proposals.json
    timetable.json
    ...
  <event-slug>/      # 他イベントを追加する場合は同様に
    ...
```
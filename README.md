# React Blog (with SQLite Integration)

日本語: React ブログ（SQLite 連携）

A full-stack blog application built with **React + Bootstrap frontend** and a **Node.js/Express backend** using **SQLite** for data storage.  
日本語: React と Bootstrap によるフロントエンドと、Node.js/Express によるバックエンド、SQLite を使用したブログアプリケーションです。

---

## Features / 機能

- 📝 Create, edit, and delete posts  
  日本語: 投稿の作成・編集・削除が可能
- Category filters and dynamic routing  
  日本語: カテゴリーによるフィルタと動的ルーティング対応
- SQLite for lightweight persistence  
  日本語: 軽量な永続化のために SQLite を使用
- Responsive Bootstrap UI  
  日本語: スマートフォン対応のレスポンシブ UI

---

## Project Structure / プロジェクト構造

```
react-blog-1/
├── backend/ # Express server + SQLite
├── screenshots/ # Screenshot images for the README
└── src/ # React frontend
├── components/
├── pages/
├── api.js # API helper file
├── App.js
└──
```

---

## Run Locally / ローカルで実行

Clone the repo and install dependencies:

```bash
git clone https://github.com/theunfeelingsoul/react-blog-1.git
cd react-blog-1
npm install
```

Then start both backend and frontend (in separate terminals):

# Terminal 1: Run backend

```bash
cd backend
npm start
```

# Terminal 2: Run frontend

```bash
cd src
npm start
```

Open your browser at http://localhost:3000 to view the app.
日本語: ブラウザで http://localhost:3000 を開いて実行確認してください。

## Demo Screenshots / スクリーンショット

<p float="left"> <img src="./screenshots/01 home.png" alt="Homepage" width="300" /> <img src="./screenshots/02 category.png" alt="Categories Page" width="300" /> </p> <p float="left"> <img src="./screenshots/03 single.png" alt="Single Post" width="300" /> <img src="./screenshots/04 admin.png" alt="Admin Panel" width="300" /> </p> <p float="left"> <img src="./screenshots/05 edit.png" alt="Edit Post" width="300" /> </p>

---

## Author / 作者

Victor — full-stack web developer 🚀
日本語: Victor — フルスタック開発エンジニアです。
GitHub Profile https://github.com/theunfeelingsoul

---

#### Key improvements based on your structure:

- Noted **SQLite backend**, since that's the active integration.
- Used proper folder naming and path formatting.
- Embedded screenshots via HTML `<img>` to control width (~300px).
- Made core sections bilingual for accessibility to Japanese-speaking employers.

---

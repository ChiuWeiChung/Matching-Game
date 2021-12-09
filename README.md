# 自製配對翻牌遊戲


## [點擊進入配對翻牌遊戲](https://chiuweichung.github.io/Matching-Game/)

* 使用 Vanilla JS 實作 MVC 架構
* 串接 Unsplash API 取得 Open Source 圖庫
* 以 CSS Grid Layout 進行卡牌布局
* 以 Webpack 進行前端打包

![matching-game](https://github.com/ChiuWeiChung/IMGTANK/blob/main/portfolio/matching-game/matching-game.gif?raw=true)



## 心得

會做這個翻牌遊戲主要是練習原生 JavaScript 以及手刻 CSS 的熟悉程度，並將腦中的構想透過寫 Code 來實現，在開發過程中，卡牌的排版一開始是利用 Flex System 進行布局，後續為了練習 Grid，因此改成 Grid System。

### 串接 Unsplash API

完成 HTML 的框架之後，就開始串接 Unsplash API，透過該 API ，我可以輸入關鍵字來搜尋相關的圖庫，再將回傳的結果渲染在卡牌上。 

## 翻牌演算法

在編寫翻牌遊戲的勝利條件時，構想是只要卡牌所對應的 `src` Attribute 一樣時，就會配對成功，開發初期有想到，玩家可以透過右鍵得知卡牌的圖片位置，為了避免這種情況，所以在 `<body>` 內部寫入了 `<body oncontextmenu="return false">` 來屏蔽玩家的滑鼠右鍵，但玩家依舊可以透過控制台來得知 `<img>` 元素的 `src` Attribute。 

為了避免上面這種掃興的情況發生，未來會在 App 中加入遊戲計時的功能，計算玩家完成翻牌遊戲所需的時間，由於從控制台內確認圖片來源這個方法會耗費相當的時間，玩家可能也傾向透過 trial and error 來完成遊戲。
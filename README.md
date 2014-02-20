# 깃 시작하기

`깃 시작하기` 발표자료

## 실행

    $ git clone https://github.com/chitacan/getting-started-with-git.git
    $ npm install
    $ grunt

브라우저에서 `http://localhost:8000` 에 접속

## Reveal.js 플러그인

이 발표자료는 [Reveal.js](https://github.com/hakimel/reveal.js/) 를 활용해 작성되었으며, 데모와 효율적인 발표를 위해 아래의 플러그인이 추가로 사용됩니다.

### ibg.js

`Reveal.js` 의 배경을 특정 url의 내용으로 설정할 수 있는 플러그인. 아래와 같이 `section` 태그의 `data-bgurl` 속성에 배경으로 설정하고자 하는 url을 선언하여 사용할 수 있다.

    <section data-bgurl="http://git-scm.com"></section>

![ibg-demo]()

아래 `tty.js` 와 연동하면 `Reveal.js` 내에서 터미널을 연동할 수 있다.

### jump.js

`Reveal.js`의 [Internal Links](https://github.com/hakimel/reveal.js/#internal-links) 로 특정 페이지에 이동하였을때 원래 페이지로 돌아올 수 있는 버튼을 표시해주는 플러그인.

![jump-demo]()

## tty.js

`깃 시작하기` 발표에서는 [tty.js](https://github.com/chjj/tty.js) 와 `ibg` 플러그인을 활용해 브라우저 내에서 터미널을 렌더링하여 데모를 진행하였다.

![git-demo]()
# 깃 시작하기

`깃 시작하기` 발표자료

## 사전 준비사항
#### node.js
node 버전은 v0.10 을 권장한다.
* v0.11 사용시 pty.js 빌드에 문제 발생.

Mac OS의 경우 Xcode command line tool이 설치되야 한다.
#### MacOS 10.8 이전
```
xcode-select --install
```
#### MacOS 10.9 이후
Command line tools를 10.9, 10.10 버전에 맞게 받는다.
* https://developer.apple.com/downloads/ 

#### node-gyp 설치
node.js 네이티브 애드온 빌드도구 설치

```
$npm install -g node-gyp
```

#### grunt-cli 설치
grunt의 명령라인인 grunt-cli 설치

```
$npm install -g grunt-cli
```


## 실행

    $ git clone https://github.com/chitacan/getting-started-with-git.git
    $ cd getting-started-with-git
    $ npm install
    $ grunt

브라우저에서 `http://localhost:8000` 에 접속

## Reveal.js 플러그인

이 발표자료는 [Reveal.js](https://github.com/hakimel/reveal.js/) 를 활용해 작성되었으며, 데모와 효율적인 발표를 위해 아래의 플러그인들이 추가로 사용되었다.

### ibg.js

`Reveal.js` 의 배경을 특정 url의 내용으로 설정할 수 있는 플러그인. 아래와 같이 `section` 태그의 `data-bgurl` 속성에 배경으로 설정하고자 하는 url을 선언하여 사용할 수 있다.

```html
<section data-bgurl="http://git-scm.com"></section>
```

![ibg-demo](https://raw.github.com/chitacan/getting-started-with-git/master/img/ibg.gif)

아래 `tty.js` 와 연동하면 `Reveal.js` 내에서 터미널을 사용할 수 있다.

### jump.js

`Reveal.js`의 [Internal Links](https://github.com/hakimel/reveal.js/#internal-links) 로 특정 페이지에 이동하였을때 원래 페이지로 돌아올 수 있는 버튼을 표시해주는 플러그인.

아래와 같이 `Internal Links`를 사용할때 클래스에 `jump` 를 추가하면 사용할 수 있다.

```html
<li><a href="#/3/12" class="jump">demo</a></li>
```

![jump-demo](https://raw.github.com/chitacan/getting-started-with-git/master/img/jump.gif)

## tty.js

`깃 시작하기` 발표에서는 [tty.js](https://github.com/chjj/tty.js) 와 `ibg` 플러그인을 활용해 브라우저 내에서 터미널을 렌더링하여 데모를 진행하였다.

![git-demo](https://raw.github.com/chitacan/getting-started-with-git/master/img/git.gif)

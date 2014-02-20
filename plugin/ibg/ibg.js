// supports iframe backgrounds
var ibg = (function(Reveal) {

    var R    = Reveal
      , BG   
      , BGs  
      , CTRL
      , controlsLeft
      , controlsRight
      , controlsUp
      , controlsDown
      , lastIndices = {};

  function setup () {
    BG            = document.querySelector('.backgrounds');
    BGs           = BG.children;
    CTRL          = document.querySelector('.controls');
    controlsLeft  = document.querySelector('.navigate-left');
    controlsRight = document.querySelector('.navigate-right' );
    controlsUp    = document.querySelector('.navigate-up');
    controlsDown  = document.querySelector('.navigate-down');
  }

  function init() {
    setup();
  }

  function retrieveBg(idx) {
    return idx.v == 0 ? BGs[idx.h] : BGs[idx.h].children[idx.v];
  }

  function isIBG(e) {
    return !!e.currentSlide.getAttribute('data-bgurl');
  }

  function setIframeBackground(idx, url) {

    var el = retrieveBg(idx);

    if (!!el && el.getElementsByTagName('iframe').length !== 0)
      return;

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.style.width     = 'inherit';
    iframe.style.height    = 'inherit';
    iframe.style.maxWidth  = '100%';
    iframe.style.maxHeight = '100%';
    iframe.style.display   = 'none';

    el.appendChild(iframe);
  }

  function nextIndex(idx) {
    var direction = R.availableRoutes();
    if (direction.down)
      idx.v++;
    else {
      idx.h++;
      idx.v = 0;
    }
    return idx;
  }

  function onNavigateLeftClicked(event) { 
    event.preventDefault(); 
    R.navigateLeft();
  }
  function onNavigateRightClicked(event) { 
    event.preventDefault();
    R.navigateRight();
  }
  function onNavigateUpClicked(event) {
    event.preventDefault();
    R.navigateUp();
  }
  function onNavigateDownClicked(event) {
    event.preventDefault();
    R.navigateDown(); 
  }
  function onControlClicked(event) {
    event.preventDefault();
    var bg = retrieveBg(lastIndices).children[0];
    if (bg) bg.contentWindow.focus();
  }

  // add our own EventListeners
  function addEventListeners() {
    [ 'touchstart', 'click' ].forEach( function( eventName ) {
      controlsLeft.addEventListener(
        eventName, onNavigateLeftClicked, false
        );
      controlsRight.addEventListener(
        eventName, onNavigateRightClicked, false
        );
      controlsUp.addEventListener(
        eventName, onNavigateUpClicked, false
        );
      controlsDown.addEventListener(
        eventName, onNavigateDownClicked, false
        );
      CTRL.addEventListener(
        eventName, onControlClicked, false
        );
    } );
  }

  // remove our own EventListeners
  function removeEventListeners() {
    [ 'touchstart', 'click' ].forEach( function( eventName ) {
      controlsLeft.removeEventListener(
        eventName, onNavigateLeftClicked, false
        );
      controlsRight.removeEventListener(
        eventName, onNavigateRightClicked, false
        );
      controlsUp.removeEventListener(
        eventName, onNavigateUpClicked, false
        );
      controlsDown.removeEventListener(
        eventName, onNavigateDownClicked, false
        );
      CTRL.removeEventListener(
        eventName, onControlClicked, false
        );
    } );
  }

  function setVisiblity(node, visibility) {
    node.style.display = visibility ? 'block' : 'none';
  }

  function setUpNextBg(e) {
    var nextIdx = nextIndex({h:e.indexh, v:e.indexv});
    var nextSl  = nextIdx.v == 0 ? 
      R.getSlide(nextIdx.h) : 
      R.getSlide(nextIdx.h, nextIdx.v);
    var url = nextSl && nextSl.getAttribute('data-bgurl');

    if (url) {
      // show cotrol in previous slide.
      // once iframe content has focus, we can't take it back.
      // In that case, we should use control or manually click slide element.
      // setVisiblity(CTRL, true);
      setIframeBackground(nextIdx, url)
    }
  }

  function updateCurrentBg(indices) {
    var bg = retrieveBg(indices).children[0];
    if (bg) {
      setVisiblity(bg, true)
      bg.contentWindow.focus();
      bg.contentWindow.postMessage('slidechanged', '*');
    }
  }

  function updateBgNode(e) {
    if (isIBG(e)) {
      lastIndices = {h: e.indexh, v: e.indexv};
      BG.style.position = 'relative';
      R.removeEventListeners();
      addEventListeners();
      updateCurrentBg(lastIndices);
      // setVisiblity(CTRL, true);
    } else {
      BG.style.position = 'absolute';
      removeEventListeners();
      R.addEventListeners();
      window.focus();
      // setVisiblity(CTRL, false);
    }
  }

  R.addEventListener('slidechanged', function(e) {
    if (!R.isOverview()) {
      updateBgNode(e);
      setUpNextBg(e);
    }
  });

  R.addEventListener('ready', function(e) {
    if (!R.isOverview()) {
      updateBgNode(e);
      setUpNextBg(e);
    }
  });

  R.addEventListener( 'overviewshown', function(e) {
    updateBgNode(e);
  });

  R.addEventListener( 'overviewhidden', function(e) {
    updateBgNode(e);
  });

  return {
    init: init
  }

})(Reveal);
var jump = (function(Reveal) {
    var R    = Reveal
      , CTRL
      , BACK
      , JUMP
      , lastControlVisibility = false
      , lastJumped = {};

  function _jumpHandler() {
    lastControlVisibility = getVisibility(CTRL);
    lastJumped = R.getIndices();
    setVisiblity(BACK, true);
    setVisiblity(CTRL, false);
  }

  function _backHandler() {
    setVisiblity(BACK, false);
    setVisiblity(CTRL, lastControlVisibility);
    lastJumped.v ? 
      R.slide(lastJumped.h, lastJumped.v) : 
      R.slide(lastJumped.h)
  }

  function _focusHandler() {
    window.focus();
  }

  function setup() {
    createBack();

    CTRL = document.querySelector('.controls');
    BACK = document.querySelector('.reveal .back');
    JUMP = document.querySelectorAll('.reveal .jump');

    [].forEach.call(JUMP, function(node){
      node.addEventListener('click', _jumpHandler);
    });

    setVisiblity(BACK, false);
  }

  function createBack() {
    var wrapper = document.querySelector('.reveal');
    var node = wrapper.querySelector('.back');
    if (!node) {
      node = document.createElement('aside');
      node.classList.add('controls');
      node.classList.add('back');
      node.innerHTML = '<div class="navigate-right enabled"></div>';
      node.children[0].addEventListener('click', _backHandler);
      node.addEventListener('click', _focusHandler);
      wrapper.appendChild(node)
    }
  }

  function setVisiblity(node, visibility) {
    node.style.display = visibility ? 'block' : 'none';
  }

  function getVisibility(node) {
    return node.style.display === 'block';
  }

  R.addEventListener('ready', function(e) {
    setup();
  });

  function init() {
    setup();
  }

  function goBack() {
    _backHandler();
  }

  return {
    init : init,
    goBack: goBack
  }

})(Reveal);
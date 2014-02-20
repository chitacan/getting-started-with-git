tty.on('load', function() {
  tty.toggleLights();
});

window.addEventListener('message', function(e) {
  if (e.data === 'slidechanged' && tty.windows.length === 0)
    setTimeout(function() {
      new tty.Window;
    }, 300);
});

tty.on('open window', function(window) {
  setTimeout(function() {
    window.focus();
    window.maximize();
  }, 100);
});

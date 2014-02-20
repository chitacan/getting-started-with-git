module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: './',
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'tty',
    'server'
  ]);

  grunt.registerTask('tty', 'run tty.js server', function() {
    var tty = require('tty.js');
    var app = tty.createServer({
      shell: 'bash',
      static: './tty/static',
      term: {
        termname: 'xterm',
      },
      port:3000
    });
    app.listen();
  });

  grunt.registerTask('server', [
    'connect:server'
  ]);
}

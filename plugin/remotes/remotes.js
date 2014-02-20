/**
 * Touch-based remote controller for your presentation courtesy 
 * of the folks at http://remotes.io
 */

(function(window){

    /**
     * Detects if we are dealing with a touch enabled device (with some false positives)
     * Borrowed from modernizr: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touch.js   
     */
    var hasTouch  = (function(){
        return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    })();

    /**
     * Detects if notes are enable and the current page is opened inside an /iframe
     * this prevents loading Remotes.io several times
     */
    var isNotesAndIframe = (function(){
        return window.RevealNotes && !(self == top);
    })();

    var CTRL, BACK;
    function setControlVisiblity(visibility) {
        CTRL.style.display = visibility ? 'block' : 'none';
    }
    function getVisibility(node) {
        return node.style.display === 'block';
    }
    function setup() {
        if (!CTRL)
            CTRL = document.getElementsByClassName('controls')[0];

        if (!BACK)
            BACK = document.querySelector('.reveal .back');
    }

    if(!hasTouch && !isNotesAndIframe){
        head.ready( 'remotes.ne.min.js', function() {
            new Remotes("preview")
                .on("swipe-left", function(e){ Reveal.right(); })
                .on("swipe-right", function(e){ Reveal.left(); })
                .on("swipe-up", function(e){ Reveal.down(); })
                .on("swipe-down", function(e){ Reveal.up(); })
                .on("tap", function(e){
                    setup();
                    if (window.jump && BACK && getVisibility(BACK))
                        window.jump.goBack();
                    else
                        Reveal.next(); 
                })
                .on("hold", function(e){ 
                    setup();
                    if (window.jump && BACK && getVisibility(BACK))
                        window.jump.goBack();
                    else
                        Reveal.prev();
                })
                .on("zoom-out", function(e){ Reveal.toggleOverview(true); })
                .on("zoom-in", function(e){ Reveal.toggleOverview(false); })
                .on("out-of-sync", function(e) { 
                    setup();
                    setControlVisiblity(true);
                })
                .on("synced", function(e) {
                    setup();
                    setControlVisiblity(false);
                })
            ;
        } );

        head.js('https://hakim-static.s3.amazonaws.com/reveal-js/remotes.ne.min.js');
    }
})(window);
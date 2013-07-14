
var functions = (function() {
    function recognize(language, trigger) {
        var fn = function() { return language; };
        fn.trigger = trigger;
        return fn;
    }
    
    return {
        recognize: recognize
    };
})();

if (module && module.exports)
    module.exports = functions;
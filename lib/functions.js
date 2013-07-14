
var functions = (function() {
    function recognize(language, trigger) {
        var fn;
        
        if (typeof language === 'function')
            fn = function(text, tokens, position, state) { return language(text, tokens, position, state); };
        else
            fn = function() { return language; };
            
        fn.trigger = trigger;
        
        return fn;
    }
    
    return {
        recognize: recognize
    };
})();

if (module && module.exports)
    module.exports = functions;
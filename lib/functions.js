
var functions = (function() {
    function recognize(language, trigger, weight) {
        var fn;
        
        if (typeof language === 'function')
            fn = function(text, tokens, position, state) { return language(text, tokens, position, state); };
        else
            fn = function() { return language; };
            
        fn.trigger = trigger;
        
        if (weight)
            fn.weight = weight;
        
        return fn;
    }
    
    return {
        recognize: recognize
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = functions;
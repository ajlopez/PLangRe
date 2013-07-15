if (typeof checker === 'undefined')
    var checker = require('./checker');

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
    
    function recognizeWords(language, words) {
        var fn = function(text, tokens, position, state) {
            var token = tokens[position];
            
            if (token && words.indexOf(token.value) >= 0)
                return language;
            
            return null;
        };
        
        fn.trigger = [checker.word];
        
        return fn;
    }
    
    return {
        recognize: recognize,
        recognizeWords: recognizeWords
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = functions;
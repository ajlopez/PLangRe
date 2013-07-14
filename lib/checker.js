
if (typeof tokenizer === 'undefined')
    var tokenizer = require('./tokenizer');

var checker = (function() {
    var whitespace = 1;
    var newline = 2;
    var word = 3;

    function check(text, tokens, fns)
    {
        if (typeof fns === 'undefined') {
            fns = tokens;
            tokens = tokenizer.getTokens(text);
        }
        
        var result = { };
        var l = tokens.length;
        
        for (var k = 0; k < l; k++)
            for (n in fns) {
                var fn = fns[n];
                
                if (!triggered(fn, tokens, k))
                    continue;
                    
                var language = fn(text, tokens, k, { });
                
                if (language) {
                    if (result[language] === undefined)
                        result[language] = 0;

                    if (fn.weight)
                        result[language] += fn.weight;
                    else
                        result[language]++;
                }
            }
            
        return result;
    }

    function triggered(fn, tokens, position) {
        if (!fn)
            return false;
        
        var token = tokens[position];
        
        if (!token)
            return false;
            
        if (!fn.trigger)
            return true;
            
        if (fn.trigger === token.value)
            return true;
        
        if (!Array.isArray(fn.trigger))
            return false;
        
        var l = fn.trigger.length;
            
        for (var k = 0; k < l; k++) {
            var token = tokens[position + k];
            var trigger = fn.trigger[k];
            
            if (!token)
                return false;
                
            if (trigger === whitespace)
                if (!token.whitespace)
                    return false;
                else
                    continue;
            
            if (trigger === newline)
                if (!token.newline)
                    return false;
                else
                    continue;
                
            if (trigger === word)
                if (!token.word)
                    return false;
                else
                    continue;
                
            if (trigger !== token.value)
                return false;
        }
        
        return true;
    }

    return {
        check: check,
        whitespace: whitespace,
        newline: newline,
        word: word
    };
})();

if (module && module.exports)
    module.exports = checker;

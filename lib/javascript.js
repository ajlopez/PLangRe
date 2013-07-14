
if (typeof checker === 'undefined')
    var checker = require('./checker');

var javascript = (function () {    
    var language = 'javascript';

    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Reserved_Words

    var reserved = [
        'break', 'case', 'catch', 'continue',
        'debugger', 'default', 'delete', 'do',
        'else', 'finally', 'for', 'function',
        'if', 'in', 'instanceof', 'new',
        'return', 'switch', 'this', 'throw',
        'try', 'typeof', 'var', 'void',
        'while', 'with'
    ];

    function reservedWord(text, tokens, position, state) {
        var token = tokens[position];
        
        if (token && reserved.indexOf(token.value) >= 0)
            return language;
        
        return null;
    }

    return {
        reservedWord: reservedWord
    };
})();

if (module && module.exports)
    module.exports = javascript;

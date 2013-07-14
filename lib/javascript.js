
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
if (typeof functions === 'undefined')
    var functions = require('./functions');

var javascript = (function () {    
    var language = 'javascript';
    var whitespace = checker.whitespace;
    var word = checker.word;

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
        reservedWord: reservedWord,
        documentWrite: functions.recognize(language, ['document', '.', 'write']),
        documentGetElementById: functions.recognize(language, ['document', '.', 'getElementById']),
        alertParenthesis: functions.recognize(language, ['alert', '(']),
        alertWhiteSpaceParenthesis: functions.recognize(language, ['alert', whitespace, '(']),
        lineComment: functions.recognize(language, ['/', '/']),
        strictEqual: functions.recognize(language, ['=', '=', '=']),
        strictNotEqual: functions.recognize(language, ['!', '=', '=']),
        nameJson: functions.recognize(language, [word, ':']),
        nameWhiteSpaceJson: functions.recognize(language, [word, whitespace, ':']),
        stringJson: functions.recognize(language, ['"', ':']),
        stringWhiteSpaceJson: functions.recognize(language, ['"', whitespace, ':']),
        quotedStringJson: functions.recognize(language, ["'", ':']),
        quotedStringWhiteSpaceJson: functions.recognize(language, ["'", whitespace, ':'])
    };
})();

if (module && module.exports)
    module.exports = javascript;

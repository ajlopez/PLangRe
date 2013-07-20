
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
if (typeof functions === 'undefined')
    var functions = require('./functions');

var javascript = (function () {    
    var language = 'javascript';
    var whitespace = checker.whitespace;
    var word = checker.word;
    var newline = checker.newline;

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
    
    function withoutParenthesis(text, tokens, position, state) {
        var p = position + 1;
        
        if (!tokens[p])
            return language;
            
        if (tokens[p].whitespace) {
            p++;
            if (!tokens[p])
                return language;
        }
        
        if (tokens[p].value === '(')
            return null;
            
        return language;
    }

    function jsonName(text, tokens, position, state) {
        var p;
        
        if (tokens[position + 1].value == ':')
            p = position + 2;
        else if (tokens[position + 2].value == ':')
            p = position + 3;
        else
            return null;
            
        if (!tokens[p])
            return null;
            
        if (tokens[p].whitespace) {
            p++;
            if (!tokens[p])
                return null;
        }
        
        if (tokens[p].newline)
            return null;
            
        return language;
    }
    
    return {
        reservedWord: functions.recognizeWords(language, reserved),
        documentWrite: functions.recognize(language, ['document', '.', 'write']),
        documentGetElementById: functions.recognize(language, ['document', '.', 'getElementById']),
        alertParenthesis: functions.recognize(language, ['alert', '(']),
        alertWhiteSpaceParenthesis: functions.recognize(language, ['alert', whitespace, '(']),
        lineComment: functions.recognize(language, ['/', '/']),
        strictEqual: functions.recognize(language, ['=', '=', '=']),
        strictNotEqual: functions.recognize(language, ['!', '=', '=']),
        nameJson: functions.recognize(jsonName, [word, ':']),
        nameWhiteSpaceJson: functions.recognize(jsonName, [word, whitespace, ':']),
        stringJson: functions.recognize(jsonName, ['"', ':']),
        stringWhiteSpaceJson: functions.recognize(jsonName, ['"', whitespace, ':']),
        quotedStringJson: functions.recognize(jsonName, ["'", ':']),
        quotedStringWhiteSpaceJson: functions.recognize(jsonName, ["'", whitespace, ':']),
        anonymousFunction: functions.recognize(language, ['function', '(']),
        anonymousFunctionWithWhiteSpace: functions.recognize(language, ['function', whitespace, '(']),
        forWoParenthesis: functions.recognize(withoutParenthesis, ['for'], -1),
        ifWoParenthesis: functions.recognize(withoutParenthesis, ['if'], -1),
        whileWoParenthesis: functions.recognize(withoutParenthesis, ['while'], -1),
        startComment: functions.recognize(language, ['/', '*']),
        endComment: functions.recognize(language, ['*', '/']),
        semiColonNewLine: functions.recognize(language, [';', newline]),
        semiColonWhitespaceNewLine: functions.recognize(language, [';', whitespace, newline])
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = javascript;

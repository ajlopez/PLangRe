
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
if (typeof functions === 'undefined')
    var functions = require('./functions');

var javascript = (function () {    
    var language = 'javascript';
    var whitespace = checker.whitespace;

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
    
    function documentWrite() {
        return language;
    }
    
    documentWrite.trigger = ['document', '.', 'write'];
    
    function documentGetElementById() {
        return language;
    }
    
    documentGetElementById.trigger = ['document', '.', 'getElementById'];
    
    function alertParenthesis() {
        return language;
    }
    
    alertParenthesis.trigger = ['alert', '('];
    
    function alertWhiteSpaceParenthesis() {
        return language;
    }
    
    alertWhiteSpaceParenthesis.trigger = ['alert', whitespace, '('];
    
    return {
        reservedWord: reservedWord,
        documentWrite: documentWrite,
        documentGetElementById: documentGetElementById,
        alertParenthesis: alertParenthesis,
        alertWhiteSpaceParenthesis: alertWhiteSpaceParenthesis,
        lineComment: functions.recognize('javascript', ['/', '/']),
        strictEqual: functions.recognize('javascript', ['=', '=', '=']),
        strictNotEqual: functions.recognize('javascript', ['!', '=', '='])
    };
})();

if (module && module.exports)
    module.exports = javascript;

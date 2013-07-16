
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
if (typeof functions === 'undefined')
    var functions = require('./functions');
    
var python = (function () {    
    var language = 'python';

    var whitespace = checker.whitespace;
    var newline = checker.newline;
    var word = checker.word;

    // from http://docs.python.org/release/3.3.2/reference/lexical_analysis.html#keywords

    var reserved = [
        'False', 'class', 'finally', 'is', 'return',
        'None', 'continue', 'for', 'lambda', 'try',
        'True', 'def', 'from', 'nonlocal', 'while',
        'and', 'del', 'global', 'not', 'with', 
        'as', 'elif', 'if', 'or', 'yield',
        'assert', 'else', 'import', 'pass',
        'break', 'except', 'in', 'raise'
    ];

    function reservedWord(text, tokens, position, state) {
        var token = tokens[position];
        
        if (token && reserved.indexOf(token.value) >= 0)
            return language;
        
        return null;
    }
    
    function withColon(text, tokens, position, state) {
        for (var k = position + 1; tokens[k]; k++) {
            if (tokens[k].newline)
                return null;
            if (tokens[k].value === ':')
                return language;
        }
        
        return null;
    }
    
    function defSelf(text, tokens, position, state) {
        var k;
        
        for (k = position + 1; tokens[k]; k++) {
            if (tokens[k].newline)
                return null;
            if (tokens[k].value === '(')
                break;
        }
        
        if (!tokens[k])
            return null;
            
        k++;
        
        if (!tokens[k])
            return null;
            
        if (tokens[k].whitespace)
            k++;
            
        if (tokens[k] && tokens[k].value === 'self')
            return language;
        
        return null;
    }

    return {
        reservedWord: functions.recognizeWords(language, reserved),
        fromImport: functions.recognize(language, ['from', whitespace, word, whitespace, 'import' ]),
        importModule: functions.recognize(language, ['import', whitespace, word ]),
        shebang: functions.recognize(language, ['#', '!', '/', 'usr', '/', 'bin', '/', 'python' ]),
        shebangEnv: functions.recognize(language, ['#', '!', '/', 'usr', '/', 'bin', '/', 'env', whitespace, 'python' ]),
        classColon: functions.recognize(withColon, ['class']),
        ifColon: functions.recognize(withColon, ['if']),
        forColon: functions.recognize(withColon, ['for']),
        whileColon: functions.recognize(withColon, ['while']),
        defColon: functions.recognize(withColon, ['def']),
        tryColon: functions.recognize(language, ['try', ':']),
        trySpaceColon: functions.recognize(language, ['try', whitespace, ':']),
        exceptColon: functions.recognize(withColon, ['except']),
        defSelf: functions.recognize(defSelf, ['def']),
        specialName: functions.recognize(language, ['_', '_', word, '_', '_'])
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = python;

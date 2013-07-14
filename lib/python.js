
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
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

    function fromImport() {
        return language;
    }

    fromImport.trigger = ['from', whitespace, word, whitespace, 'import' ];

    function importModule() {
        return language;
    }

    importModule.trigger = ['import', whitespace, word ];

    return {
        reservedWord: reservedWord,
        fromImport: fromImport,
        importModule: importModule
    };
})();

if (module && module.exports)
    module.exports = python;


if (typeof checker === 'undefined')
    var checker = require('./checker');
    
if (typeof functions === 'undefined')
    var functions = require('./functions');
    
var ruby = (function () {
    var language = 'ruby';
    var whitespace = checker.whitespace;
    var word = checker.word;

    // from http://www.tutorialspoint.com/ruby/ruby_quick_guide.htm

    var reserved = [
        'BEGIN', 'do', 'next', 'then',
        'END', 'else', 'nil', 'true',
        'alias', 'elsif', 'not', 'undef',
        'and', 'end', 'or', 'unless',
        'begin', 'ensure', 'redo', 'until',
        'break', 'false', 'rescue', 'when',
        'case', 'for', 'retry', 'while',
        'class', 'if', 'return', 
        'def', 'in', 'self', '__FILE__',
        'defined?', 'module', 'super', '__LINE__'
    ];

    function definedp() {
        return language;
    }

    definedp.trigger = ['defined', '?'];

    function underscoreFile() {
        return language;
    }

    underscoreFile.trigger = ['_', '_', 'FILE', '_', '_'];

    function underscoreLine() {
        return language;
    }

    underscoreLine.trigger = ['_', '_', 'LINE', '_', '_'];

    function shebang() {
        return language;
    }

    shebang.trigger = ['#', '!', '/', 'usr', '/', 'bin', '/', 'ruby' ];

    function requireModule(text, tokens, position, state) {
        var token = tokens[position + 2];
        
        if (!token)
            return null;
            
        if (token.value === '"' || token.value === "'" || token.word)
            return language;
            
        return null;
    }

    function lambdaParameter(text, tokens, position, state) {
        if (!tokens[position-1] || tokens[position-1].value != '|')
            return language;
            
        return null;
    }

    return {
        reservedWord: functions.recognizeWords(language, reserved),
        definedp: functions.recognize(language, ['defined', '?']),
        underscoreFile: functions.recognize(language, ['_', '_', 'FILE', '_', '_']),
        underscoreLine: functions.recognize(language, ['_', '_', 'LINE', '_', '_']),
        shebang: functions.recognize(language, ['#', '!', '/', 'usr', '/', 'bin', '/', 'ruby' ]),
        requireModule: functions.recognize(requireModule, ['require', whitespace]),
        lambdaParameter1: functions.recognize(lambdaParameter, ['|', word]),
        lambdaParameter2: functions.recognize(lambdaParameter, ['|', whitespace, word]),
        instanceVariable: functions.recognize(language, ['@', word]),
        classVariable: functions.recognize(language, ['@', '@', word]),
        namespace: functions.recognize(language, [word, ':', ':']),
        qualifiedName: functions.recognize(language, [':', ':', word]),
        keyword: functions.recognize(language, [':', word])
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = ruby;

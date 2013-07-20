
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
if (typeof functions === 'undefined')
    var functions = require('./functions');

var java = (function () {    
    var language = 'java';
    var whitespace = checker.whitespace;
    var word = checker.word;

    // from http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html

    var reserved = [
        'abstract', 'continue', 'for', 'new', 'switch',
        'assert', 'default', 'goto', 'package', 'synchronized',
        'boolean', 'do', 'if', 'private', 'this',
        'break', 'double', 'implements', 'protected', 'throw',
        'byte',	'else', 'import', 'public', 'throws',
        'case',	'enum', 'instanceof', 'return', 'transient',
        'catch', 'extends', 'int', 'short', 'try',
        'char',	'final', 'interface', 'static', 'void',
        'class', 'finally', 'long', 'strictfp', 'volatile',
        'const', 'float', 'native', 'super', 'while'
    ];

    var types = [
        'byte', 'char', 'short', 'int', 'long',
        'float', 'double',
        'boolean', 'String', 'Object'
    ];
    
    return {
        reservedWord: functions.recognizeWords(language, reserved),
        typeWord: functions.recognizeWords(language, types),
        lineComment: functions.recognize(language, ['/', '/']),
        startComment: functions.recognize(language, ['/', '*']),
        endComment: functions.recognize(language, ['*', '/'])
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = java;

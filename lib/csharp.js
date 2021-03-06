
if (typeof checker === 'undefined')
    var checker = require('./checker');

if (typeof functions === 'undefined')
    var functions = require('./functions');

var csharp = (function () {    
    var language = 'csharp';
    var newline = checker.newline;
    var whitespace = checker.whitespace;

    // from http://msdn.microsoft.com/en-us/library/x53a06bb.aspx

    var reserved = [
        'abstract', 'as', 'base', 'bool', 'break',
        'byte', 'case', 'catch', 'char', 'checked',
        'class', 'const', 'continue', 'decimal', 'default',
        'delegate', 'do', 'double', 'else', 'enum',
        'event', 'explicit', 'extern', 'false', 'finally',
        'fixed', 'float', 'for', 'foreach', 'goto',
        'if', 'implicit', 'in', 'abstract', 'as',
        'base', 'bool', 'break', 'byte', 'case',
        'catch', 'char', 'checked', 'class', 'const',
        'continue', 'decimal', 'default', 'delegate', 'do',
        'double', 'else', 'enum', 'event', 'explicit',
        'extern', 'false', 'finally', 'fixed', 'float',
        'for', 'foreach', 'goto', 'if', 'implicit',
        'in', 'int', 'int', 'interface', 'internal',
        'is', 'lock', 'long', 'namespace', 'new',
        'null', 'object', 'operator', 'out', 'override',
        'params', 'private', 'protected', 'public', 'readonly',
        'ref', 'return', 'sbyte', 'sealed', 'short',
        'sizeof', 'stackalloc', 'static', 'string', 'struct',
        'switch', 'this', 'throw', 'true', 'try',
        'typeof', 'uint', 'ulong', 'unchecked', 'unsafe',
        'ushort', 'using', 'virtual', 'void', 'volatile',
        'while'
    ];

    function reservedWord(text, tokens, position, state) {
        var token = tokens[position];
        
        if (token && reserved.indexOf(token.value) >= 0)
            return language;
        
        return null;
    }

    return {
        reservedWord: reservedWord,
        lineComment: functions.recognize(language, ['/', '/']),
        startComment: functions.recognize(language, ['/', '*']),
        endComment: functions.recognize(language, ['*', '/']),
        semiColonNewLine: functions.recognize(language, [';', newline]),
        semiColonWhitespaceNewLine: functions.recognize(language, [';', whitespace, newline])
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = csharp;

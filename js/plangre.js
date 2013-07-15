
var plangre = (function() {

var tokenizer = (function () {
    function Token(text, start, length) {
        this.text = text;
        this.start = start;
        this.length = length;
        this.value = text.substring(start, start + length);
    }

    function getTokens(text) {
        var l = text.length;
        var tokens = [];
        
        for (var k = 0; k < l; k++) {
            var start = k;
            var length = 1;
            var ch = text[k];
            var token;
            
            if (isWhiteSpace(ch)) {
                var ch2 = text[k+1];
                
                while (isWhiteSpace(ch2)) {
                    k++;
                    length++;
                    ch2 = text[k+1];
                }
                
                token = new Token(text, start, length);
                token.whitespace = true;
            }
            else if (isDigit(ch)) {
                var ch2 = text[k+1];
                
                while (isDigit(ch2)) {
                    k++;
                    length++;
                    ch2 = text[k+1];
                }
                
                token = new Token(text, start, length);
                token.digits = true;
            }
            else if (isLetter(ch)) {
                var ch2 = text[k+1];
                
                while (isLetter(ch2)) {
                    k++;
                    length++;
                    ch2 = text[k+1];
                }
                
                token = new Token(text, start, length);
                token.word = true;
            }
            else if (ch === '\n') {
                token = new Token(text, start, length);
                token.newline = true;
            }
            else if (ch === '\r') {
                if (text[k+1] === '\n') {
                    length++;
                    k++;
                    token = new Token(text, start, length);
                }
                else
                    token = new Token(text, start, length);
                    
                token.newline = true;
            }
            else
                token = new Token(text, start, length);
            
            tokens.push(token);
        }
            
        return tokens;
    }

    function isWhiteSpace(ch) {
        return ch && ch.length === 1 && ch <= ' ' && ch !== '\n' && ch !== '\r';
    }

    function isDigit(ch) {
        return ch && ch.length === 1 && ch >= '0' && ch <= '9';
    }

    function isLetter(ch) {
        return ch && ch.length === 1 && ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'));
    }

    return {
        getTokens: getTokens
    }
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = tokenizer;

var functions = (function() {
    function recognize(language, trigger, weight) {
        var fn;
        
        if (typeof language === 'function')
            fn = function(text, tokens, position, state) { return language(text, tokens, position, state); };
        else
            fn = function() { return language; };
            
        fn.trigger = trigger;
        
        if (weight)
            fn.weight = weight;
        
        return fn;
    }
    
    return {
        recognize: recognize
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = functions;
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

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = checker;

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

    function reservedWord(text, tokens, position, state) {
        var token = tokens[position];
        
        if (token && reserved.indexOf(token.value) >= 0)
            return language;
        
        return null;
    }

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
        reservedWord: reservedWord,
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
        reservedWord: reservedWord,
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
        reservedWord: reservedWord,
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
        whileWoParenthesis: functions.recognize(withoutParenthesis, ['while'], -1)
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = javascript;

if (typeof checker === 'undefined')
    var checker = require('./checker');

var csharp = (function () {    
    var language = 'csharp';

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
        reservedWord: reservedWord
    };
})();

if (typeof module !== 'undefined' && module && module.exports)
    module.exports = csharp;
if (typeof ruby === 'undefined')    var ruby = require('./ruby.js');if (typeof javascript === 'undefined')    var javascript = require('./javascript.js');if (typeof csharp === 'undefined')        var csharp = require('./csharp.js');    if (typeof python === 'undefined')        var python = require('./python.js');    if (typeof checker === 'undefined')        var checker = require('./checker.js');    if (typeof tokenizer === 'undefined')        var tokenizer = require('./tokenizer.js');var plangre = (function() {    var fns = { };    for (n in ruby)        fns['ruby_' + n] = ruby[n];    for (n in ruby)        fns['python_' + n] = python[n];    for (n in javascript)        fns['javascript_' + n] = javascript[n];    for (n in csharp)        fns['csharp_' + n] = csharp[n];           function analyze(text) {        var tokens = tokenizer.getTokens(text);        var check = checker.check(text, tokens, fns);                var max = 0;        var result = null;                for (n in check) {            if (check[n] > max) {                max = check[n];                result = n;            }        }                return result;    }    return {        analyze: analyze    };})();if (typeof module !== 'undefined' && module && module.exports)    module.exports = plangre;    return plangre;

})();
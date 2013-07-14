
if (typeof checker === 'undefined')
    var checker = require('./checker');
    
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

requireModule.trigger = ['require', whitespace];

function lambdaParameter1(text, tokens, position, state) {
    if (!tokens[position-1] || tokens[position-1].value != '|')
        return language;
        
    return null;
}

lambdaParameter1.trigger = ['|', word];

function lambdaParameter2(text, tokens, position, state) {
    if (!tokens[position-1] || tokens[position-1].value != '|')
        return language;
        
    return null;
}

lambdaParameter2.trigger = ['|', whitespace, word];

function instanceVariable() {
    return language;
}

instanceVariable.trigger = ['@', word];

function classVariable() {
    return language;
}

classVariable.trigger = ['@', '@', word];

function namespace() {
    return language;
}

namespace.trigger = [word, ':', ':'];

function qualifiedName() {
    return language;
}

qualifiedName.trigger = [':', ':', word];

return {
    reservedWord: reservedWord,
    definedp: definedp,
    underscoreFile: underscoreFile,
    underscoreLine: underscoreLine,
    shebang: shebang,
    requireModule: requireModule,
    lambdaParameter1: lambdaParameter1,
    lambdaParameter2: lambdaParameter2,
    instanceVariable: instanceVariable,
    classVariable: classVariable,
    namespace: namespace,
    qualifiedName: qualifiedName
};
})();

if (module && module.exports)
    module.exports = ruby;


var language = 'ruby'

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

module.exports = {
    reservedWord: reservedWord,
    definedp: definedp,
    underscoreFile: underscoreFile,
    underscoreLine: underscoreLine
};


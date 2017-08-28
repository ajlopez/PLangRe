
var javascript = require('../lib/javascript'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker');

exports['test reserved words'] = function (test) {
    var text = "\
    break case catch continue debugger default delete do else finally \
    for function if in instanceof new return switch this throw \
    try typeof var void while with";

    var tokens = tokenizer.getTokens(text);

    for (var k = 0; k < tokens.length; k++)
        if (tokens[k].word)
            test.equal(javascript.reservedWord(text, tokens, k, { }), 'javascript');
}

exports['document.write'] = function (test) {
    var text = 'document.write';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['document.getElementById'] = function (test) {
    var text = 'document.getElementById';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['alert with immediate parenthesis'] = function (test) {
    var text = 'alert("Hello");';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['alert with whitespace and parenthesis'] = function (test) {
    var text = 'alert ("Hello");';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['line comment'] = function (test) {
    var text = '// a line comment';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['comment'] = function (test) {
    var text = '/* a comment */';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 2);
}

exports['strict equal'] = function (test) {
    var text = 'a === b';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['strict not equal'] = function (test) {
    var text = 'a !== b';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['name in JSON'] = function (test) {
    var text = '{ name: 1 }';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['name in JSON without braces'] = function (test) {
    var text = 'name: 1';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, null);
}

exports['name with whitespace in JSON'] = function (test) {
    var text = '{ name : 1 }';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['single quote name in JSON'] = function (test) {
	var text = "{ 'name': 1 }";

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['double quote name in JSON'] = function (test) {
	var text = '{"name": 1}';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['single quote name, whitespace in JSON'] = function (test) {
	var text = "{ 'name' : 1 }";

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['double quote name, whitespace in JSON'] = function (test) {
    var text = '{ "name" : 1 }';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 1);
}

exports['name colon newline not recognized'] = function (test) {
    var text = '{name:\n}';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(Object.keys(result).length, 0);
}

exports['anonymous function'] = function (test) {
    var text = 'function()';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 2);
}

exports['anonymous function with whitespace'] = function (test) {
    var text = 'function ()';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.ok(result.javascript);
    test.equal(result.javascript, 2);
}

exports['for without parenthesis is negative'] = function (test) {
    var text = 'for name';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 0);
}

exports['while without parenthesis is negative'] = function (test) {
    var text = 'while name';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 0);
}

exports['if without parenthesis is negative'] = function (test) {
    var text = 'if name';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 0);
}

exports['semicolon and new line'] = function (test) {
    var text = 'k;\n';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 1);
}

exports['semicolon, white space and new line'] = function (test) {
    var text = 'k;   \n';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 1);
}

exports['semicolon, carriage return, new line'] = function (test) {
    var text = 'k;\r\n';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 1);
}

exports['semicolon, white space, carriage return, new line'] = function (test) {
    var text = 'k;  \t\r\n';

    var result = checker.check(text, javascript);
    test.ok(result);
    test.equal(result.javascript, 1);
}


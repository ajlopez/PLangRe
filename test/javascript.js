
var javascript = require('../lib/javascript'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker'),
    assert = require('assert');

// test reserved words

var text = "\
break case catch continue debugger default delete do else finally \
for function if in instanceof new return switch this throw \
try typeof var void while with";

var tokens = tokenizer.getTokens(text);

for (var k = 0; k < tokens.length; k++)
    if (tokens[k].word)
        assert.equal(javascript.reservedWord(text, tokens, k, { }), 'javascript');

// document.write

var text = 'document.write';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// document.getElementById

var text = 'document.getElementById';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// alert with immediate parenthesis

var text = 'alert("Hello");';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// alert with whitespace and parenthesis

var text = 'alert ("Hello");';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// line comment

var text = '// a line comment';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// strict equal

var text = 'a === b';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// strict not equal

var text = 'a !== b';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// name in JSON

var text = 'name: 1';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// name with whitespace in JSON

var text = 'name : 1';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// single quote name in JSON

var text = "'name': 1";

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// double quote name in JSON

var text = '"name": 1';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// single quote name, whitespace in JSON

var text = "'name' : 1";

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// double quote name, whitespace in JSON

var text = '"name" : 1';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 1);

// name colon newline not recognized

var text = 'name:\n';

var result = checker.check(text, javascript);
assert.ok(result);
assert.equal(Object.keys(result).length, 0);

// anonymous function

var text = 'function()';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 2);

// anonymous function with whitespace

var text = 'function ()';

var result = checker.check(text, javascript);
assert.ok(result);
assert.ok(result.javascript);
assert.equal(result.javascript, 2);

// for without parenthesis is negative

var text = 'for name';

var result = checker.check(text, javascript);
assert.ok(result);
assert.equal(result.javascript, 0);

// while without parenthesis is negative

var text = 'while name';

var result = checker.check(text, javascript);
assert.ok(result);
assert.equal(result.javascript, 0);

// if without parenthesis is negative

var text = 'if name';

var result = checker.check(text, javascript);
assert.ok(result);
assert.equal(result.javascript, 0);



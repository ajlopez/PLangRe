
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

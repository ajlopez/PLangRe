
var python = require('../lib/python'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker'),
    assert = require('assert');

// test reserved words

var text = "\
False      class      finally    is         return \
None       continue   for        lambda     try \
True       def        from       nonlocal   while \
and        del        global     not        with \
as         elif       if         or         yield \
assert     else       import     pass \
break      except     in         raise \
";

var tokens = tokenizer.getTokens(text);

for (var k = 0; k < tokens.length; k++)
    if (tokens[k].word)
        assert.equal(python.reservedWord(text, tokens, k, { }), 'python');

// import module

var result = checker.check("import module", python);
assert.ok(result);
assert.ok(result.python);
assert.equal(result.python, 2);

// import from module import

var result = checker.check("from module import *", python);
assert.ok(result);
assert.ok(result.python);
assert.equal(result.python, 3);

// shebang

var result = checker.check("#!/usr/bin/python", python);
assert.ok(result);
assert.ok(result.python);
assert.equal(result.python, 1);

// shebang with env

var result = checker.check("#!/usr/bin/env python", python);
assert.ok(result);
assert.ok(result.python);
assert.equal(result.python, 1);



var csharp = require('../lib/csharp'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker'),
    assert = require('assert');

// test reserved words

var text = "\
abstract as base bool break \
byte case catch char checked \
class const continue decimal default \
delegate do double else enum \
event explicit extern false finally \
fixed float for foreach goto \
if implicit in abstract as \
base bool break byte case \
catch char checked class const \
continue decimal default delegate do \
double else enum event explicit \
extern false finally fixed float \
for foreach goto if implicit \
in int int interface internal \
is lock long namespace new \
null object operator out override \
params private protected public readonly \
ref return sbyte sealed short \
sizeof stackalloc static string struct \
switch this throw true try \
typeof uint ulong unchecked unsafe \
ushort using virtual void volatile \
while";

var tokens = tokenizer.getTokens(text);

for (var k = 0; k < tokens.length; k++)
    if (tokens[k].word)
        assert.equal(csharp.reservedWord(text, tokens, k, { }), 'csharp');

// line comment

var text = '// a line comment';

var result = checker.check(text, csharp);
assert.ok(result);
assert.ok(result.csharp);
assert.equal(result.csharp, 1);

// comment

var text = '/* a comment */';

var result = checker.check(text, csharp);
assert.ok(result);
assert.ok(result.csharp);
assert.equal(result.csharp, 2);


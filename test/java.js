
var java = require('../lib/java'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker'),
    assert = require('assert');

// test reserved words

var text = "\
abstract continue for new switch \
assert default goto package	synchronized \
boolean do if private this \
break double implements protected throw \
byte else import public	throws \
case enum instanceof return transient \
catch extends int short try \
char final interface static void \
class finally long strictfp volatile \
const float native super while";

var tokens = tokenizer.getTokens(text);

for (var k = 0; k < tokens.length; k++)
    if (tokens[k].word)
        assert.equal(java.reservedWord(text, tokens, k, { }), 'java');

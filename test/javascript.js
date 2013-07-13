
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

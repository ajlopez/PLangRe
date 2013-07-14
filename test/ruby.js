
var ruby = require('../lib/ruby'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker'),
    assert = require('assert');

// test reserved words

var text = "\
BEGIN	do	next	then \
END	else	nil	true \
alias	elsif	not	undef \
and	end	or	unless \
begin	ensure	redo	until \
break	false	rescue	when \
case	for	retry	while \
class	if	return \
def	in	self	\
module	super";

var tokens = tokenizer.getTokens(text);

for (var k = 0; k < tokens.length; k++)
    if (tokens[k].word)
        assert.equal(ruby.reservedWord(text, tokens, k, { }), 'ruby', tokens[k].value);

// use checker

text = text + " defined? __LINE__ __FILE__";

var result = checker.check(text, ruby);
assert.ok(result);
assert.ok(result.ruby);
assert.equal(result.ruby, 39);

// shebang

text = "#!/usr/bin/ruby";

var result = checker.check(text, ruby);
assert.ok(result);
assert.ok(result.ruby);
assert.equal(result.ruby, 1);

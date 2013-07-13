
var ruby = require('../lib/ruby'),
    tokenizer = require('../lib/tokenizer'),
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
class	if	return	while \
def	in	self	\
module	super";

var tokens = tokenizer.getTokens(text);

for (var k = 0; k < tokens.length; k++)
    if (tokens[k].word)
        assert.equal(ruby.reservedWord(text, tokens, k, { }), 'ruby', tokens[k].value);
   



var ruby = require('../lib/ruby'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker');

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
    
exports['test reserved words'] = function (test) {
    var tokens = tokenizer.getTokens(text);

    for (var k = 0; k < tokens.length; k++)
        if (tokens[k].word)
            test.equal(ruby.reservedWord(text, tokens, k, { }), 'ruby', tokens[k].value);
}

exports['use checker'] = function (test) {
    var text2 = text + " defined? __LINE__ __FILE__";

    var result = checker.check(text2, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 39);
}

exports['shebang'] = function (test) {
    text = "#!/usr/bin/ruby";

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['require with single quote string'] = function (test) {
    var text = "require 'rack'";

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['require with double quote string'] = function (test) {
    var text = 'require "rack"';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['require with name'] = function (test) {
    var text = 'require modulename';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['lambda parameter 1'] = function (test) {
    var text = '|x|';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['lambda parameter 2'] = function (test) {
    var text = '| x y |';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['no lambda parameter'] = function (test) {
    var text = 'x || y';

    var result = checker.check(text, ruby);
    test.equal(Object.keys(result).length, 0);
}

exports['instance variable'] = function (test) {
    var text = '@name';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}

exports['class variable'] = function (test) {
    var text = '@@name';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 2);
}

exports['namespace'] = function (test) {
    var text = 'MyModule::MyClass';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 3);
}

exports['keyword'] = function (test) {
    var text = ':keyword';

    var result = checker.check(text, ruby);
    test.ok(result);
    test.ok(result.ruby);
    test.equal(result.ruby, 1);
}


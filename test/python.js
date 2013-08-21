
var python = require('../lib/python'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker');

exports['test reserved words'] = function (test) {
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
            test.equal(python.reservedWord(text, tokens, k, { }), 'python');
}

exports['import module'] = function (test) {
    var result = checker.check("import module", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

exports['import from module import'] = function (test) {
    var result = checker.check("from module import *", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 3);
}

exports['shebang'] = function (test) {
    var result = checker.check("#!/usr/bin/python", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 1);
}

exports['shebang with env'] = function (test) {
    var result = checker.check("#!/usr/bin/env python", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 1);
}

exports['class ... colon'] = function (test) {
    var result = checker.check("class Dog:", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

exports['if ... colon'] = function (test) {
    var result = checker.check("if x:", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

exports['while ... colon'] = function (test) {
    var result = checker.check("while x:", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

exports['for ... colon'] = function (test) {
    var result = checker.check("for x in y:", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 3);
}

exports['def ... colon'] = function (test) {
    var result = checker.check("def test():", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

exports['def with self'] = function (test) {
    var result = checker.check("def test(self, name):", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 3);
}

exports['__name__, __file__, __init__'] = function (test) {
    var result = checker.check("__name__ __file__ __init__", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 3);
}

exports['try:'] = function (test) {
    var result = checker.check("try:", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

exports['except ... colon'] = function (test) {
    var result = checker.check("except e:", python);
    test.ok(result);
    test.ok(result.python);
    test.equal(result.python, 2);
}

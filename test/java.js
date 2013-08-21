
var java = require('../lib/java'),
    tokenizer = require('../lib/tokenizer'),
    checker = require('../lib/checker');

exports['test reserved words'] = function (test) {
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
            test.equal(java.reservedWord(text, tokens, k, { }), 'java');
    var types = "\
        byte char short int long \
        float double boolean \
        String Object";

    var tokens = tokenizer.getTokens(types);

    for (var k = 0; k < tokens.length; k++)
        if (tokens[k].word)
            test.equal(java.typeWord(text, tokens, k, { }), 'java');
}

exports['line comment'] = function (test) {
    var text = '// a line comment';

    var result = checker.check(text, java);
    test.ok(result);
    test.ok(result.java);
    test.equal(result.java, 1);
}

exports['comment'] = function (test) {
    var text = '/* a comment */';

    var result = checker.check(text, java);
    test.ok(result);
    test.ok(result.java);
    test.equal(result.java, 2);
}

exports['semicolon, white space and new line'] = function (test) {
    var text = 'k;   \n';

    var result = checker.check(text, java);
    test.ok(result);
    test.equal(result.java, 1);
}

exports['semicolon, carriage return, new line'] = function (test) {
    var text = 'k;\r\n';

    var result = checker.check(text, java);
    test.ok(result);
    test.equal(result.java, 1);
}

exports['semicolon, white space, carriage return, new line'] = function (test) {
    var text = 'k;  \t\r\n';

    var result = checker.check(text, java);
    test.ok(result);
    test.equal(result.java, 1);
}

exports['import with dotted name'] = function (test) {
    var text = 'import java.io;';

    var result = checker.check(text, java);
    test.ok(result);
    test.equal(result.java, 2);
}

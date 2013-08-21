
var tokenizer = require('../lib/tokenizer.js');
    
exports['get tokens function'] = function (test) {
    test.ok(tokenizer.getTokens);
    test.equal(typeof tokenizer.getTokens, "function");
}

exports['get tokens on single char'] = function (test) {
    var result = tokenizer.getTokens(":");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 1);
    test.equal(token.value, ':');
}

exports['get tokens on two chars'] = function (test) {
    var result = tokenizer.getTokens(":;");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 1);
    test.equal(token.value, ':');
    var token = result[1];
    test.equal(token.start, 1);
    test.equal(token.length, 1);
    test.equal(token.value, ';');
}

exports['recognize white spaces'] = function (test) {
    var result = tokenizer.getTokens("   ");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 3);
    test.ok(token.whitespace);
    test.equal(token.value, '   ');
}

exports['process whitespace and character'] = function (test) {
    var result = tokenizer.getTokens("   ;");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);

    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 3);
    test.ok(token.whitespace);
    test.equal(token.value, '   ');

    var token = result[1];
    test.equal(token.start, 3);
    test.equal(token.length, 1);
    test.equal(token.value, ';');
}

exports['process new line'] = function (test) {
    var result = tokenizer.getTokens("\n");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);

    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 1);
    test.ok(!token.whitespace);
    test.ok(token.newline);
    test.equal(token.value, '\n');
}

exports['process carriage return and new line as new line'] = function (test) {
    var result = tokenizer.getTokens("\r\n");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);

    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 2);
    test.ok(!token.whitespace);
    test.ok(token.newline);
    test.equal(token.value, '\r\n');
}

exports['process digits'] = function (test) {
    var result = tokenizer.getTokens("1234567890");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);

    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 10);
    test.ok(!token.whitespace);
    test.ok(!token.newline);
    test.ok(token.digits);
    test.equal(token.value, '1234567890');
}

exports['process word'] = function (test) {
    var result = tokenizer.getTokens("ALFAbeta");
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);

    var token = result[0];
    test.equal(token.start, 0);
    test.equal(token.length, 8);
    test.ok(!token.whitespace);
    test.ok(!token.newline);
    test.ok(!token.digits);
    test.ok(token.word);
    test.equal(token.value, 'ALFAbeta');
}


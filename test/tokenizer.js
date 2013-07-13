
var tokenizer = require('../lib/tokenizer.js'),
    assert = require('assert');
    
// get tokens function

assert.ok(tokenizer.getTokens);
assert.equal(typeof tokenizer.getTokens, "function");

// get tokens on single char

var result = tokenizer.getTokens(":");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);
var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 1);
assert.equal(token.getValue(), ':');

// get tokens on two chars

var result = tokenizer.getTokens(":;");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 2);
var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 1);
assert.equal(token.getValue(), ':');
var token = result[1];
assert.equal(token.start, 1);
assert.equal(token.length, 1);
assert.equal(token.getValue(), ';');

// recognize white spaces

var result = tokenizer.getTokens("   ");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);
var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 3);
assert.ok(token.whitespace);
assert.equal(token.getValue(), '   ');

// process whitespace and character

var result = tokenizer.getTokens("   ;");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 2);

var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 3);
assert.ok(token.whitespace);
assert.equal(token.getValue(), '   ');

var token = result[1];
assert.equal(token.start, 3);
assert.equal(token.length, 1);
assert.equal(token.getValue(), ';');

// process new line

var result = tokenizer.getTokens("\n");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);

var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 1);
assert.ok(!token.whitespace);
assert.ok(token.newline);
assert.equal(token.getValue(), '\n');

// process carriage return and new line as new line

var result = tokenizer.getTokens("\r\n");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);

var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 2);
assert.ok(!token.whitespace);
assert.ok(token.newline);
assert.equal(token.getValue(), '\r\n');

// process digits

var result = tokenizer.getTokens("1234567890");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);

var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 10);
assert.ok(!token.whitespace);
assert.ok(!token.newline);
assert.ok(token.digits);
assert.equal(token.getValue(), '1234567890');



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
assert.equal(token.value, ':');

// get tokens on two chars

var result = tokenizer.getTokens(":;");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 2);
var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 1);
assert.equal(token.value, ':');
var token = result[1];
assert.equal(token.start, 1);
assert.equal(token.length, 1);
assert.equal(token.value, ';');

// recognize white spaces

var result = tokenizer.getTokens("   ");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);
var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 3);
assert.ok(token.whitespace);
assert.equal(token.value, '   ');

// process whitespace and character

var result = tokenizer.getTokens("   ;");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 2);

var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 3);
assert.ok(token.whitespace);
assert.equal(token.value, '   ');

var token = result[1];
assert.equal(token.start, 3);
assert.equal(token.length, 1);
assert.equal(token.value, ';');

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
assert.equal(token.value, '\n');

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
assert.equal(token.value, '\r\n');

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
assert.equal(token.value, '1234567890');

// process word

var result = tokenizer.getTokens("ALFAbeta");
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);

var token = result[0];
assert.equal(token.start, 0);
assert.equal(token.length, 8);
assert.ok(!token.whitespace);
assert.ok(!token.newline);
assert.ok(!token.digits);
assert.ok(token.word);
assert.equal(token.value, 'ALFAbeta');

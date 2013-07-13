
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
assert.equal(result[0], ':');


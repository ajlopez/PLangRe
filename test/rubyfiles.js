
var prangle = require('..'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert');
    
var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'ruby', 'gist01.rb')).toString();
var result = prangle.analyze(text);

assert.ok(result);
assert.equal(result, 'ruby');

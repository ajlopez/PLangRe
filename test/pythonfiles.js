
var prangle = require('..'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert');

processFile('gist01.py');

function processFile(filename) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'python', filename)).toString();
    var result = prangle.analyze(text);

    assert.ok(result);    assert.equal(result, 'python');
}

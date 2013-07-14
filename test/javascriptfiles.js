
var prangle = require('..'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert');

processFile('gist01.js');
processFile('gist02.js');processFile('gist03.js');
function processFile(filename) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'javascript', filename)).toString();
    var result = prangle.analyze(text);

    assert.ok(result);    assert.equal(result, 'javascript');
}

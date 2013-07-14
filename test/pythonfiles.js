
var prangle = require('..'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert');

processFile('gist01.py');
processFile('gist02.py');
processFile('gist03.py');
processFile('gist04.py');

function processFile(filename) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'python', filename)).toString();
    var result = prangle.analyze(text);

    assert.ok(result);    assert.equal(result, 'python');
}

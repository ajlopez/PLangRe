
var prangle = require('..'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert');

processFile('gist01.rb');
processFile('gist02.rb');
processFile('gist03.rb');processFile('gist04a.rb');
processFile('gist04b.rb');
processFile('gist04c.rb');
processFile('gist05.rb');
processFile('gist06.rb');
processFile('gist07.rb');

function processFile(filename) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'ruby', filename)).toString();
    var result = prangle.analyze(text);

    assert.ok(result);
    assert.equal(result, 'ruby');
}

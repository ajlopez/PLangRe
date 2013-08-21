
var prangle = require('..'),
    fs = require('fs'),
    path = require('path');

exports['process files'] = function (test) {
    processFile('gist01.js', test);
    processFile('gist02.js', test);    processFile('gist03.js', test);    processFile('gist04.js', test);    processFile('gist05.js', test);    processFile('gist06.js', test);    processFile('gist07.js', test);
}
function processFile(filename, test) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'javascript', filename)).toString();
    var result = prangle.analyze(text);

    test.ok(result);    test.equal(result, 'javascript');
}

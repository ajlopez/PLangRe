
var prangle = require('..'),
    fs = require('fs'),
    path = require('path');

exports['process files'] = function (test) {
    processFile('gist01.py', test);
    processFile('gist02.py', test);
    processFile('gist03.py', test);
    processFile('gist04.py', test);
    processFile('gist05.py', test);
}

function processFile(filename, test) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'python', filename)).toString();
    var result = prangle.analyze(text);

    test.ok(result);    test.equal(result, 'python');
}

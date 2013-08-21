
var prangle = require('..'),
    fs = require('fs'),
    path = require('path');

exports['process files'] = function (test) {
    processFile('gist01.rb', test);
    processFile('gist02.rb', test);
    processFile('gist03.rb', test);    processFile('gist04a.rb', test);
    processFile('gist04b.rb', test);
    processFile('gist04c.rb', test);
    processFile('gist05.rb', test);
    processFile('gist06.rb', test);
    processFile('gist07.rb', test);
}

function processFile(filename, test) {
    var text = fs.readFileSync(path.join(__dirname, '..', 'files', 'ruby', filename)).toString();
    var result = prangle.analyze(text);

    test.ok(result);
    test.equal(result, 'ruby');
}

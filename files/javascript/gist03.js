
// Are we serving the precached concatenated versions of our assets?
    if (config.compileJavascript &&
        path.extname(options.path) === '.js') {
        sendJavascriptFile(
            res,
            assets.compiledCache[path.basename(options.path, '.js')],
            options.maxAge);
    }
    // If not, serve it from the file cache
    else if (path.extname(options.path) === '.js') {
        sendJavascriptFile(
            res,
            assets.fileCache[path.basename(options.path, '.js')],
            options.maxAge);
    }
    // not javascript
    else {
        fs.stat(options.path, function(err, stat) {
            if (err) {
                return exports.notFound(req, res, next);
            }
 
            options.length = stat.size;
            options.modified = stat.mtime.toUTCString();
 
            var stream = fs.createReadStream(options.path, {});
            stream.on('error', function(err) {
                if (res.headerSent) {
                    log.error('Error sending file [' + options.path + ']', err);
                }
            });
 
            setSendFileHeaders(options, res);
            stream.pipe(res);
        });
    }
    
    
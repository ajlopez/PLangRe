
function Token(text, start, length) {
    this.text = text;
    this.start = start;
    this.length = length;
}

Token.prototype.getValue = function () {
    return this.text.substring(this.start, this.start + this.length);
}

function getTokens(text) {
    var l = text.length;
    var tokens = [];
    
    for (var k = 0; k < l; k++)
        tokens.push(new Token(text, k, 1));
        
    return tokens;
}

module.exports = {
    getTokens: getTokens
};

function Token(text, start, length) {
    this.text = text;
    this.start = start;
    this.length = length;
}

Token.prototype.getValue = function () {
    return this.text.substring(this.start, this.start + this.length);
}

function getTokens(text) {
    return [new Token(text, 0, text.length)];
}

module.exports = {
    getTokens: getTokens
};
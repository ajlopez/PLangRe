
var tokenizer = (function () {
    function Token(text, start, length) {
        this.text = text;
        this.start = start;
        this.length = length;
        this.value = text.substring(start, start + length);
    }

    function getTokens(text) {
        var l = text.length;
        var tokens = [];
        
        for (var k = 0; k < l; k++) {
            var start = k;
            var length = 1;
            var ch = text[k];
            var token;
            
            if (isWhiteSpace(ch)) {
                var ch2 = text[k+1];
                
                while (isWhiteSpace(ch2)) {
                    k++;
                    length++;
                    ch2 = text[k+1];
                }
                
                token = new Token(text, start, length);
                token.whitespace = true;
            }
            else if (isDigit(ch)) {
                var ch2 = text[k+1];
                
                while (isDigit(ch2)) {
                    k++;
                    length++;
                    ch2 = text[k+1];
                }
                
                token = new Token(text, start, length);
                token.digits = true;
            }
            else if (isLetter(ch)) {
                var ch2 = text[k+1];
                
                while (isLetter(ch2)) {
                    k++;
                    length++;
                    ch2 = text[k+1];
                }
                
                token = new Token(text, start, length);
                token.word = true;
            }
            else if (ch === '\n') {
                token = new Token(text, start, length);
                token.newline = true;
            }
            else if (ch === '\r') {
                if (text[k+1] === '\n') {
                    length++;
                    k++;
                    token = new Token(text, start, length);
                }
                else
                    token = new Token(text, start, length);
                    
                token.newline = true;
            }
            else
                token = new Token(text, start, length);
            
            tokens.push(token);
        }
            
        return tokens;
    }

    function isWhiteSpace(ch) {
        return ch && ch.length === 1 && ch <= ' ' && ch !== '\n' && ch !== '\r';
    }

    function isDigit(ch) {
        return ch && ch.length === 1 && ch >= '0' && ch <= '9';
    }

    function isLetter(ch) {
        return ch && ch.length === 1 && ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'));
    }

    return {
        getTokens: getTokens
    }
})();

if (module && module.exports)
    module.exports = tokenizer;

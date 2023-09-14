export enum Tokens {
    // KW_INT,
    // KW_FLOAT,
    // KW_STRING,
    KW_IF,
    KW_ELSE,
    KW_LET,
    IDENTIFIER,
    SB_LEFT_PAREN,
    SB_RIGHT_PAREN,
    SB_LEFT_BRACE,
    SB_RIGHT_BRACE,
    OP_SUM,
    OP_MINUS,
    OP_MULTIPLY,
    OP_DIVIDE,
    OP_ASSIGN,
    OP_EQUALITY,
    OP_DIFFERENCE,
    OP_GREATER,
    OP_GREATER_OR_EQUAL,
    OP_LOWER,
    OP_LOWER_OR_EQUAL,
    OP_FUNCTION_ARROW,
    CONDITIONAL_AND,
    CONDITIONAL_OR,
    SB_COMMA,
    SB_SEMICOLON,
    TYPE_INT,
    // TYPE_FLOAT,
    TYPE_STRING,
    TYPE_FUNCTION,
    DF_PRINT,
    UNKNOW_VALUE
}

export const Lexer = (code: string) => {
    // const line = 0;

    const automaton = () => {
        debugger;
        let position = 0;
        let tokens: any[] = [];

        const isSpace = (char: string) => {
            return /\s/.test(char);
        }

        const isOperator = (char: string) => {
            return /[-+=*\/!><]/.test(char);
        }

        const isAlfa = (char: string) => {
            return /[a-zA-Z]/.test(char);
        };

        const isNumeric = (char: string) => {
            return /[0-9]/.test(char);
        };

        const isSymbol = (char: string) => {
            return /[)(,;}{]/.test(char);
        };

        const isString = (char: string) => {
            return /"/.test(char);
        };

        const isConditional = (char: string) => {
            console.log(char);
            return /[|&]/.test(char);
        };

        while (position < code.length) {
            let oldTokenLength = tokens.length;

            if (isSpace(code[position])) {
                position++;
                continue;
            }

            if (isOperator(code[position])) {
                let result = code[position];
                position++;

                // Special Operators == or !=
                while (/^(==|!=)$/.test(result + code[position]) && position < code.length) {
                    result += code[position];
                    position++;
                }

                // Special Compare >= or <=
                while (/^(>=|<=)$/.test(result + code[position]) && position < code.length) {
                    result += code[position];
                    position++;
                }

                // Special Compare >= or <=
                while (/^=>$/.test(result + code[position]) && position < code.length) {
                    result += code[position];
                    position++;
                }

                if (result === '=') {
                    tokens.push(Tokens.OP_ASSIGN);
                } else if (result === '*') {
                    tokens.push(Tokens.OP_MULTIPLY);
                } else if (result === '+') {
                    tokens.push(Tokens.OP_SUM);
                } else if (result === '-') {
                    tokens.push(Tokens.OP_MINUS);
                }  else if (result === '/') {
                    tokens.push(Tokens.OP_DIVIDE);
                } else if (result === '==') {
                    tokens.push(Tokens.OP_EQUALITY);
                } else if (result === '!=') {
                    tokens.push(Tokens.OP_DIFFERENCE);
                } else if (result === '>') {
                    tokens.push(Tokens.OP_GREATER);
                } else if (result === '>=') {
                    tokens.push(Tokens.OP_GREATER_OR_EQUAL);
                } else if (result === '<') {
                    tokens.push(Tokens.OP_LOWER);
                } else if (result === '<=') {
                    tokens.push(Tokens.OP_LOWER_OR_EQUAL);
                } else if (result === '=>') {
                    tokens.push(Tokens.OP_FUNCTION_ARROW);
                }

                continue;
            }

            if (isAlfa(code[position])) {
                let result = code[position];
                position++;

                while (/^[a-zA-Z]+[a-zA-Z0-9]*$/.test(result + code[position]) && position < code.length) {
                    result += code[position];
                    position++;
                }

                // if (result === 'int') {
                //     tokens.push(Tokens.KW_INT);
                // } 
                
                // else if (result === 'float') {
                //     tokens.push(Tokens.KW_FLOAT);
                // } else 
                
                if (result === 'fn') {
                    tokens.push(Tokens.TYPE_FUNCTION);
                } else if (result === 'let') {
                    tokens.push(Tokens.KW_LET);
                } else if (result === 'else') {
                    tokens.push(Tokens.KW_ELSE);
                } else if (result === 'print') {
                    tokens.push(Tokens.DF_PRINT);
                } else {
                    tokens.push([Tokens.IDENTIFIER, result]);
                }

                continue;
            }

            if (isNumeric(code[position])) {
                let result = code[position];
                position++;

                while (/^[0-9]+$/.test(result + code[position]) && position < code.length) {
                    result += code[position];
                    position++;
                }

                // check is can be a float
                // if (code[position] === '.' && isNumeric(code[position + 1])) {
                //     result += code[position];
                //     position++;

                //     result += code[position];
                //     position++;

                //     while (/^[0-9]+\.[0-9]+$/.test(result + code[position]) && position < code.length) {
                //         result += code[position];
                //         position++;
                //     }

                //     tokens.push([Tokens.TYPE_FLOAT, parseFloat(result)]);
                // } else {
                    tokens.push([Tokens.TYPE_INT, parseInt(result)]);
                // }

                continue;
            }

            if (isSymbol(code[position])) {
                let result = code[position];
                position++;

                if (result === ',') {
                    tokens.push(Tokens.SB_COMMA);
                } else if (result === ';') {
                    tokens.push(Tokens.SB_SEMICOLON);
                } else if (result === '(') {
                    tokens.push(Tokens.SB_LEFT_PAREN);
                } else if (result === ')') {
                    tokens.push(Tokens.SB_RIGHT_PAREN);
                } else if (result === '{') {
                    tokens.push(Tokens.SB_LEFT_BRACE);
                } else if (result === '}') {
                    tokens.push(Tokens.SB_RIGHT_BRACE);
                }

                continue;
            }

            if (isString(code[position])) {
                let result = code[position];
                position++;
                let isFinalExecution = false;

                const validStringFormat = (value: string, code: string, position: number, result: string) => {
                    if (value === '"' && result.length === 1) {
                        return true;
                    }
                    
                    if (value === '"' && result.length > 1 && code[position - 1] === '\\') {
                        
                        return true;
                    }

                    if (value !== '"') {
                        return true;
                    }

                    if (value === '"') {
                        return false;
                    }
                };

                while (validStringFormat(code[position], code, position, result) && position < code.length) {
                    result += code[position];
                    position++;
                }

                result += '"';
                position++;

                tokens.push([Tokens.TYPE_STRING, result]);

                continue;
            }

            if (isConditional(code[position])) {
                let result = code[position];
                position++;

                while (/^(&&|\|\|)$/.test(result + code[position]) && position < code.length) {
                    result += code[position];
                    position++;
                }

                if (result === '&&') {
                    tokens.push(Tokens.CONDITIONAL_AND);
                } else if (result === '||') {
                    tokens.push(Tokens.CONDITIONAL_OR);
                }

                continue;
            }

            if (position < code.length && /\S/.test(code[position])) {
                tokens.push([Tokens.UNKNOW_VALUE, code[position]]);

                position++;
                continue;
            }

            if (oldTokenLength === tokens.length) {
                break;
            }
        }

        return tokens;
    };

    return automaton();
};
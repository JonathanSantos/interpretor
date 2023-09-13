enum TokenType {
    LET = 'LET',
    IDENTIFIER = 'IDENTIFIER',
    ASSIGN = 'ASSIGN',
    EQUALS = 'EQUALS',
    NOT_EQUALS = 'NOT_EQUALS',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    DIVIDE = 'DIVIDE',
    MULTIPLY = 'MULTIPLY',
    MOD = 'MOD',
    CONDITIONAL_IF = 'CONDITIONAL_IF',
    CONDITIONAL_ELSE = 'CONDITIONAL_ELSE',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    STRING = 'STRING',
    BOOLEAN = 'BOOLEAN',
    NIL = 'NIL',
    SEMICOLON = 'SEMICOLON',
    LEFT_PAREN = 'LEFT_PAREN',
    RIGHT_PAREN = 'RIGHT_PAREN',
    LEFT_BRACE = 'LEFT_BRACE',
    RIGHT_BRACE = 'RIGHT_BRACE',
    LEFT_BRACKET = 'LEFT_BRACKET',
    RIGHT_BRACKET = 'RIGHT_BRACKET',
    FUNCTION = 'FUNCTION',
    AND = 'AND',
    OR = 'OR',
}

interface Token {
    type: TokenType;
    value: string | number | boolean | null;
    line: number;
    columnStart: number;
    columnEnd: number;
}

export const Lexer = (input: string) => {
    let position = 0;
    let line = 0;

    const isWhiteSpace = (char: string): boolean => {
        if (char === '\n') {
            line++;
        }

        return char === ' ' || char === '\t' || char === '\n';
    };

    const readWhile = (predicate: (char: string) => boolean): string => {
        let result = '';

        while (position < input.length && predicate(input[position])) {
            result += input[position];
            position++;
        }

        return result;
    };

    const isInteger = (char: string) => {
        return /\d/.test(char);
    };

    const isAlpha = (char: string) => {
        return /[a-zA-Z]/.test(char);
    };

    const isEquals = (char: string) => {
        return /=/.test(char);
    };

    const isString = (char: string) => {
        return /"/.test(char);
    };

    const readNextToken = (): Token | null => {
        if (position >= input.length) {
            return null;
        }

        const currentChar = input[position];

        if (isWhiteSpace(currentChar)) {
            position++;
            return readNextToken();
        }

        if (isAlpha(currentChar)) {
            const value = readWhile(isAlpha);

            if (value === 'let') {
                return {
                    type: TokenType.LET,
                    value,
                    line,
                    columnStart: position - value.length,
                    columnEnd: position
                }
            }

            if (value === 'if') {
                return {
                    type: TokenType.CONDITIONAL_IF,
                    value,
                    line,
                    columnStart: position - value.length,
                    columnEnd: position
                }
            }

            return {
                type: TokenType.IDENTIFIER,
                value,
                line,
                columnStart: position - value.length,
                columnEnd: position
            };
        }

        if (isInteger(currentChar)) {
            const value = readWhile(isInteger);

            return {
                type: TokenType.INTEGER,
                value: parseInt(value),
                line,
                columnStart: position - value.length,
                columnEnd: position
            };
        }

        if (currentChar === '=') {
            const value = readWhile(isEquals);

            position++;

            if (value === '==') {
                return {
                    type: TokenType.EQUALS,
                    value,
                    line,
                    columnStart: position - value.length,
                    columnEnd: position,
                };
            }

            return {
                type: TokenType.ASSIGN,
                value: '=',
                line,
                columnStart: position,
                columnEnd: position
            };
        }
      
        if (currentChar === '+') {
            position++;

            return {
                type: TokenType.PLUS,
                value: '+',
                line,
                columnStart: position,
                columnEnd: position
            };
        }
      
        if (currentChar === ';') {
            position++;

            return {
                type: TokenType.SEMICOLON,
                value: ';',
                line,
                columnStart: position,
                columnEnd: position
            };
        }

        return null;
    };

    const tokenize = (): Token[] => {
        const tokens: Token[] = [];
        let token: Token | null;

        while ((token = readNextToken())) {
            tokens.push(token);
        }

        return tokens;
    };

    return tokenize();
};
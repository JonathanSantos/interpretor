import { Lexer, Tokens } from '../rinha-language';

console.clear();
console.log('Lexer Executation\n');

const test = () => {
    const code = [
        `
    let sum = fn (n) => {
        if (n == 1) {
            n
        } else {
            n + sum(n - 1)
        }
    };
        
    print (sum(5))
    `,
    `
    print ("Hello world")
    `,
    ` 
    let fib = fn (n) => {
        if (n < 2) {
          n
        } else {
          fib(n - 1) + fib(n - 2)
        }
    };
      
    print(fib(10))
    `,
    `
    let combination = fn (n, k) => {
        let a = k == 0;
        let b = k == n;
        if (a || b)
        {
            1
        }
        else {
            combination(n - 1, k - 1) + combination(n - 1, k)
        }
    };
    
    print(combination(10, 2))
    `
    ];

   const execute = (code: string) => {
        const tokens = Lexer(code).map((receivedValue) => {
            let type;
            let value;
            
            if (receivedValue instanceof Array) {
                type = Tokens[receivedValue[0]];
                value = receivedValue[1];
            } else {
                type = Tokens[receivedValue];
            }

            return `${type}${ value != undefined ? `-${value}` : '' }`;
        }).join(' ');

        console.log(code);
        console.log(tokens);
        console.log('\n\n--------------------------- *** ---------------------------\n');
   }

   code.forEach((code) => execute(code));
};

test();
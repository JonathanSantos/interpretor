// import { io } from '../io';

import { Lexer } from '../rinha-language';

// const code = io.getInputString();
// const executor = new Execution(new GenerateASTRinhaLanguage(), new InterpreterRinhaLanguage());

// executor.process();
// executor.execute();

console.clear();
console.log('Lexer Executation\n');

console.log(
    Lexer(
`let a == 
10;`
    )
); 

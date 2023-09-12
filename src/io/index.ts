import { readFileSync } from 'fs';

export const io = {
    getInputString() {
        return readFileSync('./src/input/fibonacci.rinha', 'utf8');
    }
};
import { io } from '../io';
import { Interpretor } from '../ast';

const code = io.getInputString();
const interpretor = new Interpretor(code);

interpretor.process();
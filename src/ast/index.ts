export class Interpretor {
    code: string;

    constructor (code: string) {
        this.code = code;
    }

    sanitize(code: string) {
        return code
            .replace(/\n{2,}/g, ' ');
    }

    process() {
        console.log(this.sanitize(this.code));
    }
}
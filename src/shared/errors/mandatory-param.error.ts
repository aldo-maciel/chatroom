export class MandatoryParamError extends Error {

    constructor(message: string) {
        super();
        this.name = 'MandatoryParam';
        this.message = message;
    }
}

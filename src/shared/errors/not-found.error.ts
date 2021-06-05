export class NotFoundError extends Error {

    constructor(message: string) {
        super();
        this.name = 'NotFound';
        this.message = message;
    }
}

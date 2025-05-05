export class User {
    constructor(
        public email: string,
        private _token: string,
    ) {}

    get token() {
        if (this._token === null) {
            return null;
        }
        return this._token;
    }
}
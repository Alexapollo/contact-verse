export class Contact {
    ContactId: number;
    Name: string;
    Email: string;
    Address: string;

    constructor() {
        this.ContactId = 0;
    }
}

export class Telephone {
    TelephoneId: number;
    Number: number;
    ContactId: number;

    constructor() {
        this.TelephoneId = 0;
    }
}
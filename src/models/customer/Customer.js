class Customer {
    constructor({
        id, name, phone, email, photo,
    }) {
        this._id = id;
        this._name = name;
        this._phone = phone;
        this._email = email;
        this._photo = photo;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get phone() {
        return this._phone;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get token() {
        return this._token;
    }

    set name(newValue) {
        this._name = newValue;
    }

    set phone(newValue) {
        this._phone = newValue;
    }

    set photo(newValue) {
        this._photo = newValue;
    }

    set email(newValue) {
        this._email = newValue;
    }


    toJSON() {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            photo: this.photo,
            token: this.token,
        };
    }
}

export default Customer;

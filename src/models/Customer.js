class Customer {
  constructor({
    id, name, surname, phone, email, photo, password,
  }) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._phone = phone;
    this._email = email;
    this._photo = photo;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get surname() {
    return this._surname;
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

  get name() {
    return this._name;
  }

  get token() {
    return this._token;
  }

  set name(newValue) {
    this._name = newValue;
  }

  set surname(newValue) {
    this._surname = newValue;
  }

  set phone(newValue) {
    this._phone = newValue;
  }

  set email(newValue) {
    this._email = newValue;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      photo: this.photo,
      password: this.password,
    };
  }
}

export default Customer;

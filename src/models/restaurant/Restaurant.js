class Restaurant {
    constructor({
      id, name, phone, email, photo, description,password,
    }) {
      this._id = id;
      this._name = name;
      this._phone = phone;
      this._email = email;
      this._photo = photo;
      this._description = description;
      this._password = password;
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
  
    get description() {
        return this._description;
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
  
    set phone(newValue) {
      this._phone = newValue;
    }
  
    set photo(newValue) {
      this._photo = newValue;
    }
  
    set email(newValue) {
      this._email = newValue;
    }

    set description(newValue) {
        this._description = newValue;
      }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        phone: this.phone,
        email: this.email,
        photo: this.photo,
        description: this.description,
        password: this.password,
      };
    }
  }
  
  export default Restaurant;
  
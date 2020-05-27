class MenuRestaurant {
    constructor({
        id, restaurantId, name, description, price, photo
    }) {
        this._id = id;
        this._restaurantId = restaurantId;
        this._name = name;
        this._description = description;
        this._price = price;
        this._photo = photo;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get restaurantId() {
        return this._restaurantId;
    }

    get price() {
        return this._price;
    }

    get photo() {
        return this._photo;
    }

    get description() {
        return this._description;
    }

    get token() {
        return this._token;
    }

    set name(newValue) {
        this._name = newValue;
    }

    set price(newValue) {
        this._price = newValue;
    }

    set description(newValue) {
        this._description = newValue;
    }

    set restaurantId(newValue) {
        this._restaurantId = newValue;
    }

    toJSON() {
        return {
            id: this.id,
            restaurantId: this.restaurantId,
            name: this.name,
            description: this.description,
            price: this.price,
            photo: this.photo,
        };
    }
}

export default MenuRestaurant;

class Basket {
    constructor({
        id, customerId, menuRestaurantId, nameMenuRestaurant, price, amount,
    }) {
        this._id = id;
        this._customerId = customerId;
        this._menuRestaurantId = menuRestaurantId;
        this._nameMenuRestaurant = nameMenuRestaurant;
        this._price = price;
        this._amount = amount;
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }

    get menuRestaurantId() {
        return this._menuRestaurantId;
    }

    get nameMenuRestaurant() {
        return this._nameMenuRestaurant;
    }

    get price() {
        return this._price;
    }

    get amount() {
        return this._amount;
    }

    get token() {
        return this._token;
    }

    set customerId(newValue) {
        this._customerId = newValue;
    }

    set menuRestaurantId(newValue) {
        this._menuRestaurantId = newValue;
    }

    set nameMenuRestaurant(newValue) {
        this._nameMenuRestaurantrant = newValue;
    }

    set amount(newValue) {
        this._amount = newValue;
    }

    set price(newValue) {
        this._price = newValue;
    }

    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            menuRestaurantId: this.menuRestaurantId,
            nameMenuRestaurant: this.nameMenuRestaurant,
            amount: this.amount,
            price: this.price,
            token: this.token,
        };
    }
}

export default Basket;

class CustomerRestaurant {
    constructor({
        id, customerId, restaurantId, restaurantName,
    }) {
        this._id = id;
        this._customerId = customerId;
        this._restaurantId = restaurantId;
        this._restaurantName = restaurantName;
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }

    get restaurantId() {
        return this._restaurantId;
    }

    get restaurantName() {
        return this._restaurantName;
    }

    set customerId(newValue) {
        this._customerId = newValue;
    }

    set restaurantId(newValue) {
        this._restaurantId = newValue;
    }

    set restaurantName(newValue) {
        this._restaurantName = newValue;
    }

    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            restaurantId: this.restaurantId,
            restaurantName: this.restaurantName,
        };
    }
}

export default CustomerRestaurant;

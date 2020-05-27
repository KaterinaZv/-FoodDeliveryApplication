class Order {
    constructor({
        id, customerId, nameMenuRestaurant, amount, sumOfOrder, phone, address, createdTime, statusOrder,
    }) {
        this._id = id;
        this._customerId = customerId;
        this._nameMenuRestaurant = nameMenuRestaurant;
        this._amount = amount;
        this._sumOfOrder = sumOfOrder;
        this._phone = phone;
        this._address = address;
        this._createdTime = createdTime;
        this._statusOrder = statusOrder;
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }

    get nameMenuRestaurant() {
        return this._nameMenuRestaurant;
    }

    get amount() {
        return this._amount;
    }

    get phone() {
        return this._phone;
    }

    get sumOfOrder() {
        return this._sumOfOrder;
    }

    get address() {
        return this._address;
    }

    get createdTime() {
        return this._createdTime;
    }

    get statusOrder() {
        return this._statusOrder;
    }

    get token() {
        return this._token;
    }

    set customerId(newValue) {
        this._customerId = newValue;
    }

    set nameMenuRestaurant(newValue) {
        this._nameMenuRestaurantrant = newValue;
    }

    set amount(newValue) {
        this._amount = newValue;
    }

    set phone(newValue) {
        this._phone = newValue;
    }

    set sumOfOrder(newValue) {
        this._sumOfOrder = newValue;
    }

    set address(newValue) {
        this._address = newValue;
    }

    set createdTime(newValue) {
        this._createdTime = newValue;
    }

    set statusOrder(newValue) {
        this._statusOrder = newValue;
    }


    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            nameMenuRestaurant: this.nameMenuRestaurant,
            amount: this.amount,
            sumOfOrder: this.sumOfOrder,
            phone: this.phone,
            address: this.address,
            createdTime: this.createdTime,
            statusOrder: this.statusOrder,
            token: this.token,
        };
    }
}

export default Order;

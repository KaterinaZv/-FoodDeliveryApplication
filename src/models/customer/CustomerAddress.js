class CustomerAddress {
    constructor({ id, customerId, address }) {
        this._id = id;
        this._customerId = customerId;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }

    get address() {
        return this._address;
    }

    set address(newValue) {
        this._address = newValue;
    }

    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            address: this.address,
        };
    }
}

export default CustomerAddress;

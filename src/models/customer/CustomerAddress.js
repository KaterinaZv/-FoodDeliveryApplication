class CustomerAddress {
    constructor({ id, customer_id ,address }) {
        this._id = id;
        this._customer_id = customer_id;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    get customer_id() {
        return this._customer_id;
    }

    get address() {
        return this._address;
    }

    set addres(newValue) {
        this._address = newValue;
    }

    toJSON() {
        return {
            id: this.id,
            customer_id: this.customer_id,
            address: this.address,
        };
    }
}

export default CustomerAddress;

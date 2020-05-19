import Customer from '../models/customer/Customer.js';

import CustomerAddress from '../models/customer/CustomerAddress.js';

export class CustomerRepository {
    constructor(pool) {
        this._pool = pool;
    }

    async getCustomer(email) {

        const rawCustomer = await this._pool.query('SELECT * FROM public."customer" WHERE email = $1;', [email]);

        let customer = new Customer({
            id: rawCustomer.rows[0].id,
            email: rawCustomer.rows[0].email,
        })

        return customer;
    }

    async getCustomerById(id) {

        const rawCustomer = await this._pool.query('SELECT * FROM public."customer" WHERE id = $1;', [id]);

        let customer = new Customer({
            id: rawCustomer.rows[0].id,
            email: rawCustomer.rows[0].email,
        });

        return customer;
    }

    async createCustomer(email, password) {
        const rawCustomer = await this._pool.query(
            'INSERT INTO public."customer" (email, password) VALUES ($1, $2) RETURNING *;', [email, password]);

    let customer = new Customer({
        id: rawCustomer.rows[0].id,
        email: rawCustomer.rows[0].email,
    });
        return customer;
    }

    async updateCustomer(customer) {

        const customerRaw = await this._pool.query('UPDATE public."customer" SET name=$2, surname=$3, phone=$4, email=$5, photo=$6 WHERE id=$1 RETURNING *;', [
            customer.id,
            customer.name,
            customer.phone,
            customer.email,
        ]);

        //console.log(customerRaw);

        return new Customer({
            id: customerRaw.rows[0].id,
            name: customerRaw.rows[0].name,
            phone: customerRaw.rows[0].phone,
            email: customerRaw.rows[0].email,
            password: customerRaw.rows[0].password
        })

    }

    async createCustomerAddress(customer_id, address) {
        const rawId = await this._pool.query('SELECT id FROM public."customer" WHERE id=$1', [customer_id]);

        const customerAddressRaw = await this._pool.query('INSERT INTO public."customer_address" (customer_id, address) VALUES ($1, $2) RETURNING *;', [rawId.rows[0].id, address]);

        return new CustomerAddress ({
            id: customerAddressRaw.rows[0].id,
            customer_id: customerAddressRaw.rows[0].customer_id,
            address: customerAddressRaw.rows[0].address,
        });

    }
}

import Customer from '../models/Customer.js';

export class CustomerRepository {
    constructor(pool) {
        this._pool = pool;
    }

    async getCustomer(email) {

        const rawCustomer = await this._pool.query('SELECT * FROM public."customer" WHERE email = $1;', [email]);

        let customer = new Customer({
            id: rawCustomer.rows[0].id,
            name: rawCustomer.rows[0].name,
            surname: rawCustomer.rows[0].surname,
            phone: rawCustomer.rows[0].phone,
            email: rawCustomer.rows[0].email,
            photo: rawCustomer.rows[0].photo
        })

        return customer;
    }

    async getCustomerById(id) {

        const rawCustomer = await this._pool.query('SELECT * FROM public."customer" WHERE id = $1;', [id]);

        let customer = new Customer({
            id: rawCustomer.rows[0].id,
            name: rawCustomer.rows[0].name,
            surname: rawCustomer.rows[0].surname,
            phone: rawCustomer.rows[0].phone,
            email: rawCustomer.rows[0].email,
            photo: rawCustomer.rows[0].photo
        });

        return customer;
    }

    async createCustomer(name, surname, phone, email, photo, password) {
        const rawCustomer = await this._pool.query(
            'INSERT INTO public."customer" (name, surname, phone, email, photo, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [name, surname, phone, email, photo, password]);

    let customer = new Customer({
        id: rawCustomer.rows[0].id,
        name: rawCustomer.rows[0].name,
        surname: rawCustomer.rows[0].surname,
        phone: rawCustomer.rows[0].phone,
        email: rawCustomer.rows[0].email,
        photo: rawCustomer.rows[0].photo,
        password: rawCustomer.rows[0].password
    });

        return customer;
    }

    async updateCustomer(customer) {

        const customerRaw = await this._pool.query('UPDATE public."customer" SET name=$2, surname=$3, phone=$4, email=$5, photo=$6 WHERE id=$1 RETURNING *;', [
            customer.id,
            customer.name,
            customer.surname,
            customer.phone,
            customer.email,
            customer.photo
        ]);

        console.log(customerRaw);

        return new Customer({
            id: customerRaw.rows[0].id,
            name: customerRaw.rows[0].name,
            surname: customerRaw.rows[0].surname,
            phone: customerRaw.rows[0].phone,
            email: customerRaw.rows[0].email,
            photo: customerRaw.rows[0].photo,
            password: customerRaw.rows[0].password
        })

    }
}

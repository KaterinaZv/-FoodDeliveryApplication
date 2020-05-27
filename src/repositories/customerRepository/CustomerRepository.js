import Customer from '../../models/customer/Customer.js';
import CustomerAddress from '../../models/customer/CustomerAddress.js';
import CustomerRestaurant from '../../models/customer/CustomerRestaurant.js';


class CustomerRepository {
    constructor(pool) {
        this._pool = pool;
    }

    async getCustomer(email) {
        const rawCustomer = await this._pool.query('SELECT * FROM public."customer" WHERE email = $1;', [email]);

        const customer = new Customer({
            id: rawCustomer.rows[0].id,
            name: rawCustomer.rows[0].name,
            email: rawCustomer.rows[0].email,
        });
        customer._password = rawCustomer.rows[0].password;

        return customer;
    }

    async getCustomerById(id) {
        const rawCustomer = await this._pool.query('SELECT * FROM public."customer" WHERE id = $1;', [id]);

        const customer = new Customer({
            id: rawCustomer.rows[0].id,
            email: rawCustomer.rows[0].email,
        });
        customer._password = rawCustomer.rows[0].password;

        return customer;
    }

    async findByEmailAndId(id, email) {
        const customerRaw = await this._pool.query(
            'SELECT * FROM public."customer" WHERE id=$1 AND email=$2;',
            [id, email],
        );

        const customer = new Customer({
            id: customerRaw.rows[0].id,
            email: customerRaw.rows[0].email,
        });
        customer._password = customerRaw.rows[0].password;

        return customer;
    }

    async createCustomer({ email, password }) {
        const rawCustomer = await this._pool.query(
            'INSERT INTO public."customer" (email, password) VALUES ($1, $2) RETURNING *;', [email, password],
        );

        const customer = new Customer({
            id: rawCustomer.rows[0].id,
            email: rawCustomer.rows[0].email,
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
            customer.photo,
        ]);

        return new Customer({
            id: customerRaw.rows[0].id,
            name: customerRaw.rows[0].name,
            phone: customerRaw.rows[0].phone,
            email: customerRaw.rows[0].email,
        });
    }

    async createCustomerAddress(customerId, address) {
        const customerAddressRaw = await this._pool.query('INSERT INTO public."customer_address" (customer_id, address) VALUES ($1, $2) RETURNING *;', [customerId, address]);

        return new CustomerAddress({
            id: customerAddressRaw.rows[0].id,
            customerId,
            address: customerAddressRaw.rows[0].address,
        });
    }

    async getCustomerAddress(customerId) {
        const customerAddresses = [];
        const customerAddressesRaw = await this._pool.query('SELECT * FROM public."customer_address" WHERE customer_id=$1', [customerId]);

        customerAddressesRaw.rows.forEach((customerAddr) => {
            const customerAddress = new CustomerAddress({
                address: customerAddr.address,
            });
            customerAddresses.push(customerAddress);
        });
        return customerAddresses;
    }

    async createCustomerRestaurant(customerId, restaurantName) {
        const rawRestaurantId = await this._pool.query('SELECT id FROM public."restaurant" WHERE name=$1;', [restaurantName]);

        const rawCustomerRestaurant = await this._pool.query('INSERT INTO public."customer_restaurants" (customer_id, restaurant_id, restaurant_name) VALUES ($1, $2, $3) RETURNING *;', [customerId, rawRestaurantId.rows[0].id, restaurantName]);

        return new CustomerRestaurant({
            id: rawCustomerRestaurant.rows[0].id,
            customerId: rawCustomerRestaurant.rows[0].customer_id,
            restaurantId: rawRestaurantId.rows[0].id,
            restaurantName: rawCustomerRestaurant.rows[0].restaurant_name,
        });
    }

    async getCustomerRestaurant(customerId) {
        const customerRestaurants = [];
        const rawCustomerRestaurants = await this._pool.query('SELECT * FROM public."customer_restaurants" WHERE customer_id=$1', [customerId]);

        rawCustomerRestaurants.rows.forEach((restaurant) => {
            const restaurantList = new CustomerRestaurant({
                restaurantName: restaurant.restaurant_name,
            });
            customerRestaurants.push(restaurantList);
        });
        return customerRestaurants;
    }
}

export default CustomerRepository;

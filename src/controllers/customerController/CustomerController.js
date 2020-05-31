import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerRepository from '../../repositories/customerRepository/CustomerRepository.js';

class CustomerController {
    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.createCustomerAddress = this.createCustomerAddress.bind(this);
        this.getCustomerAddress = this.getCustomerAddress.bind(this);
        this.createCustomerRestaurant = this.createCustomerRestaurant.bind(this);
        this.getCustomerRestaurant = this.getCustomerRestaurant.bind(this);
        this.deleteCustomerAddress = this.deleteCustomerAddress.bind(this);
        this.deleteCustomerRestaurant = this.deleteCustomerRestaurant.bind(this);

        this.customerRepository = new CustomerRepository(pool);
    }

    async get(request, response, next) {
        try {
            const { email } = request.body;
            if (email !== undefined) {
                const customer = await this.customerRepository.getCustomer(email);
                response.json(customer);
            } else {
                next(new Error('Invalid customer email'));
            }
        } catch (e) {
            next(new Error('Invalid customer information'));
        }
    }

    async create(request, response) {
        const { email, password } = request.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const customer = await this.customerRepository.createCustomer({ email, password: hash });

        customer._token = jwt.sign({
            email: customer.email,
            id: customer.id,
        }, hash, {
            expiresIn: '24h',
        });

        response.json(customer);
    }

    async login(request, response, next) {
        try {
            const { email } = request.body;
            const { password } = request.body;

            const customer = await this.customerRepository.getCustomer(email);

            if (bcrypt.compareSync(password, customer.password) === true) {
                customer._token = jwt.sign({
                    email: customer.email,
                    id: customer.id,
                }, customer.password, {
                    expiresIn: '24h',
                });

                response.json(customer);
            } else {
                next(new Error('Invalid auth data'));
            }
        } catch (e) {
            next(new Error('Invalid customer information'));
        }
    }

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const customerRequest = request.body;

            if (id) {
                const customerInDataBase = await this.customerRepository.getCustomerById(id);

                Object.getOwnPropertyNames(customerRequest).forEach((prop) => {
                    customerInDataBase[prop] = customerRequest[prop];
                });

                const updateData = await this.customerRepository.updateCustomer(
                    customerInDataBase,
                );
                response.json(updateData);
            } else {
                next(new Error('Not found customer with this id'));
            }
        } catch (e) {
            console.log(e);
            next(new Error('Error update'));
        }
    }

    delete(request, response) {
        response.send('Delete customer');
    }

    async createCustomerAddress(request, response) {
        const { id } = request.params;
        const { address } = request.body;

        const customerAddress = await this.customerRepository.createCustomerAddress(id, address);
        response.send(customerAddress);
    }

    async getCustomerAddress(request, response) {
        const { id } = request.params;

        const customerAddress = await this.customerRepository.getCustomerAddress(id);
        response.send(customerAddress);
    }

    async deleteCustomerAddress(request, response) {
        const { id } = request.params;
        const { address } = request.body;
        try {
            await this.customerRepository.deleteCustomerAddress(id, address);
            response.send('Address removed');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async createCustomerRestaurant(request, response) {
        try {
            const { id } = request.params;
            const { restaurantName } = request.body;

            const customerRestaurant = await this.customerRepository.createCustomerRestaurant(id, restaurantName);
            response.send(customerRestaurant);
        } catch (e) {
            console.log(e);
            next(new Error('Error create favor restaurant'));
        }
    }

    async getCustomerRestaurant(request, response) {
        try {
            const { id } = request.params;

            const customerRestaurant = await this.customerRepository.getCustomerRestaurant(id);
            response.send(customerRestaurant);
        } catch (e) {
            console.log(e);
            next(new Error('Error get favor restaurants'));
        }
    }

    async deleteCustomerRestaurant(request, response) {
        const { id } = request.params;
        const { restaurantName } = request.body;
        try {
            await this.customerRepository.deleteCustomerRestaurant(id, restaurantName);
            response.send('Restaurant removed');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }
}

export default CustomerController;

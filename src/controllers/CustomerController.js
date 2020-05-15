
import { CustomerRepository } from '../repositories/CustomerRepository.js';


class CustomerController {
    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.createCustomerAddress = this.createCustomerAddress.bind(this);

        this.customerRepository = new CustomerRepository(pool);
    }

    async get(request, response, next) {
        try {
            const { email } = request.params;
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

    async create(request, response, next) {

        const email = request.body.email;
        const password = request.body.password;

        const customer = await this.customerRepository.createCustomer( email, password);

        response.send(customer);
    }

    async createCustomerAddress(request, response, next) {

        const customer_id = request.body.customer_id;
        const address = request.body.address;

        const customerAddress = await this.customerRepository.createCustomerAddress(customer_id, address);

        response.send(customerAddress);
    }

    async update(request, response, next) {
        console.log(request);
        try {
            const { id } = request.params;
            const customerRequest = request.body;

            if (id) {
                const customerInDataBase = await this.customerRepository.getCustomerById(id);

                Object.getOwnPropertyNames(customerRequest).forEach(function(prop) {
                    if (customerInDataBase[prop] !== undefined) {
                        customerInDataBase[prop] =customerRequest[prop];
                    }
                });

                const updateData = await this.customerRepository.updateCustomer(
                    customerInDataBase
                );
                response.json(updateData);

            } else {
                next(new Error('Not found customer with this id'));
            }
        } catch (e) {
            console.log(e)
            next(new Error('Error update'));
        }

    }

    delete(request, response, next) {
        response.send('Delete customer')
    }
}

export default CustomerController;

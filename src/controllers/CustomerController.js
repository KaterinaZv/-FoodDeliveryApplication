import Customer from '../models/Customer.js';
import { CustomerRepository } from '../repositories/CustomerRepository.js';


class CustomerController {
    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

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

        const name = request.body.name;
        const surname = request.body.surname;
        const phone = request.body.phone;
        const email = request.body.email;
        const photo = request.body.photo;
        const password = request.body.password;

        const customer = await this.customerRepository.createCustomer(name, surname, phone, email, photo, password);

        response.send(customer);
    }

    async update(request, response, next) {
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

                console.log(customerInDataBase.id);
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

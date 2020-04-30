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

                const customerReqKey = Object.keys(customerRequest);
                for (var i = 0, l = customerReqKey.length; i < l; i++) {
                    for (let key in customerInDataBase) {
                        const cleanKey = key.slice(1);
                        if ( cleanKey == customerReqKey[i]) {
                            customerInDataBase[key] = customerRequest[customerReqKey[i]];
                        } else  {
                            new Error('No suitable key found');
                        }
                    }
                    const name = customerInDataBase.name;
                    const surname = customerInDataBase.surname;
                    const phone = customerInDataBase.phone;
                    const email = customerInDataBase.email;
                    const photo = customerInDataBase.photo;
                    const password = customerInDataBase.password;

                    console.log(customerInDataBase.id);
                    const updateData = await this.customerRepository.updateCustomer(customerInDataBase, name, surname, phone, email, photo, password);
                    response.json(updateData);
                }
            } else {
                next(new Error('Not found customer with this id'));
            }
        } catch (e) {
            next(new Error('Error update'));
        }

    }

    delete(request, response, next) {
        response.send('Delete customer')
    }
}

export default CustomerController;

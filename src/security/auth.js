import jwt            from 'jsonwebtoken';
import CustomerRepository from '../repositories/customerRepository/CustomerRepository.js';
import pool           from '../database.js';

class Security {
    async checkCustomer(request, response, next) {
        const customerRepository = new CustomerRepository(pool);
        try {
            if (request.headers.authorization !== undefined) {
                const token = request.headers.authorization.split(' ')[1];
                const decoded = await jwt.decode(token);
                const customer = await customerRepository.findByEmailAndId(decoded.id, decoded.email);
                if (customer !== null && await jwt.verify(token, customer.password) !== null) {
                    request.customer = customer;
                    next();
                } else {
                    next(new Error('Invalid auth data'));
                }
            } else {
                next(new Error('Invalid auth data'));
            }
        } catch (e) {
            console.log(e);
            next(new Error('Not autorized customer'));
        }
    }
}

export default Security;

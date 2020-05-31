import express from 'express';
import request from 'supertest';
import CustomerRouter from '../src/routers/customerRouter/CustomerRouter.js';
import CustomerRepository from '../src/repositories/customerRepository/CustomerRepository.js';
import Customer from '../src/models/customer/Customer.js';

const app = express();

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

jest.mock('../src/repositories/customerRepository/CustomerRepository.js');

const customer = new Customer({
    id: 1,
    email: 'wilson@gmail.com',
});

describe('Test for customer should return success answer:', () => {
    test('Get method', async () => {
        CustomerRepository.mockImplementation(() => ({
            getCustomer: () => customer,
        }));

        const customerRouter = new CustomerRouter(pool);
        const res = await request(app.use('/api/customers', customerRouter.router)).get('/api/customers');

        const response = res.body;

        expect(JSON.stringify(response)).toEqual(JSON.stringify({ id: 1, email: 'any' }));
    });
});

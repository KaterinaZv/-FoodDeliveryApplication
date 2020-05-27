import express from 'express';
import Auth from '../../security/auth.js';
import CustomerController from '../../controllers/customerController/CustomerController.js';
import BasketController from '../../controllers/orders/BasketController.js';
import OrderController from '../../controllers/orders/OrderController.js';

class CustomerRouter {
    constructor(pool) {
        this._router = express.Router();
        this._customerController = new CustomerController(pool);
        this._security = new Auth();
        this._basketController = new BasketController(pool);
        this._orderController = new OrderController(pool);

        this._router.route('/').post(this._customerController.create);
        this._router.route('/login').post(this._customerController.login);

        this._router.route('/').get(this._security.checkCustomer, this._customerController.get);
        this._router.route('/:id').put(this._security.checkCustomer, this._customerController.update);
        this._router.route('/:id').delete(this._security.checkCustomer, this._customerController.delete);

        this._router.route('/:id/address').post(this._security.checkCustomer, this._customerController.createCustomerAddress);
        this._router.route('/:id/address').get(this._security.checkCustomer, this._customerController.getCustomerAddress);

        this._router.route('/:id/favorRestaurant').post(this._security.checkCustomer, this._customerController.createCustomerRestaurant);
        this._router.route('/:id/favorRestaurant').get(this._security.checkCustomer, this._customerController.getCustomerRestaurant);

        this._router.route('/:id/basket/order').post(this._security.checkCustomer, this._orderController.create);
        this._router.route('/:id/basket/order').get(this._security.checkCustomer, this._orderController.get);

        this._router.route('/:id/basket').post(this._security.checkCustomer, this._basketController.create);
        this._router.route('/:id/basket').get(this._security.checkCustomer, this._basketController.get);
    }

    get router() {
        return this._router;
    }
}

export default CustomerRouter;

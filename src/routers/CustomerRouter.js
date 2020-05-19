import express from 'express';
import CustomerController from '../controllers/CustomerController.js';

class CustomerRouter {
    _router = express.Router();

    constructor(pool) {
        this._customerController = new CustomerController(pool);

        this._router.route('/:email').get(this._customerController.get);
        this._router.route('/').post(this._customerController.create);
        this._router.route('/:id/address').post(this._customerController.createCustomerAddress);
        this._router.route('/:id').put(this._customerController.update);
        this._router.route('/:id').delete(this._customerController.delete);
    }

    get router() {
        return this._router;
    }

}
export default CustomerRouter;
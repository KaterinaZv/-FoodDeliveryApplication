import express from 'express';
import RestaurantController from '../../controllers/restaurantController/RestaurantController.js';

class RestaurantRouter {
    constructor(pool) {
        this._router = express.Router();
        this._restaurantController = new RestaurantController(pool);

        this._router.route('/:id').get(this._restaurantController.getRestaurantById);
        this._router.route('/').get(this._restaurantController.getRestaurant);
        this._router.route('/').post(this._restaurantController.create);
        this._router.route('/:id').put(this._restaurantController.update);
        this._router.route('/:id').delete(this._restaurantController.delete);
    }

    get router() {
        return this._router;
    }
}

export default RestaurantRouter;

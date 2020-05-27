import express from 'express';
import MenuRestaurantController from '../../controllers/restaurantController/MenuRestaurantController.js';

class MenuRestaurantRouter {
    constructor(pool) {
        this._router = express.Router();
        this._menuRestaurantController = new MenuRestaurantController(pool);

        this._router.route('/').get(this._menuRestaurantController.getMenuRestaurantById);
        this._router.route('/:id').post(this._menuRestaurantController.create);
        this._router.route('/:id').put(this._menuRestaurantController.update);
        this._router.route('/:id').delete(this._menuRestaurantController.delete);
    }

    get router() {
        return this._router;
    }
}

export default MenuRestaurantRouter;

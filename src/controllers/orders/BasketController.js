
import BasketRepository from '../../repositories/ordersRepository/BasketRepository.js';
import MenuRestaurantRepository from '../../repositories/restaurantRepository/MenuRestaurantRepository.js';

class BasketController {
    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);

        this.basketRepository = new BasketRepository(pool);
        this.menuRestaurantRepository = new MenuRestaurantRepository(pool);
    }

    async get(request, response, next) {
        try {
            const { id } = request.params;
            if (id !== undefined) {
                const basket = await this.basketRepository.getBasket(id);
                response.json(basket);
            } else {
                next(new Error('Invalid customer id'));
            }
        } catch (e) {
            next(new Error('Invalid customer basket'));
        }
    }

    async create(request, response) {
        const { id } = request.params;
        const { nameMenuRestaurant, amount } = request.body;

        const menuIdAndPrice = await this.menuRestaurantRepository.getMenuRestaurantByName(nameMenuRestaurant);

        const basket = await this.basketRepository.createBasket(id, menuIdAndPrice.id, menuIdAndPrice.name, menuIdAndPrice.price, amount);

        response.json(basket);
    }
}

export default BasketController;

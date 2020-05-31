
import RestaurantRepository from '../../repositories/restaurantRepository/RestaurantRepository.js';

class RestaurantController {
    constructor(pool) {
        this.getRestaurant = this.getRestaurant.bind(this);
        this.getRestaurantById = this.getRestaurantById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.restaurantRepository = new RestaurantRepository(pool);
    }

    async getRestaurant(request, response) {
        const restaurant = await this.restaurantRepository.getRestaurant();
        response.json(restaurant);
    }

    async getRestaurantById(request, response, next) {
        try {
            // eslint-disable-next-line camelcase
            const restaurant_id = request.params.id;
            const restaurant = await this.restaurantRepository.getRestaurantById(restaurant_id);
            response.send({ restaurant });
        } catch (e) {
            next(new Error('Error on get restaurant'));
        }
    }

    async create(request, response) {
        const { name } = request.body;
        const { phone } = request.body;
        const { email } = request.body;
        const { description } = request.body;
        const { password } = request.body;

        const restaurant = await this.restaurantRepository.createRestaurant(name, phone, email, description, password);

        response.send(restaurant);
    }

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const restaurantRequest = request.body;

            if (id) {
                const restaurantInDataBase = await this.restaurantRepository.getRestaurantById(id);

                Object.getOwnPropertyNames(restaurantRequest).forEach((prop) => {
                    if (restaurantInDataBase[prop] !== undefined) {
                        restaurantInDataBase[prop] = restaurantRequest[prop];
                    }
                });

                const updateData = await this.restaurantRepository.updateRestaurant(
                    restaurantInDataBase,
                );
                response.json(updateData);
            } else {
                next(new Error('Not found restaurant with this id'));
            }
        } catch (e) {
            console.log(e);
            next(new Error('Error update'));
        }
    }

    delete(request, response) {
        response.send('Delete customer');
    }
}

export default RestaurantController;

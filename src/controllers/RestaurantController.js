import { RestaurantRepository } from '../repositories/RestaurantRepository.js';


class RestaurantController {
    constructor(pool) {
        this.getRestaurant = this.getRestaurant.bind(this);
        this.getRestaurantById = this.getRestaurantById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.restaurantRepository = new RestaurantRepository(pool);
    }

    async getRestaurant(request, response, next) {
        const restaurant = await this.restaurantRepository.getRestaurant();
        response.json(restaurant);
    }

    async getRestaurantById(request, response, next) {
        try {
            const restaurant_id = request.params.id;
            const restaurant = await this.restaurantRepository.getRestaurantById(restaurant_id);
            response.send({ restaurant });
        } catch (e) {
            next(new Error('Error on get restaurant'));
        }
    }

    async create(request, response, next) {

        const name = request.body.name;
        const phone = request.body.phone;
        const email = request.body.email;
        const description = request.body.description;
        const password = request.body.password;

        const restaurant = await this.restaurantRepository.createRestaurant(name, phone, email, description, password);

        response.send(restaurant);
    }

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const restaurantRequest = request.body;

            if (id) {
                const restaurantInDataBase = await this.restaurantRepository.getRestaurantById(id);

                Object.getOwnPropertyNames(restaurantRequest).forEach(function (prop) {
                    if (restaurantInDataBase[prop] !== undefined) {
                        restaurantInDataBase[prop] = restaurantRequest[prop];
                    }
                });

                //console.log(restaurantInDataBase.id);
                const updateData = await this.restaurantRepository.updateRestaurant(
                    restaurantInDataBase
                );
                response.json(updateData);

            } else {
                next(new Error('Not found restaurant with this id'));
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

export default RestaurantController;

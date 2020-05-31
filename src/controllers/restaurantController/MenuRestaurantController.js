import MenuRestaurantRepository from '../../repositories/restaurantRepository/MenuRestaurantRepository.js';

class MenuRestaurantController {
    constructor(pool) {
        this.getMenuRestaurantById = this.getMenuRestaurantById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        //   this.delete = this.delete.bind(this);

        this.menuRestaurantRepository = new MenuRestaurantRepository(pool);
    }

    async getMenuRestaurantById(request, response, next) {
        try {
            const { restaurantId } = request.body;
            const menuRestaurant = await this.menuRestaurantRepository.getMenuRestaurantById(restaurantId);
            response.send({ menuRestaurant });
        } catch (e) {
            next(new Error('Error on get menu restaurant'));
        }
    }

    async create(request, response) {
        const { name } = request.body;
        const { id } = request.params;
        const { description } = request.body;
        const { price } = request.body;

        const menuRestaurant = await this.menuRestaurantRepository.createMenuRestaurant(id, name, description, price);

        response.send(menuRestaurant);
    }

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const menuRestaurantRequest = request.body;

            if (id) {
                const menuRestaurantInDataBase = await this.menuRestaurantRepository.getMenuRestaurantById(id);

                Object.getOwnPropertyNames(menuRestaurantRequest).forEach((prop) => {
                    if (menuRestaurantInDataBase[prop] !== undefined) {
                        menuRestaurantInDataBase[prop] = menuRestaurantRequest[prop];
                    }
                });

                const updateDataMenu = await this.menuRestaurantRepository.updateMenuRestaurant(
                    menuRestaurantInDataBase,
                );
                response.json(updateDataMenu);
            } else {
                next(new Error('Not found menu restaurant with this id'));
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

export default MenuRestaurantController;

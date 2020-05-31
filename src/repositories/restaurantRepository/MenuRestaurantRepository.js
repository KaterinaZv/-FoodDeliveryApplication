import MenuRestaurant from '../../models/restaurant/MenuRestaurant.js';


class MenuRestaurantRepository {
    constructor(pool) {
        this._pool = pool;
    }

    async getMenuRestaurantById(restaurantId) {
        const menuRestaurant = [];
        const items = await this._pool.query('SELECT * FROM public."menu_restaurant" WHERE restaurant_id=$1;', [restaurantId]);

        items.rows.forEach((item) => {
            const menuItem = new MenuRestaurant({
                id: item.id,
                restaurantId,
                name: item.name,
                description: item.description,
                price: item.price,
                photo: item.photo,
            });
            menuRestaurant.push(menuItem);
        });

        return menuRestaurant;
    }

    async getMenuRestaurantByName(name) {
        const rawMenuRestaurant = await this._pool.query('SELECT * FROM public."menu_restaurant" WHERE name=$1;', [name]);

        const menuRestaurant = new MenuRestaurant({
            id: rawMenuRestaurant.rows[0].id,
            name: rawMenuRestaurant.rows[0].name,
            price: rawMenuRestaurant.rows[0].price,
        });

        return menuRestaurant;
    }

    async createMenuRestaurant(restaurantId, name, description, price, photo) {
        const rawMenuRestaurant = await this._pool.query(
            'INSERT INTO public."menu_restaurant" (restaurant_id, name, description, price, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [restaurantId, name, description, price, photo],
        );

        const menuRestaurant = new MenuRestaurant({
            id: rawMenuRestaurant.rows[0].id,
            restaurantId: rawMenuRestaurant.rows[0].restaurantId,
            name: rawMenuRestaurant.rows[0].name,
            description: rawMenuRestaurant.rows[0].description,
            price: rawMenuRestaurant.rows[0].price,
            photo: rawMenuRestaurant.rows[0].photo,
        });

        return menuRestaurant;
    }

    async updateMenuRestaurant(menuRestaurant) {
        const rawMenuRestaurant = await this._pool.query('UPDATE public."menu_restaurant" SET name=$2, description=$3, price=$4 WHERE restaurant_id=$1 RETURNING *;', [
            menuRestaurant.restaurantId,
            menuRestaurant.name,
            menuRestaurant.description,
            menuRestaurant.price,
        ]);

        return new MenuRestaurant({
            id: rawMenuRestaurant.rows[0].id,
            restaurantId: menuRestaurant.restaurantId,
            name: rawMenuRestaurant.rows[0].name,
            description: rawMenuRestaurant.rows[0].description,
            price: rawMenuRestaurant.rows[0].price,
            photo: rawMenuRestaurant.rows[0].photo,
        });
    }
}

export default MenuRestaurantRepository;

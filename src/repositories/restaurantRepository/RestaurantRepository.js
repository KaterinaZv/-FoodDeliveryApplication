import Restaurant from '../../models/restaurant/Restaurant.js';


class RestaurantRepository {
    constructor(pool) {
        this._pool = pool;
    }

    // Для юзера
    async getRestaurant() {
        const restaurants = [];

        const rawRestaurants = await this._pool.query('SELECT * FROM public."restaurant";');

        rawRestaurants.rows.forEach((rawRestaurant) => {
            const restaurant = new Restaurant({
                name: rawRestaurant.name,
                description: rawRestaurant.description,
            });
            restaurants.push(restaurant);
        });
        return restaurants;
    }

    // Для администратора
    async getRestaurantById(id) {
        const rawRestaurant = await this._pool.query('SELECT * FROM public."restaurant" WHERE id = $1;', [id]);

        const restaurant = new Restaurant({
            id: rawRestaurant.rows[0].id,
            name: rawRestaurant.rows[0].name,
            phone: rawRestaurant.rows[0].phone,
            email: rawRestaurant.rows[0].email,
            description: rawRestaurant.rows[0].description,
        });

        return restaurant;
    }

    async createRestaurant(name, phone, email, description, password) {
        const rawRestaurant = await this._pool.query(
            'INSERT INTO public."restaurant" (name, phone, email, description, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [name, phone, email, description, password],
        );

        const restaurant = new Restaurant({
            id: rawRestaurant.rows[0].id,
            name: rawRestaurant.rows[0].name,
            phone: rawRestaurant.rows[0].phone,
            email: rawRestaurant.rows[0].email,
            description: rawRestaurant.rows[0].description,
        });
        return restaurant;
    }

    async updateRestaurant(restaurant) {
        const restaurantRaw = await this._pool.query('UPDATE public."restaurant" SET name=$2, phone=$3, email=$4, description=$5 WHERE id=$1 RETURNING *;', [
            restaurant.id,
            restaurant.name,
            restaurant.phone,
            restaurant.email,
            restaurant.description,
        ]);

        return new Restaurant({
            id: restaurantRaw.rows[0].id,
            name: restaurantRaw.rows[0].name,
            phone: restaurantRaw.rows[0].phone,
            email: restaurantRaw.rows[0].email,
            description: restaurantRaw.rows[0].description,
        });
    }
}

export default RestaurantRepository;

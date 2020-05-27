import Basket from '../../models/orders/Basket.js';

class BasketRepository {
    constructor(pool) {
        this._pool = pool;
    }

    async getBasket(id) {
        const baskets = [];
        const rawBasket = await this._pool.query('SELECT * FROM public."order_item_list" WHERE customer_id = $1;', [id]);

        rawBasket.rows.forEach((item) => {
            const basket = new Basket({
                id: item.id,
                customerId: item.customer_id,
                menuRestaurantId: item.menu_restaurant_id,
                nameMenuRestaurant: item.name_menu_restaurant,
                amount: item.amount,
                price: item.price,
            });
            baskets.push(basket);
        });
        return baskets;
    }

    async createBasket(customerId, menuRestaurantId, nameMenuRestaurant, price, amount) {
        const rawBasket = await this._pool.query(
            'INSERT INTO public."order_item_list" (customer_id, menu_restaurant_id, name_menu_restaurant, price, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [customerId, menuRestaurantId, nameMenuRestaurant, price, amount],
        );

        const basket = new Basket({
            id: rawBasket.rows[0].id,
            customerId: rawBasket.rows[0].customer_id,
            menuRestaurantId: rawBasket.rows[0].menu_restaurant_id,
            nameMenuRestaurant: rawBasket.rows[0].name_menu_restaurant,
            amount: rawBasket.rows[0].amount,
            price: rawBasket.rows[0].price,
        });
        return basket;
    }
}

export default BasketRepository;

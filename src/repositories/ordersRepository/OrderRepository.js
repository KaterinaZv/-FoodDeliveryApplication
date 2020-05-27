import Order from '../../models/orders/Order.js';

class OrderRepository {
    constructor(pool) {
        this._pool = pool;
    }

    async getOrder(id) {
        const rawOrder = await this._pool.query('SELECT * FROM public."orders" WHERE customer_id = $1;', [id]);

        const order = new Order({
            id: rawOrder.rows[0].id,
            customerId: rawOrder.rows[0].customer_id,
            nameMenuRestaurant: rawOrder.rows[0].name_menu_restaurant,
            amount: rawOrder.rows[0].amount,
            sumOfOrder: rawOrder.rows[0].sum_of_order,
            phone: rawOrder.rows[0].phone,
            address: rawOrder.rows[0].address,
            createdTime: rawOrder.rows[0].createdTime,
            statusOrder: rawOrder.rows[0].status,
        });

        return order;
    }

    async createOrder(customerId, amount, phone, address) {
        const rawSumOfOrder = await this._pool.query('SELECT SUM (price * amount) FROM public."order_item_list" WHERE customer_id=$1;', [customerId]);

        const nameMenuRestaurants = [];
        const itemNames = await this._pool.query('SELECT name_menu_restaurant FROM public."order_item_list" WHERE customer_id=$1;', [customerId]);

        itemNames.rows.forEach((name) => {
            const names = name.name_menu_restaurant;
            nameMenuRestaurants.push(names);
        });

        const rawOrder = await this._pool.query(
            'INSERT INTO public."orders" (customer_id, name_menu_restaurant, amount, sum_of_order, phone, address, created_time, status) VALUES ($1, $2, $3, $4, $5, $6, NOW(), \'Заказ оформлен\') RETURNING *;;', [customerId, nameMenuRestaurants, amount, rawSumOfOrder.rows[0].sum, phone, address],
        );

        const order = new Order({
            id: rawOrder.rows[0].id,
            customerId: rawOrder.rows[0].customer_id,
            nameMenuRestaurant: rawOrder.rows[0].name_menu_restaurant,
            amount: rawOrder.rows[0].amount,
            sumOfOrder: rawOrder.rows[0].sum_of_order,
            phone: rawOrder.rows[0].phone,
            address: rawOrder.rows[0].address,
            createdTime: rawOrder.rows[0].created_time,
            statusOrder: rawOrder.rows[0].status,
        });
        return order;
    }
}

export default OrderRepository;

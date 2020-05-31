import BasketRepository from '../../repositories/ordersRepository/BasketRepository.js';
import OrderRepository from '../../repositories/ordersRepository/OrderRepository.js';

class OrderController {
    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);

        this.orderRepository = new OrderRepository(pool);
        this.basketRepository = new BasketRepository(pool);
    }

    async get(request, response, next) {
        try {
            const { id } = request.params;
            if (id !== undefined) {
                const order = await this.orderRepository.getOrder(id);
                response.json(order);
            } else {
                next(new Error('Invalid customer id'));
            }
        } catch (e) {
            next(new Error('Invalid customer order'));
        }
    }

    async create(request, response) {
        const { id } = request.params;
        const { phone, address } = request.body;

        const detailsOfBasket = await this.basketRepository.getBasket(id);

        const sum = [];
        detailsOfBasket.forEach((item) => {
            sum.push(item.amount);
        });

        const order = await this.orderRepository.createOrder(id, sum.join(','), phone, address);

        response.json(order);
    }
}

export default OrderController;

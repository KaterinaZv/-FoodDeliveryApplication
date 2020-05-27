import process from 'process';
import express from 'express';
import pool from './database.js';
import CustomerRouter from './routers/customerRouter/CustomerRouter.js';
import RestaurantRouter from './routers/restaurantRouter/RestaurantRouter.js';
import MenuRestaurantRouter from './routers/restaurantRouter/MenuRestaurantRouter.js';

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
    console.log(`Server started on port ${server.address().port}`);

    await pool.connect();
    app.use(express.json());
    app.use(express.raw());

    const customerRouter = new CustomerRouter(pool);
    app.use('/api/customers', customerRouter.router);

    const menuRestaurantRouter = new MenuRestaurantRouter(pool);
    app.use('/restaurants/menu', menuRestaurantRouter.router);

    const restaurantRouter = new RestaurantRouter(pool);
    app.use('/restaurants', restaurantRouter.router);
});

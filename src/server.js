import process from 'process';
import express from 'express';
import CustomerRouter from './routers/CustomerRouter.js';
import pool from './database.js';
import RestaurantRouter from './routers/RestaurantRouter.js';

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Server started on port ${server.address().port}`);

  await pool.connect();
  app.use(express.json());

  const customerRouter = new CustomerRouter(pool);
  app.use('/customers', customerRouter.router);

  const restaurantRouter = new RestaurantRouter(pool);
  app.use('/restaurants', restaurantRouter.router);
});



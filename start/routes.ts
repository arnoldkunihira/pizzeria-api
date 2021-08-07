/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
    return { hello: 'Diwala' };
});

Route.group(() => {
    //User Authentication
    Route.post('/register', 'UsersController.register');
    Route.post('/login', 'UsersController.login');

    //All routes in here need a bearer-token otherwise there will be unauthorized access
    Route.group(() => {

        Route.post('/logout', 'UsersController.logout');

        //Products
        Route.get('/products', 'ProductsController.index');
        Route.post('/products', 'ProductsController.store');
        Route.get('/products/:id', 'ProductsController.show');
        Route.patch('/products/:id', 'ProductsController.update');
        Route.delete('/products/:id', 'ProductsController.destroy');

        //Orders
        Route.get('/orders', 'OrdersController.index');
        Route.post('/orders', 'OrdersController.store');
        Route.get('/orders/:id', 'OrdersController.show');
        Route.patch('/orders/:id', 'OrdersController.update');

    }).middleware('auth:api');
}).prefix('api');

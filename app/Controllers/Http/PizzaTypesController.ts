import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PizzaType from 'App/Models/PizzaType';
import StorePizza from 'App/Validators/StorePizzaValidator';
import UpdatePizza from 'App/Validators/UpdatePizzaValidator';

export default class PizzaTypesController {
    public async index({}: HttpContextContract) {
        const pizzaTypes = await PizzaType.all();

        return {
            status: 'success',
            data: pizzaTypes,
            message: 'Pizzas retrieved successfully'
        }
    }

    public async store({ request, response }: HttpContextContract) {
        const pizzaType = new PizzaType();
        const payload = await request.validate(StorePizza);

        pizzaType.name = payload.name;
        pizzaType.price = payload.price;
        await pizzaType.save();
        response.status(201);

        if (!pizzaType.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to create new pizza'
            }
        }

        return {
            status: 'success',
            data: pizzaType, 
            message: 'Pizza created successfully'
        }
    }

    public async show({ params }: HttpContextContract) {
        const pizzaType = await PizzaType.find(params.id);

        if (!pizzaType?.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to retrieve pizza type whose id is ' + params.id
            }
        }

        return {
            status: 'success',
            data: pizzaType,
            message: 'Pizza type retrieved successfully'
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const pizzaType = await PizzaType.findOrFail(params.id);
        const payload = await request.validate(UpdatePizza);

        pizzaType.name = payload.name;
        pizzaType.price = payload.price;
        pizzaType.save();

        if (!pizzaType.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to update pizza type'
            }
        }

        return {
            status: 'success', 
            data: pizzaType,
            message: 'Pizza type updated successfully'
        }
    }

    public async destroy({}: HttpContextContract) {}
}

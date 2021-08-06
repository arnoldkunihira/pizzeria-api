import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Order from 'App/Models/Order';
import CreateOrder from 'App/Validators/CreateOrderValidator';

export default class OrdersController {
    public async index({}: HttpContextContract) {}

    public async create({}: HttpContextContract) {}

    public async store({ request }) {
        const order = new Order();
        const payload = await request.validate(CreateOrder);

        order.quantity = payload.quantity;
        order.productId = payload.productId;

        await order.save();

        if (!order.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to create new order'
            }
        }

        return {
            status: 'success',
            data: order,
            message: 'Order created successfully'
        }
    }

    public async show({}: HttpContextContract) {}

    public async edit({}: HttpContextContract) {}

    public async update({}: HttpContextContract) {}

    public async destroy({}: HttpContextContract) {}
}

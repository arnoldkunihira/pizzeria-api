import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Order from 'App/Models/Order';
import CreateOrder from 'App/Validators/CreateOrderValidator';
import UpdateOrder from 'App/Validators/UpdateOrderValidator';

export default class OrdersController {
    public async index({}: HttpContextContract) {
        const orders = await Database.from('orders')
            .join('products', 'orders.product_id', '=', 'products.id')
            .select('orders.id')
            .select('orders.quantity')
            .select('products.name')
            .select('products.price')

        if (Object.keys(orders).length === 0) {
            return {
                status: 'fail',
                message: 'Failed to retrieve orders'
            }
        }

        return {
            status: 'success',
            data: orders,
            message: 'Orders retrieved successfully'
        }
    }

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

    public async show({ params }: HttpContextContract) {
        const order = await Database.from('orders')
            .join('products', 'orders.product_id', '=', 'products.id')
            .select('orders.id')
            .select('orders.quantity')
            .select('products.name')
            .select('products.price')
            .where('orders.id', params.id)

        if (Object.keys(order).length === 0) {
            return {
                status: 'fail',
                message: 'Failed to retrieve order whose id is ' + params.id
            }
        }

        return {
            status: 'success',
            data: order,
            message: 'Order retrieved successfully'
        }
    }

    public async edit({}: HttpContextContract) {}

    public async update({ params, request }: HttpContextContract) {
        const order = await Order.findOrFail(params.id); 
        const payload = await request.validate(UpdateOrder);

        order.quantity = payload.quantity;
        order.save();

        if (!order.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to update product'
            }
        }

        return {
            status: 'success', 
            data: order,
            message: 'Order updated successfully'
        }
    }

    public async destroy({ params }: HttpContextContract) {
        const order = await Order.find(params.id);

        if (!order?.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to delete order whose id is ' + params.id
            }
        }

        await order.delete();

        return {
            status: 'success',
            message: 'Order deleted successfully'
        }
    }
}

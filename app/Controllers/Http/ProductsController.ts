import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Product from 'App/Models/Product';
import StoreProduct from 'App/Validators/StoreProductValidator';
import UpdateProduct from 'App/Validators/UpdateProductValidator';

export default class ProductsController {
    public async index({}: HttpContextContract) {
        const product = await Product.all();

        return {
            status: 'success',
            data: product,
            message: 'Products retrieved successfully'
        }
    }

    public async store({ request, response }: HttpContextContract) {
        const product = new Product();
        const payload = await request.validate(StoreProduct);

        product.name = payload.name;
        product.price = payload.price;
        await product.save();
        response.status(201);

        if (!product.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to create new product'
            }
        }

        return {
            status: 'success',
            data: product, 
            message: 'Product created successfully'
        }
    }

    public async show({ params }: HttpContextContract) {
        const product = await Product.find(params.id);

        if (!product?.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to retrieve product whose id is ' + params.id
            }
        }

        return {
            status: 'success',
            data: product,
            message: 'Product type retrieved successfully'
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const product = await Product.findOrFail(params.id);
        const payload = await request.validate(UpdateProduct);

        product.name = payload.name;
        product.price = payload.price;
        product.save();

        if (!product.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to update product'
            }
        }

        return {
            status: 'success', 
            data: product,
            message: 'Product updated successfully'
        }
    }

    public async destroy({ params }: HttpContextContract) {
        const product = await Product.find(params.id);

        if (!product?.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to delete product whose id is ' + params.id
            }
        }

        await product.delete();

        return {
            status: 'success',
            message: 'Product deleted successfully'
        }
    }
}

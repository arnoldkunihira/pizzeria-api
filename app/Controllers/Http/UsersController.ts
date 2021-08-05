import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateUser from 'App/Validators/CreateUserValidator';
import LoginUser from 'App/Validators/LoginUserValidator';

export default class UsersController {
    public async register({ request, response }: HttpContextContract) {
        const user = new User();
        const payload = await request.validate(CreateUser);

        user.name = payload.name;
        user.email = payload.email;
        user.password = payload.password;

        await user.save();
        response.status(201);

        if(!user.$isPersisted) {
            return {
                status: 'fail',
                message: 'Failed to register user'
            }
        }

        return {
            status: 'success',
            data: user,
            message: 'User registered successfully'
        }
    }

    public async login({ auth, request }: HttpContextContract) {
        const { email, password } = await request.validate(LoginUser);
        const token = await auth.use('api').attempt(email, password);

        if (auth.user) {
            return {
                status: 'success',
                data: auth.user,
                access_token: token,
                message: 'User login successful'
            }
        }
    }

    public async logout({ auth }: HttpContextContract) {
        await auth.use('api').revoke();
        auth.use('api').isLoggedOut

        return {
            message: 'You have successfully logged out'
        }
    }
}

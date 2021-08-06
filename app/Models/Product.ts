import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Order from 'App/Models/Order';

export default class Product extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public name: string;

    @column()
    public price: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => Order)
    public orders: HasMany<typeof Order>;
}

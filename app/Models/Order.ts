import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Product from 'App/Models/Product';

export default class Order extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public productId: number

    @column()
    public quantity: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>;
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Orders extends BaseSchema {
    protected tableName = 'orders';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('product_id');
            table.foreign('product_id').references('products.id').onDelete('CASCADE');
            table.integer('quantity').notNullable();

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}

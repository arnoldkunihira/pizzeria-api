import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class PizzaTypes extends BaseSchema {
    protected tableName = 'pizza_types';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.decimal('price').notNullable();
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('other', (table) => {
    table.increments('id')
    table
      .integer('official_id')
      .references('official.id')
      .nullable()
      .onDelete('SET NULL')
    table
      .integer('showdown_id')
      .references('showdown.id')
      .nullable()
      .onDelete('SET NULL')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('other')
}

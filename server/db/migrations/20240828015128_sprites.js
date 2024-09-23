/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('sprites', (table) => {
    table.increments('id')
    table.string('front_default')
    table.string('back_default')
    table.string('front_shiny')
    table.string('back_shiny')
    table
      .integer('other_id')
      .references('other.id')
      .nullable()
      .onDelete('SET NULL')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('sprites')
}

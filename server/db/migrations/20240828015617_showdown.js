/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('showdown', (table) => {
    table.increments('id')
    table.string('front_default')
    table.string('back_default')
    table.string('front_shiny')
    table.string('back_shiny')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('showdown')
}

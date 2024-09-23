/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('effort', (table) => {
    table.increments('id')
    table.integer('hp')
    table.integer('attack')
    table.integer('defense')
    table.integer('special_attack')
    table.integer('special_defense')
    table.integer('speed')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('effort')
}

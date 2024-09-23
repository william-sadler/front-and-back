/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('teams', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('wins')
    table.boolean('is_new')
    table.integer('badges_id')
    table.string('user_token')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('teams')
}

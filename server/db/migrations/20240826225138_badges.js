/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('badges', (table) => {
    table.increments('id')
    table
      .integer('team_badges_id')
      .references('teams.id')
      .nullable()
      .onDelete('SET NULL')
    table.string('name')
    table.string('region')
    table.string('badge_sprite')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('badges')
}

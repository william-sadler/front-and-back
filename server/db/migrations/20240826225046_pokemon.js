/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('pokemon', (table) => {
    table.increments('id')
    table
      .integer('pokemon_team_id')
      .references('teams.id')
      .nullable()
      .onDelete('SET NULL')
    table.integer('level')
    table.string('name')
    table
      .integer('type1_id')
      .references('types.id')
      .nullable()
      .onDelete('SET NULL')
    table
      .integer('type2_id')
      .references('types.id')
      .nullable()
      .onDelete('SET NULL')
    table.boolean('is_shiny')
    table
      .integer('sprites_id')
      .references('sprites.id')
      .nullable()
      .onDelete('SET NULL')
    table
      .integer('effort_id')
      .references('effort.id')
      .nullable()
      .onDelete('SET NULL')
    table
      .integer('individual_id')
      .references('individual.id')
      .nullable()
      .onDelete('SET NULL')
    table
      .integer('ability_id')
      .references('abilities.id')
      .nullable()
      .onDelete('SET NULL')
    table
      .integer('nature_id')
      .references('natures.id')
      .nullable()
      .onDelete('SET NULL')
    table.integer('moves_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('pokemon')
}

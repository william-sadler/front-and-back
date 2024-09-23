/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('moves', (table) => {
    table.increments('id')
    table
      .integer('pokemon_id')
      .references('pokemon.id')
      .nullable()
      .onDelete('SET NULL')
    table.string('name')
    table.string('damage_class')
    table.integer('power')
    table.integer('accuracy')
    table.integer('pp')
    table
      .integer('move_type_id')
      .references('types.id')
      .nullable()
      .onDelete('SET NULL')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('moves')
}

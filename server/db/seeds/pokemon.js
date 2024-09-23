/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('moves').del()
  await knex('pokemon').del()
  await knex('sprites').del()
  await knex('other').del()
  await knex('official').del()
  await knex('showdown').del()
  await knex('types').del()
  await knex('abilities').del()
  await knex('natures').del()
  await knex('effort').del()
  await knex('individual').del()
  await knex('badges').del()
  await knex('teams').del()
  // Inserts seed teams
  await knex('teams').insert({
    id: 1,
    name: 'CoolPerson97',
    wins: 0,
    is_new: false,
    user_token: '0Auth|1234',
    badges_id: 1,
  })

  // insert badges
  await knex('badges').insert([
    {
      id: 1,
      name: 'bug-Badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/41.png',
      team_badges_id: 1,
    },
    {
      id: 2,
      name: 'cliff-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/42.png',
      team_badges_id: 1,
    },
    {
      id: 3,
      name: 'rumble-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/43.png',
      team_badges_id: null,
    },
    {
      id: 4,
      name: 'plant-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/44.png',
      team_badges_id: null,
    },
    {
      id: 5,
      name: 'voltage-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/45.png',
      team_badges_id: null,
    },
    {
      id: 6,
      name: 'fairy-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/46.png',
      team_badges_id: null,
    },
    {
      id: 7,
      name: 'psychic-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/47.png',
      team_badges_id: null,
    },
    {
      id: 8,
      name: 'iceberg-badge',
      region: 'Kalos',
      badge_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/48.png',
      team_badges_id: null,
    },
  ])
  // insert types
  await knex('types').insert([
    {
      id: 1,
      name: 'normal',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/1.png',
    },
    {
      id: 2,
      name: 'fire',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/2.png',
    },
    {
      id: 3,
      name: 'fighting',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/3.png',
    },
    {
      id: 4,
      name: 'water',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/4.png',
    },
    {
      id: 5,
      name: 'flying',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/5.png',
    },
    {
      id: 6,
      name: 'grass',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/6.png',
    },
    {
      id: 7,
      name: 'poison',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/7.png',
    },
    {
      id: 8,
      name: 'electric',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/8.png',
    },
    {
      id: 9,
      name: 'ground',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/9.png',
    },
    {
      id: 10,
      name: 'psychic',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/10.png',
    },
    {
      id: 11,
      name: 'rock',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/11.png',
    },
    {
      id: 12,
      name: 'ice',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/12.png',
    },
    {
      id: 13,
      name: 'bug',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/13.png',
    },
    {
      id: 14,
      name: 'dragon',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/14.png',
    },
    {
      id: 15,
      name: 'ghost',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/15.png',
    },
    {
      id: 16,
      name: 'dark',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/16.png',
    },
    {
      id: 17,
      name: 'steel',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/17.png',
    },
    {
      id: 18,
      name: 'fairy',
      type_sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/18.png',
    },
  ])
  const staticId = ['887', '1023', '983', '730', '10236', '10021']

  // insert official-artwork
  await knex('official').insert([
    {
      id: 1,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticId[0]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticId[0]}.png`,
    },
    {
      id: 2,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticId[1]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticId[1]}.png`,
    },
    {
      id: 3,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticId[2]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticId[2]}.png`,
    },
    {
      id: 4,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticId[3]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticId[3]}.png`,
    },
    {
      id: 5,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticId[4]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticId[4]}.png`,
    },
    {
      id: 6,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticId[5]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticId[5]}.png`,
    },
  ])
  /**/
  // insert showdown
  await knex('showdown').insert([
    {
      id: 1,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${staticId[0]}.gif`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${staticId[0]}.gif`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${staticId[0]}.gif`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/${staticId[0]}.gif`,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${staticId[3]}.gif`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${staticId[3]}.gif`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${staticId[3]}.gif`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/${staticId[3]}.gif`,
    },
    {
      id: 5,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${staticId[4]}.gif`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${staticId[4]}.gif`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${staticId[4]}.gif`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/${staticId[4]}.gif`,
    },
    {
      id: 6,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${staticId[5]}.gif`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${staticId[5]}.gif`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${staticId[5]}.gif`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/${staticId[5]}.gif`,
    },
  ])
  // insert other
  await knex('other').insert([
    { id: 1, official_id: 1, showdown_id: 1 },
    { id: 2, official_id: 2, showdown_id: 2 },
    { id: 3, official_id: 3, showdown_id: 3 },
    { id: 4, official_id: 4, showdown_id: 4 },
    { id: 5, official_id: 5, showdown_id: 5 },
    { id: 6, official_id: 6, showdown_id: 6 },
  ])
  // insert sprites
  await knex('sprites').insert([
    {
      id: 1,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${staticId[0]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${staticId[0]}.png`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${staticId[0]}.png`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${staticId[0]}.png`,
      other_id: 1,
    },
    {
      id: 2,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${staticId[1]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${staticId[1]}.png`,
      other_id: 2,
    },
    {
      id: 3,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${staticId[2]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${staticId[2]}.png`,
      other_id: 3,
    },
    {
      id: 4,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${staticId[3]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${staticId[3]}.png`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${staticId[3]}.png`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${staticId[3]}.png`,
      other_id: 4,
    },
    {
      id: 5,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${staticId[4]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${staticId[4]}.png`,
      other_id: 5,
    },
    {
      id: 6,
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${staticId[5]}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${staticId[5]}.png`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${staticId[5]}.png`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${staticId[5]}.png`,
      other_id: 6,
    },
  ])

  // insert abilities
  await knex('abilities').insert([
    {
      id: 1,
      name: 'clear-body',
      flavor_text:
        "Prevents other Pokémon's moves or Abilities from lowering the Pokémon's stats.",
    },
    {
      id: 2,
      name: 'quark-drive',
      flavor_text:
        "Boosts the Pokémon's most proficient stat on Electric Terrain or if the Pokémon is holding Booster Energy.",
    },
    {
      id: 3,
      name: 'supreme-overlord',
      flavor_text:
        'When the Pokémon enters a battle, its Attack and Sp. Atk stats are slightly boosted for each of the allies in its party that have already been defeated.',
    },
    {
      id: 4,
      name: 'torrent',
      flavor_text: "Powers up Water-type moves when the Pokémon's HP is low.",
    },
    { id: 5, name: 'sharpness', flavor_text: 'Powers up slicing moves.' },
    {
      id: 6,
      name: 'intimidate',
      flavor_text:
        'When the Pokémon enters a battle, it intimidates opposing Pokémon and makes them cower, lowering their Attack stats.',
    },
  ])
  // insert natures
  await knex('natures').insert([
    {
      id: 1,
      name: 'jolly',
      increased_stat: 'speed',
      decreased_stat: 'special-attack',
    },
    { id: 2, name: 'timid', increased_stat: 'speed', decreased_stat: 'attack' },
    {
      id: 3,
      name: 'adamant',
      increased_stat: 'attack',
      decreased_stat: 'special-attack',
    },
    {
      id: 4,
      name: 'modest',
      increased_stat: 'special-attack',
      decreased_stat: 'attack',
    },
    {
      id: 5,
      name: 'jolly',
      increased_stat: 'speed',
      decreased_stat: 'special-attack',
    },
    {
      id: 6,
      name: 'bold',
      increased_stat: 'defense',
      decreased_stat: 'attack',
    },
  ])
  // insert effort values
  await knex('effort').insert([
    {
      id: 1,
      hp: 0,
      attack: 252,
      defense: 0,
      special_attack: 0,
      special_defense: 4,
      speed: 252,
    },
    {
      id: 2,
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 252,
      special_defense: 4,
      speed: 252,
    },
    {
      id: 3,
      hp: 208,
      attack: 252,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 48,
    },
    {
      id: 4,
      hp: 248,
      attack: 0,
      defense: 0,
      special_attack: 80,
      special_defense: 0,
      speed: 180,
    },
    {
      id: 5,
      hp: 0,
      attack: 252,
      defense: 0,
      special_attack: 0,
      special_defense: 4,
      speed: 252,
    },
    {
      id: 6,
      hp: 252,
      attack: 0,
      defense: 252,
      special_attack: 4,
      special_defense: 0,
      speed: 4,
    },
  ])
  // insert individual values
  await knex('individual').insert({
    id: 1,
    hp: 31,
    attack: 31,
    defense: 31,
    special_attack: 31,
    special_defense: 31,
    speed: 31,
  })
  // Insert pokemon
  await knex('pokemon').insert([
    {
      id: 1,
      pokemon_team_id: 1,
      level: 100,
      name: 'dragapult',
      type1_id: 15,
      type2_id: 14,
      is_shiny: false,
      sprites_id: 1,
      effort_id: 1,
      individual_id: 1,
      ability_id: 1,
      nature_id: 1,
      moves_id: 1,
    },
    {
      id: 2,
      pokemon_team_id: 1,
      level: 100,
      name: 'iron-crown',
      type1_id: 10,
      type2_id: 17,
      is_shiny: false,
      sprites_id: 2,
      effort_id: 2,
      individual_id: 1,
      ability_id: 2,
      nature_id: 2,
      moves_id: 1,
    },
    {
      id: 3,
      pokemon_team_id: 1,
      level: 100,
      name: 'kingambit',
      type1_id: 16,
      type2_id: 17,
      is_shiny: false,
      sprites_id: 3,
      effort_id: 3,
      individual_id: 1,
      ability_id: 3,
      nature_id: 3,
      moves_id: 1,
    },
    {
      id: 4,
      pokemon_team_id: 1,
      level: 100,
      name: 'primarina',
      type1_id: 18,
      type2_id: 4,
      is_shiny: false,
      sprites_id: 4,
      effort_id: 4,
      individual_id: 1,
      ability_id: 4,
      nature_id: 4,
      moves_id: 1,
    },
    {
      id: 5,
      pokemon_team_id: 1,
      level: 100,
      name: 'samurott-hisui',
      type1_id: 4,
      type2_id: 16,
      is_shiny: false,
      sprites_id: 5,
      effort_id: 5,
      individual_id: 1,
      ability_id: 5,
      nature_id: 5,
      moves_id: 1,
    },
    {
      id: 6,
      pokemon_team_id: 1,
      level: 100,
      name: 'landorus-therian',
      type1_id: 5,
      type2_id: 9,
      is_shiny: false,
      sprites_id: 6,
      effort_id: 6,
      individual_id: 1,
      ability_id: 6,
      nature_id: 6,
      moves_id: 1,
    },
  ])
  // insert moves
  await knex('moves').insert([
    {
      id: 1,
      pokemon_id: 1,
      name: 'dragon-darts',
      damage_class: 'physical',
      power: 50,
      accuracy: 100,
      pp: 10,
      move_type_id: 14,
    },
    {
      id: 2,
      pokemon_id: 1,
      name: 'u-turn',
      damage_class: 'physical',
      power: 70,
      accuracy: 100,
      pp: 20,
      move_type_id: 13,
    },
    {
      id: 3,
      pokemon_id: 1,
      name: 'quick-attack',
      damage_class: 'physical',
      power: 40,
      accuracy: 100,
      pp: 30,
      move_type_id: 1,
    },
    {
      id: 4,
      pokemon_id: 1,
      name: 'tera-blast',
      damage_class: 'special',
      power: 80,
      accuracy: 100,
      pp: 10,
      move_type_id: 1,
    },
    {
      id: 5,
      pokemon_id: 2,
      name: 'future-sight',
      damage_class: 'special',
      power: 120,
      accuracy: 100,
      pp: 10,
      move_type_id: 10,
    },
    {
      id: 6,
      pokemon_id: 2,
      name: 'tachyon-cutter',
      damage_class: 'special',
      power: 50,
      accuracy: 0,
      pp: 10,
      move_type_id: 17,
    },
    {
      id: 7,
      pokemon_id: 2,
      name: 'volt-switch',
      damage_class: 'special',
      power: 70,
      accuracy: 100,
      pp: 20,
      move_type_id: 8,
    },
    {
      id: 8,
      pokemon_id: 2,
      name: 'focus-blast',
      damage_class: 'special',
      power: 120,
      accuracy: 70,
      pp: 5,
      move_type_id: 3,
    },
    {
      id: 9,
      pokemon_id: 3,
      name: 'swords-dance',
      damage_class: 'status',
      power: null,
      accuracy: null,
      pp: 20,
      move_type_id: 1,
    },
    {
      id: 10,
      pokemon_id: 3,
      name: 'kowtow-cleave',
      damage_class: 'physical',
      power: 85,
      accuracy: null,
      pp: 10,
      move_type_id: 16,
    },
    {
      id: 11,
      pokemon_id: 3,
      name: 'sucker-punch',
      damage_class: 'physical',
      power: 70,
      accuracy: 100,
      pp: 5,
      move_type_id: 16,
    },
    {
      id: 12,
      pokemon_id: 3,
      name: 'iron-head',
      damage_class: 'physical',
      power: 80,
      accuracy: 100,
      pp: 15,
      move_type_id: 17,
    },
    {
      id: 13,
      pokemon_id: 4,
      name: 'calm-mind',
      damage_class: 'status',
      power: null,
      accuracy: null,
      pp: 20,
      move_type_id: 10,
    },
    {
      id: 14,
      pokemon_id: 4,
      name: 'surf',
      damage_class: 'special',
      power: 90,
      accuracy: 100,
      pp: 15,
      move_type_id: 4,
    },
    {
      id: 15,
      pokemon_id: 4,
      name: 'moonblast',
      damage_class: 'special',
      power: 95,
      accuracy: 100,
      pp: 15,
      move_type_id: 18,
    },
    {
      id: 16,
      pokemon_id: 4,
      name: 'psychic-noise',
      damage_class: 'special',
      power: 75,
      accuracy: 100,
      pp: 10,
      move_type_id: 10,
    },
    {
      id: 17,
      pokemon_id: 5,
      name: 'ceaseless-edge',
      damage_class: 'physical',
      power: 65,
      accuracy: 90,
      pp: 15,
      move_type_id: 16,
    },
    {
      id: 18,
      pokemon_id: 5,
      name: 'razor-shell',
      damage_class: 'physical',
      power: 75,
      accuracy: 95,
      pp: 10,
      move_type_id: 4,
    },
    {
      id: 19,
      pokemon_id: 5,
      name: 'knock-off',
      damage_class: 'physical',
      power: 65,
      accuracy: 100,
      pp: 20,
      move_type_id: 16,
    },
    {
      id: 20,
      pokemon_id: 5,
      name: 'encore',
      damage_class: 'status',
      power: null,
      accuracy: 100,
      pp: 5,
      move_type_id: 1,
    },
    {
      id: 21,
      pokemon_id: 6,
      name: 'stealth-rock',
      damage_class: 'status',
      power: null,
      accuracy: null,
      pp: 20,
      move_type_id: 11,
    },
    {
      id: 22,
      pokemon_id: 6,
      name: 'earth-power',
      damage_class: 'special',
      power: 90,
      accuracy: 100,
      pp: 10,
      move_type_id: 9,
    },
    {
      id: 23,
      pokemon_id: 6,
      name: 'u-turn',
      damage_class: 'physical',
      power: 70,
      accuracy: 100,
      pp: 20,
      move_type_id: 13,
    },
    {
      id: 24,
      pokemon_id: 6,
      name: 'grass-knot',
      damage_class: 'special',
      power: null,
      accuracy: 100,
      pp: 20,
      move_type_id: 6,
    },
  ])
}

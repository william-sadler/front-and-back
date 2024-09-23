import {
  CurrentAbility,
  Badges,
  EIV,
  Moves,
  CurrentNature,
  OfficialArtwork,
  Pokemon,
  PokemonData,
  Sprites,
  UserProfile,
} from '../../models/pokemon.ts'
import db from './connection.ts'

// Type Matcher
const typeMatcher = [
  'undefined',
  'normal',
  'fire',
  'fighting',
  'water',
  'flying',
  'grass',
  'poison',
  'electric',
  'ground',
  'psychic',
  'rock',
  'ice',
  'bug',
  'dragon',
  'ghost',
  'dark',
  'steel',
  'fairy',
]

// Helper function to get Pokémon data
async function getPokemonData(teamId: number): Promise<PokemonData[]> {
  return await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .leftJoin('types as type1', 'pokemon.type1_id', 'type1.id')
    .leftJoin('types as type2', 'pokemon.type2_id', 'type2.id')
    .select(
      'pokemon.id',
      'pokemon.pokemon_team_id as pokemonTeam',
      'pokemon.level',
      'pokemon.name',
      'type1.name as type1',
      'type2.name as type2',
      'pokemon.is_shiny as shiny',
      'pokemon.sprites_id',
      'pokemon.ability_id',
      'pokemon.nature_id',
      'pokemon.effort_id',
      'pokemon.individual_id',
    )
}

async function mapPokemonData(
  pokemon: PokemonData[],
  teamId: number,
): Promise<Pokemon[]> {
  const [
    sprites,
    official,
    showdown,
    ability,
    nature,
    effortValues,
    individualValues,
    moves,
  ] = await Promise.all([
    getPokemonSprites(teamId),
    getOtherOfficial(teamId),
    getOtherShowdown(teamId),
    getPokemonAbility(teamId),
    getPokemonNature(teamId),
    getPokemonEV(teamId),
    getPokemonIV(teamId),
    getPokemonMoves(teamId),
  ])

  return pokemon.map(
    (value): Partial<Pokemon> => ({
      ...value,
      ability: ability.find((item) => value.ability_id === item.id),
      nature: nature.find((item) => value.nature_id === item.id),
      ev: effortValues.find((item) => item.effortId === value.effort_id),
      iv: individualValues.find(
        (item) => item.individualId === value.individual_id,
      ),
      moves: moves.filter((item) => item.pokemonId === value.id),
      sprites: {
        ...sprites.find((item) => item.spritesId === value.id),
        other: {
          'official-artwork': official.find(
            (item) => item.officialId === value.id,
          ),
          showdown: showdown.find((item) => item.spritesId === value.id),
        },
      },
    }),
  ) as Pokemon[]
}

// Get all Pokémon in a team
export async function getMyPokemon(teamId: number): Promise<Pokemon[]> {
  const pokemon = await getPokemonData(teamId)
  return await mapPokemonData(pokemon, teamId)
}

// Get a Pokémon by ID
export async function getMyPokemonById(pokeId: number): Promise<Pokemon> {
  const pokemon = await db('pokemon')
    .where('pokemon.id', pokeId)
    .leftJoin('types as type1', 'pokemon.type1_id', 'type1.id')
    .leftJoin('types as type2', 'pokemon.type2_id', 'type2.id')
    .first(
      'pokemon.id',
      'pokemon.pokemon_team_id as pokemonTeam',
      'pokemon.level',
      'pokemon.name',
      'pokemon.is_shiny as shiny',
      'type1.name as type1',
      'type2.name as type2', // This will be null if type2_id is null
      'pokemon.sprites_id',
      'pokemon.ability_id',
      'pokemon.nature_id',
      'pokemon.effort_id',
      'pokemon.individual_id',
    )

  if (!pokemon) {
    throw new Error('Pokemon not found')
  }

  const [result] = await mapPokemonData([pokemon], pokemon.pokemonTeam)
  return result
}

// Get Pokémon data by ID without additional relations
export async function getMyPokemonDataById(
  pokeId: number,
): Promise<PokemonData> {
  return (await db('pokemon')
    .where('pokemon.id', pokeId)
    .first()) as PokemonData
}

async function getPokemonMoves(teamId: number): Promise<Moves[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .leftJoin('moves', 'moves.pokemon_id', 'pokemon.id')
    .leftJoin('types', 'moves.move_type_id', 'types.id')
    .select(
      'moves.id',
      'moves.pokemon_id as pokemonId',
      'moves.name',
      'moves.damage_class as damageClass',
      'moves.power',
      'moves.accuracy',
      'moves.pp',
      'types.name as type',
    )
  return result as Moves[]
}

async function getPokemonEV(teamId: number): Promise<EIV[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('effort', 'pokemon.effort_id', 'effort.id')
    .select(
      'effort.id as effortId',
      'effort.hp as hp',
      'effort.attack as attack',
      'effort.defense as defense',
      'effort.special_attack as specialAttack',
      'effort.special_defense as specialDefense',
      'effort.speed as speed',
    )
  return result as EIV[]
}

async function getPokemonIV(teamId: number): Promise<EIV[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('individual', 'pokemon.individual_id', 'individual.id')
    .select(
      'individual.id as individualId',
      'individual.hp as hp',
      'individual.attack as attack',
      'individual.defense as defense',
      'individual.special_attack as specialAttack',
      'individual.special_defense as specialDefense',
      'individual.speed as speed',
    )
  return result as EIV[]
}

async function getPokemonSprites(teamId: number): Promise<Sprites[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('sprites', 'pokemon.sprites_id', 'sprites.id')
    .select(
      'sprites.id as spritesId',
      'sprites.front_default',
      'sprites.front_shiny',
      'sprites.back_default',
      'sprites.front_default',
      'sprites.back_shiny',
      'sprites.other_id as other',
    )
  return result as Sprites[]
}

async function getPokemonAbility(teamId: number): Promise<CurrentAbility[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('abilities', 'pokemon.ability_id', 'abilities.id')
    .select(
      'abilities.id',
      'abilities.name',
      'abilities.flavor_text as flavorText',
    )
  return result as CurrentAbility[]
}

async function getPokemonNature(teamId: number): Promise<CurrentNature[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('natures', 'pokemon.nature_id', 'natures.id')
    .select(
      'natures.id',
      'natures.name',
      'natures.increased_stat as increasedStat',
      'natures.decreased_stat as decreasedStat',
    )
  return result as CurrentNature[]
}

async function getOtherOfficial(teamId: number): Promise<OfficialArtwork[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('sprites', 'pokemon.sprites_id', 'sprites.id')
    .join('other', 'sprites.other_id', 'other.id')
    .join('official', 'other.official_id', 'official.id')
    .select(
      'official.id as officialId',
      'official.front_default',
      'official.front_shiny',
    )
  return result as OfficialArtwork[]
}
async function getOtherShowdown(teamId: number): Promise<Sprites[]> {
  const result = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .join('sprites', 'pokemon.sprites_id', 'sprites.id')
    .join('other', 'sprites.other_id', 'other.id')
    .join('showdown', 'other.showdown_id', 'showdown.id')
    .select(
      'showdown.id as spritesId',
      'showdown.front_default',
      'showdown.front_shiny',
      'showdown.back_default',
      'showdown.front_default',
      'showdown.back_shiny',
    )
  return result as Sprites[]
}

// Deleting a Team

export async function deleteMyTeam(teamId: number): Promise<void> {
  const indexID = await db('pokemon')
    .where('pokemon.pokemon_team_id', teamId)
    .select('pokemon.id')

  try {
    await Promise.all(indexID.map(({ id }) => deleteMyPokemonById(id)))
    await db('teams').where('teams.id', teamId).del()
  } catch (err) {
    console.log(err)
  }
}

// Deleting A Pokemon //

export async function deleteMyPokemonById(pokeId: number): Promise<void> {
  try {
    await Promise.all(
      Array(4)
        .fill(null)
        .map(() => deleteMyMovesById(pokeId)),
    )
    await db('pokemon').where('pokemon.id', pokeId).del()
    await deleteMySpritesById(pokeId)
    await deleteMyEvById(pokeId)
    await deleteMyNatureById(pokeId)
    await deleteMyAbilityById(pokeId)
  } catch (error) {
    console.error('Error Deleting Pokemon:', error)
  }
}

async function deleteMyEvById(pokeId: number) {
  await db('effort').where('effort.id', pokeId).del()
}

async function deleteMyNatureById(pokeId: number) {
  await db('natures').where('natures.id', pokeId).del()
}

async function deleteMyAbilityById(pokeId: number) {
  await db('abilities').where('abilities.id', pokeId).del()
}

async function deleteMyMovesById(pokeId: number) {
  await db('moves').where('moves.pokemon_id', pokeId).del()
}

async function deleteMySpritesById(pokeId: number) {
  await db('sprites').where('sprites.id', pokeId).del()
  await db('other').where('other.id', pokeId).del()
  await db('showdown').where('showdown.id', pokeId).del()
  await db('official').where('official.id', pokeId).del()
}

// Adding a New Team

export async function AddMyTeam(
  userName: string,
  token: string,
): Promise<void> {
  const teamId = await db('teams').insert({
    name: userName,
    wins: 0,
    is_new: true,
    user_token: token,
    badges_id: 1,
  })
  const indexID = await db('pokemon').select('pokemon.id')
  try {
    await Promise.all(
      Array(6)
        .fill(null)
        .map((nulled, i) =>
          AddMyPokemonById(
            teamId[0],
            indexID[indexID.length === 0 ? 0 : indexID.length - 1]?.id === 1 ||
              undefined
              ? 1 + i
              : indexID[indexID.length === 0 ? 0 : indexID.length - 1]?.id +
                  1 +
                  i,
          ),
        ),
    )
  } catch (err) {
    console.error('Error adding team:', err)
  }
}

// Adding A Pokemon

export async function AddMyPokemonById(
  teamId: number,
  pokeId: number,
): Promise<void> {
  try {
    const newId = await addMyEvById()
    await addMyNatureById()
    await addMyAbilityById()
    await addMySpritesById()

    const existingPokemon = await db('pokemon')
      .where({ sprites_id: pokeId })
      .first()
    if (existingPokemon) {
      throw new Error('Pokemon with this sprite ID already exists.')
    }

    await db('pokemon').insert({
      pokemon_team_id: teamId,
      level: 0,
      name: '',
      is_shiny: 0,
      sprites_id: newId,
      effort_id: newId,
      individual_id: 1,
      ability_id: newId,
      nature_id: newId,
      moves_id: newId,
    })

    await Promise.all(
      Array(4)
        .fill(null)
        .map(() => addMyMovesById(newId)),
    )
  } catch (error) {
    console.error('Error adding Pokemon:', error)
  }
}

async function addMyEvById(): Promise<number> {
  const evId = await db('effort').insert({
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  })
  return evId[0]
}

async function addMyNatureById() {
  await db('natures').insert({
    name: '',
    increased_stat: null,
    decreased_stat: null,
  })
}

async function addMyAbilityById() {
  await db('abilities').insert({
    name: '',
    flavor_text: '',
  })
}

async function addMyMovesById(pokeId: number) {
  await db('moves').insert({
    pokemon_id: pokeId,
    name: '',
    damage_class: null,
    power: null,
    accuracy: null,
    pp: null,
  })
}

async function addMySpritesById() {
  const showdownId = await db('showdown').insert({
    front_default: '../../images/place-holder-plush.png',
    front_shiny: '../../images/place-holder-plush.png',
    back_default: '../images/place-holder-plush.png',
    back_shiny: '../images/place-holder-plush.png',
  })
  const officialId = await db('official').insert({
    front_default: '../images/place-holder-plush.png',
    front_shiny: '../images/place-holder-plush.png',
  })
  const otherId = await db('other').insert({
    official_id: officialId[0],
    showdown_id: showdownId[0],
  })
  await db('sprites').insert({
    front_default: '../images/place-holder-plush.png',
    front_shiny: '../images/place-holder-plush.png',
    back_default: '../images/place-holder-plush.png',
    back_shiny: '../images/place-holder-plush.png',
    other_id: otherId[0],
  })
}

export async function getAllTeams(): Promise<UserProfile[]> {
  const teams = await db('teams').select(
    'teams.id',
    'teams.name as userName',
    'teams.wins',
    'teams.user_token as userToken',
    'teams.is_new as isNew',
  )
  const badges = await getAllBadges()
  const result = teams.map((value) => {
    return {
      ...value,
      badges: badges.filter((item) => item.teamId === value.id),
    }
  })
  return result as UserProfile[]
}

async function getAllBadges(): Promise<Badges[]> {
  const teams = await db('badges').select(
    'badges.id',
    'badges.team_badges_id as teamId',
    'badges.name',
    'badges.region',
    'badges.badge_sprite as badgeSprite',
  )

  return teams as Badges[]
}

export async function updatePokemonById(
  pokeId: number,
  data: Partial<Pokemon>,
): Promise<void> {
  const toSnakeCase = {
    pokemon_team_id: data.pokemonTeam,
    level: data.level,
    name: data.name,
    is_shiny: data.shiny,
    type1_id: data.type1_id,
    type2_id: data.type2_id || null,
  }
  try {
    await db.transaction(async (trx) => {
      await trx('pokemon').where('id', pokeId).update(toSnakeCase)
    })
    console.log('Update successful')
  } catch (error) {
    console.error('Error updating Pokémon:', error)
    throw new Error('Failed to update Pokémon data')
  }
}

export async function updateEffortById(
  effortId: number,
  data: Partial<EIV>,
): Promise<void> {
  await db('effort')
    .where('id', effortId)
    .update({
      hp: data.hp || 0,
      attack: data.attack || 0,
      defense: data.defense || 0,
      special_attack: data.specialAttack || 0,
      special_defense: data.specialDefense || 0,
      speed: data.speed || 0,
    })
}

export async function updateAbilityById(
  abilityId: number,
  data: Partial<CurrentAbility>,
): Promise<void> {
  await db('abilities').where('id', abilityId).update({
    name: data.name,
    flavor_text: data.flavorText,
  })
}

export async function updateNatureById(
  natureId: number,
  data: Partial<CurrentNature>,
): Promise<void> {
  await db('natures').where('id', natureId).update({
    name: data.name,
    increased_stat: data.increasedStat,
    decreased_stat: data.decreasedStat,
  })
}

export async function updateMovesById(
  moveId: number,
  data: Partial<Moves>,
): Promise<void> {
  await db('moves')
    .where('id', moveId)
    .update({
      name: data.name,
      damage_class: data.damageClass,
      power: data.power,
      accuracy: data.accuracy,
      pp: data.pp,
      move_type_id:
        typeMatcher.findIndex((type) => type === data.type) === -1
          ? 1
          : typeMatcher.findIndex((type) => type === data.type),
    })
}

export async function updateSpritesById(
  id: number,
  data: Partial<Sprites>,
): Promise<void> {
  await db('sprites').where({ id }).update({
    front_default: data.front_default,
    front_shiny: data.front_shiny,
    back_default: data.back_default,
    back_shiny: data.back_shiny,
  })
}

export async function updateOfficialById(
  id: number,
  data: Partial<OfficialArtwork>,
): Promise<void> {
  await db('official').where({ id }).update({
    front_default: data.front_default,
    front_shiny: data.front_shiny,
  })
}

export async function updateShowdownById(
  id: number,
  data: Partial<Sprites>,
): Promise<void> {
  await db('showdown').where({ id }).update({
    front_default: data.front_default,
    front_shiny: data.front_shiny,
    back_default: data.back_default,
    back_shiny: data.back_shiny,
  })
}

// User Check

export async function userCanEdit(id: number, auth0Id: string) {
  return db('teams')
    .where('teams.id', id)
    .first()
    .then((team: { user_token: string }) => {
      if (team.user_token !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}

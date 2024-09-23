import request from 'superagent'
import {
  CurrentAbility,
  Moves,
  Pokemon,
  PokemonData,
  PokemonGeneration,
  PokemonTeam,
  UserProfile,
} from '../../models/pokemon'
import {
  AllAbilites,
  NewAbility,
  NewCurrentMove,
  NewMove,
  NewNature,
  PokeAPI,
  Result,
} from '../../models/pokeAPI'
import { SRSprites } from '../../models/searchResults'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function getPokemonByTeam(teamId: number): Promise<PokemonTeam> {
  const result = await request.get(`/api/v1/pokemon/${teamId}`)
  return result.body as PokemonTeam
}
export async function getPokemonById(id: number): Promise<Pokemon> {
  const result = await request.get(`/api/v1/pokemon/details/${id}`)
  console.log(result.body)
  return result.body as Pokemon
}
export async function getPokemonDataById(id: number): Promise<PokemonData> {
  const result = await request.get(`/api/v1/pokemon/data/${id}`)

  return result.body as PokemonData
}

export async function getAllTeams(): Promise<UserProfile[]> {
  const result = await request.get(`/api/v1/users`)
  return result.body as UserProfile[]
}

export async function fetchAllPokemonNames(): Promise<PokemonGeneration> {
  const result = await request.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=920`,
  )
  return result.body as PokemonGeneration
}

export async function fetchPokemonByName(name: string): Promise<PokeAPI> {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.body as PokeAPI
}

export async function fetchAllNatureNames(): Promise<Result[]> {
  const res = await request.get(
    `https://pokeapi.co/api/v2/nature/?offset=0&limit=25`,
  )
  return res.body.results as Result[]
}

export async function fetchNatureByName(name: string): Promise<NewNature> {
  const res = await request.get(`https://pokeapi.co/api/v2/nature/${name}`)
  return res.body as NewNature
}

export async function fetchAllAbilityNames(
  name: string,
): Promise<AllAbilites[]> {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.body.abilities as AllAbilites[]
}

export async function fetchAbilityByName(name: string): Promise<NewAbility> {
  const res = await request.get(`https://pokeapi.co/api/v2/ability/${name}`)
  return res.body as NewAbility
}

export async function fetchAllMovesNames(name: string): Promise<NewMove[]> {
  const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

  return res.body.moves as NewMove[]
}

export async function fetchMoveByName(name: string): Promise<NewCurrentMove> {
  const res = await request.get(`  https://pokeapi.co/api/v2/move/${name}`)

  return res.body as NewCurrentMove
}

// Updates //

interface UpdatePokemonFunction {
  id: number
  data: Partial<Pokemon>
  token: string
  teamId: number
}

// Function to update Pokémon abilities
export async function updateResetAbilityById(
  id: number,
  abilities: CurrentAbility[],
  token: string,
  teamId: number,
): Promise<void> {
  const promises = abilities.map((ability) => {
    // Assuming you have a function that updates ability by ID
    return request
      .put(`/api/v1/pokemon/update/ability/${teamId}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: ability.name })
  })
  await Promise.all(promises)
}

// Function to update Pokémon moves
export async function updateResetMovesById(
  moves: Moves[],
  token: string,
  teamId: number,
): Promise<void> {
  // Create an array of promises, each for updating a single move
  const promises = moves.map((move) => {
    return request
      .put(`/api/v1/pokemon/update/moves/${teamId}/${move.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(move)
  })

  // Wait for all promises to complete
  await Promise.all(promises)
}

// Main function to update Pokémon
export async function updatePokemonById({
  id,
  data,
  token,
  teamId,
}: UpdatePokemonFunction): Promise<void> {
  // Extract the necessary data for each update request
  const { pokemonTeam, name, level, type1_id, type2_id, ability, moves } = data

  // Prepare requests for updating the Pokémon's basic details
  const updateBasicDetails = request
    .patch(`/api/v1/pokemon/update/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      pokemonTeam,
      name,
      level,
      type1_id,
      type2_id,
    })

  // Prepare requests for updating abilities
  const updateAbilities = ability
    ? updateResetAbilityById(id, [ability], token, teamId)
    : Promise.resolve()

  // Prepare requests for updating moves
  const updateMoves = updateResetMovesById(moves || [], token, teamId)

  // Execute all update requests
  await Promise.all([updateBasicDetails, updateAbilities, updateMoves])
}

interface UpdateStatsFunction {
  id: number
  name: string
  token: string
  teamId: number
}

// Function to update the ability by ID
export async function updateAbilityById({
  id,
  name,
  token,
  teamId,
}: UpdateStatsFunction): Promise<void> {
  // Fetch nature data from PokeAPI
  const abilityData = await fetchAbilityByName(name)

  // Transform the data to match the expected shape for your backend API
  const transformedData = {
    name: abilityData.name,
    flavorText:
      abilityData.flavor_text_entries
        .reverse()
        .find((entry) => entry.language.name === 'en')?.flavor_text ?? '',
  }
  // Send the transformed data to your backend API
  const result = await request
    .put(`/api/v1/pokemon/update/ability/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(transformedData)

  return result.body
}

// Update Pokémon nature
export async function updateNatureById({
  id,
  name,
  token,
  teamId,
}: UpdateStatsFunction): Promise<void> {
  // Fetch ability data from PokeAPI
  const NatureData = await fetchNatureByName(name)

  // Transform the data to match the expected shape for your backend API
  const transformedData = {
    name: NatureData.name,
    increasedStat: NatureData.increased_stat?.name || null,
    decreasedStat: NatureData.decreased_stat?.name || null,
  }
  const result = await request
    .put(`/api/v1/pokemon/update/nature/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(transformedData)
  return result.body
}

// Update Pokémon moves
export async function updateMovesById({
  id,
  name,
  token,
  teamId,
}: UpdateStatsFunction): Promise<void> {
  const MoveData = await fetchMoveByName(name)

  const transformedData = {
    name: MoveData.name,
    damageClass: MoveData.damage_class.name,
    power: MoveData.power,
    accuracy: MoveData.accuracy,
    pp: MoveData.pp,
    type: MoveData.type.name,
  }

  const result = await request
    .put(`/api/v1/pokemon/update/moves/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(transformedData)
  return result.body
}

interface UpdateSpritesFunction {
  id: number
  sprites: Partial<SRSprites>
  token: string
  teamId: number
}

// Update Pokémon sprites (including official artwork and showdown)
export async function updateSpritesById({
  id,
  sprites,
  token,
  teamId,
}: UpdateSpritesFunction): Promise<void> {
  const result = await request
    .put(`/api/v1/pokemon/update/sprites/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ sprites })
  return result.body
}

interface UpdateEffortFunction {
  id: number
  data: Partial<Pokemon>
  token: string
  teamId: number
}

// Update Pokémon effort values
export async function updateSubmitById({
  id,
  data,
  token,
  teamId,
}: UpdateEffortFunction): Promise<void> {
  await request
    .put(`/api/v1/pokemon/update/effort/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(data.ev)
  await request
    .patch(`/api/v1/pokemon/update/${teamId}/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
}

// add Team

interface addTeamFunction {
  id: number
  userName: string
  token: string
}

export async function addTeamByName({
  userName,
  token,
}: addTeamFunction): Promise<void> {
  await request
    .post('/api/v1/pokemon/team')
    .set('Authorization', `Bearer ${token}`)
    .send({ userName: userName })
}

// delete Team

export async function deleteMyTeamById({
  id,
  token,
}: addTeamFunction): Promise<void> {
  await request
    .delete(`/api/v1/pokemon/team/${id}`)
    .set('Authorization', `Bearer ${token}`)
}

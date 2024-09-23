export interface PokemonTeam {
  team: Pokemon[]
}

export interface Pokemon {
  id: number
  pokemonTeam: number
  level: number
  name: string
  type1_id: number
  type2_id: number | null
  type1: string
  type2: string
  shiny: boolean
  ev: EIV
  iv: EIV
  ability: CurrentAbility
  nature: CurrentNature
  moves: Moves[]
  sprites?: Sprites
}

export interface Moves {
  id: number
  pokemonId: number
  name: string
  damageClass: string | null
  power: number | null
  accuracy: number | null
  pp: number | null
  type: string | null
}

export interface CurrentAbility {
  id: number
  name: string
  flavorText: string
}

export interface CurrentNature {
  id: number
  name: string
  increasedStat: string | null
  decreasedStat: string | null
}

export interface EIV {
  individualId: number
  effortId: number
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface PokemonData {
  id: number
  pokemon_team_id: number
  level: number
  name: string
  type1_id: number
  type2_id: number
  is_shiny: boolean
  sprites_id: number
  effort_id: number
  individual_id: number
  ability_id: number
  nature_id: number
  moves_id: number
}

// Teams //
export interface UserProfile {
  id: number
  userName: string
  wins: number
  isNew: boolean
  userToken: string
  badges: Badges[]
}

export interface Badges {
  id: number
  teamId: number
  name: string
  region: string
  badgeSprite: string
}

// Sprites //
export interface Sprites {
  spritesId?: number
  front_default?: null | string
  front_shiny?: null | string
  back_default?: null | string
  back_shiny?: null | string
  other?: Other
}

export interface Other {
  'official-artwork'?: OfficialArtwork
  showdown?: Sprites
}

export interface OfficialArtwork {
  officialId?: number | string
  front_default?: null | string
  front_shiny?: null | string
}

export interface PokemonGeneration {
  id: number
  main_region: ApiLink
  moves?: ApiLink[]
  name: string
  names?: Name[]
  pokemon_species: ApiLink[]
  results: ApiLink[]
  types?: ApiLink[]
  version_groups?: ApiLink[]
}

export interface ApiLink {
  name: string
  url: string
}

export interface Name {
  language: ApiLink
  name: string
}

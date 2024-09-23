// Search Results //
export interface SearchResultData {
  pokemonTeam: number
  name: string
  type1_id: number
  type1: string
  type2_id: number | null
  type2: string
  iv: SREIVData
  sprites: SRSprites
}

export interface SREIVData {
  id: number
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface SRSprites {
  id: number
  front_default: null | string
  front_shiny: null | string
  back_default: null | string
  back_shiny: null | string
  other?: Other
}

export interface Other {
  'official-artwork': OfficialArtwork
  showdown: SRSprites
}

export interface OfficialArtwork {
  id: number | string
  front_default: null | string
  front_shiny: null | string
}

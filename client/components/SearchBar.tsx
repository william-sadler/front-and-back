import { useState, useEffect } from 'react'
import { useAllPokemonNames, usePokemonByName } from '../hooks/usePokemon'
import { SearchResultData } from '../../models/searchResults'
import { PokeAPI } from '../../models/pokeAPI'
import { Pokemon } from '../../models/pokemon'

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
interface Props {
  currentPokemon: Pokemon
  pokemonId: number
  onSubmit: (searchResult: SearchResultData) => void
}

export default function SearchBar({
  currentPokemon,
  pokemonId,
  onSubmit,
}: Props) {
  const [newItem, setNewItem] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [pokeNames, setAutoComplete] = useState<string[]>([])
  const [newPokemon, setNewPokemon] = useState<string>('')
  const { isPending, isError, data, error } = useAllPokemonNames()
  const pokemonScrapable = usePokemonByName(newPokemon)

  useEffect(() => {
    if (!newPokemon) return

    // Fetch Pokemon data whenever newPokemon changes
    pokemonScrapable.refetch()
  }, [newPokemon, pokemonScrapable])

  if (isPending) return <p>Loading...</p>
  if (isError) return <span>Error: {error.message}</span>

  const searchResults = data

  const createSearchResult = (pokemonData: PokeAPI) => ({
    pokemonTeam: currentPokemon.pokemonTeam,
    name: pokemonData.name,
    type1_id:
      typeMatcher.findIndex(
        (type) => type === pokemonData.types[0]?.type.name,
      ) === -1
        ? 1
        : typeMatcher.findIndex(
            (type) => type === pokemonData.types[0]?.type.name,
          ),
    type2_id:
      typeMatcher.findIndex(
        (type) => type === pokemonData.types[1]?.type.name || '',
      ) === -1
        ? null
        : typeMatcher.findIndex(
            (type) => type === pokemonData.types[1]?.type.name || '',
          ),
    type1: pokemonData.types[0]?.type.name,
    type2: pokemonData.types[1]?.type.name || '',
    iv: {
      id: pokemonId,
      hp: 31,
      attack: 31,
      defense: 31,
      specialAttack: 31,
      specialDefense: 31,
      speed: 31,
    },
    sprites: {
      id: pokemonId,
      front_default: pokemonData.sprites.front_default,
      front_shiny: pokemonData.sprites.front_shiny,
      back_default: pokemonData.sprites.back_default,
      back_shiny: pokemonData.sprites.back_shiny,
      other: {
        'official-artwork': {
          id: pokemonId,
          front_default:
            pokemonData.sprites.other?.['official-artwork']?.front_default ||
            null,
          front_shiny:
            pokemonData.sprites.other?.['official-artwork']?.front_shiny ||
            null,
        },
        showdown: {
          id: pokemonId,
          front_default:
            pokemonData.sprites.other?.showdown?.front_default || null,
          front_shiny: pokemonData.sprites.other?.showdown?.front_shiny || null,
          back_default:
            pokemonData.sprites.other?.showdown?.back_default || null,
          back_shiny: pokemonData.sprites.other?.showdown?.back_shiny || null,
        },
      },
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!pokeNames[0]) return

    setNewPokemon(
      pokeNames[0]
        ? pokeNames[0].toLocaleLowerCase()
        : isNaN(Number(newItem))
          ? pokeNames[0].toLocaleLowerCase()
          : String(newItem),
    )
    await pokemonScrapable.refetch()

    if (pokemonScrapable.isPending) return

    if (pokemonScrapable.isError) {
      console.error(pokemonScrapable.error.message)
      return
    }

    try {
      const searchResult = createSearchResult(pokemonScrapable.data)
      setNewItem('')
      setAutoComplete([])
      onSubmit(searchResult)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = async (pokename: string) => {
    setNewPokemon(pokename.toLowerCase())
    await pokemonScrapable.refetch()
    if (pokemonScrapable.isPending) return

    if (pokemonScrapable.isError) {
      console.error(pokemonScrapable.error.message)
      return
    }

    try {
      const searchResult = createSearchResult(pokemonScrapable.data)
      setNewItem('')
      setAutoComplete([])
      onSubmit(searchResult)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value)
    setShowDropdown(
      event.target.value.length > 0 && isNaN(Number(event.target.value)),
    )
    if (event.target.value === '' || !isNaN(Number(event.target.value))) {
      setAutoComplete([])
      return
    }
    const reg = new RegExp(event.target.value, 'i')
    setAutoComplete(
      searchResults.results
        .filter((term) => reg.test(term.name))
        .map((term) => term.name),
    )
  }

  return (
    <div className="searchbar">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="myInput">Pokemon: </label>
        <div className="autocomplete" style={{ width: `300px` }}>
          <input
            type="text"
            name="myPokemon"
            id="myInput"
            value={newItem}
            placeholder="Pokemon"
            onChange={handleChange}
            aria-autocomplete="list"
            aria-controls="myInputautocomplete-list"
          />
          <div
            id="myInputautocomplete-list"
            className={`autocomplete-items ${showDropdown ? 'show' : ''}`}
            role="listbox"
          >
            {pokeNames.slice(0, 5).map((name) => (
              <button
                type="button"
                onClick={() => handleClick(name)}
                key={name}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="search-button"
          aria-label="Submit search"
          onClick={() =>
            handleClick(
              pokeNames[0]
                ? pokeNames[0]
                : isNaN(Number(newItem))
                  ? pokeNames[0]
                  : String(newItem),
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
        </button>
      </form>

      {/* <button
        className="feelinglucky"
        onClick={() =>
          handleClick(
            `${searchResults.results[Math.floor(Math.random() * 921)].name}`,
          )
        }
      >
        Feeling lucky?
      </button> */}
    </div> // Not sure why, but when the feeling lucky button is enabled, it breaks the database in ways I can't understand, I'll have to figure out why later
  )
}

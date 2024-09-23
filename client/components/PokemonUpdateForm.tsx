import { useState } from 'react'
import { usePokemonById, usePokemonDataById } from '../hooks/usePokemon.ts'
import { SearchResultData, SRSprites } from '../../models/searchResults.ts'
import { Pokemon } from '../../models/pokemon.ts'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.tsx'
import Nature from './Nature.tsx'
import Abilities from './Abilities.tsx'
import AllMoves from './AllMoves.tsx'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  pokemonId: Pokemon
  onUpdate: () => void
}

type EvNames =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

type FormState =
  | {
      selectedPokemon: Pokemon
      selectedSprites: SRSprites
      show: 'selected'
      pokeId: number
    }
  | {
      selectedPokemon: null
      show: 'default'
      pokeId: number
    }

export default function PokemonUpdateForm({ pokemonId, onUpdate }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const [isShiny, setShiny] = useState(pokemonId.shiny)
  const tempId = 99
  const [updatedLevel, setUpdatedLevel] = useState(pokemonId.level || null)
  const [updatedEv, setUpdatedEv] = useState(pokemonId.ev)
  const [form, setForm] = useState<FormState>({
    selectedPokemon: null,
    show: 'default',
    pokeId: pokemonId.id,
  })

  const pokemon = usePokemonById(form.pokeId)
  const { data, isPending, isError, error, failureCount } = usePokemonDataById(
    pokemonId.id,
  )

  const handleMutationSuccess = () => {
    onUpdate()
    pokemon.refetch()
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
  }

  if (isPending || !data) {
    let failures = ''
    if (failureCount > 0) {
      failures = ` (failed ${failureCount} times)`
    }

    return <div>Loading... {failures}</div>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }
  if (!pokemon?.data) {
    navigate('/teams')
    return <p>Redirecting...</p>
  }

  const handleSearchSubmit = async (searchResult: SearchResultData) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    const defaultMove = {
      pokemonId: pokemonId.id,
      name: '',
      damageClass: null,
      power: null,
      accuracy: null,
      pp: null,
      type: null,
    }
    const defaultMoves = pokemonId.moves.map((move) => {
      return { id: move.id, ...defaultMove }
    })
    const newPokemonData = {
      id: data.id,
      pokemonTeam: searchResult.pokemonTeam,
      name: searchResult.name,
      type1_id: searchResult.type1_id,
      type2_id: searchResult.type2_id,
      type1: searchResult.type1,
      type2: searchResult.type2,
      level: 0,
      shiny: isShiny,
      ev: pokemon.data.ev,
      iv: pokemon.data.iv,
      ability: {
        id: 0,
        name: '',
        flavorText: '',
      },
      nature: pokemon.data.nature,
      moves: defaultMoves,
      sprites: pokemon.data.sprites,
    }
    setForm({
      selectedPokemon: newPokemonData,
      selectedSprites: searchResult.sprites as SRSprites,
      show: 'selected',
      pokeId: pokemon.data.id,
    })
    pokemon.updatePokemon.mutate(
      {
        id: data.id,
        data: newPokemonData,
        token: token,
        teamId: pokemon.data.pokemonTeam,
      },
      mutationOptions,
    )
    pokemon.updateSprites.mutate(
      {
        id: data.id,
        sprites: searchResult.sprites,
        token: token,
        teamId: pokemon.data.pokemonTeam,
      },
      mutationOptions,
    )
  }
  const handleCheckboxChange = async () => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    setShiny((prev) => !prev)
    pokemon.updateSubmit.mutate(
      {
        id: pokemonId.id,
        data: {
          ...(form.selectedPokemon || pokemon),
          level: updatedLevel || 0,
          shiny: !isShiny,
          ev: updatedEv,
        },
        token: token,
        teamId: pokemon.data.pokemonTeam,
      },
      mutationOptions,
    )
  }

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    if (event) {
      event.preventDefault()
    }
    pokemon.updateSubmit.mutate(
      {
        id: pokemonId.id,
        data: {
          ...(form.selectedPokemon || pokemon),
          level: updatedLevel || 0,
          shiny: isShiny,
          ev: updatedEv,
        },
        token: token,
        teamId: pokemon.data.pokemonTeam,
      },
      mutationOptions,
    )
  }

  const currentPokemon = pokemon.data
  const maxTotal = 511

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Check if the value is empty, in which case set it to null
    if (value === '' && name === 'level') {
      setUpdatedLevel(null)
      return
    }

    if (value === '' && !(name === 'level')) {
      setUpdatedEv((prev) => ({
        ...prev,
        [name]: null,
      }))
      return
    }

    if (!(name === 'level')) {
      const numberValue = Number(value)
      const clampedValue = Math.max(0, Math.min(255, numberValue))
      const totalEv = Object.values(updatedEv).reduce(
        (sum, ev) => sum + (ev || 0),
        0,
      )
      const newTotal =
        totalEv - (updatedEv[name as EvNames] || 0) + clampedValue

      if (newTotal <= maxTotal) {
        setUpdatedEv((prev) => ({
          ...prev,
          [name]: clampedValue,
        }))
      }
    }
    if (name === 'level') {
      // Convert the value to a number
      const numberValue = Number(value)
      // Check if the value is a number and within the valid range
      if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= 100) {
        setUpdatedLevel(numberValue)
      } else {
        // If invalid, just don't update the state, or you could show an error
        setUpdatedLevel(null)
      }
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const numberValue = Number(value)
    const clampedValue = Math.max(0, Math.min(255, numberValue))
    const totalEv = Object.values(updatedEv).reduce(
      (sum, ev) => sum + (ev || 0),
      0,
    )
    const newTotal = totalEv - (updatedEv[name as EvNames] || 0) + clampedValue

    if (newTotal <= maxTotal) {
      setUpdatedEv((prev) => ({
        ...prev,
        [name]: clampedValue,
      }))
    }
  }

  return form.show === 'default' ? (
    <>
      <SearchBar
        currentPokemon={pokemonId}
        pokemonId={currentPokemon.id}
        onSubmit={handleSearchSubmit}
      />
      <form onSubmit={handleSubmit} className="stat-wrapper">
        <div className="pokecard">
          <div className="title">
            <h1>
              {currentPokemon.name
                ? capitalizeFirstLetter(currentPokemon.name)
                : 'Select a Pokemon!'}
            </h1>
            <div className="PokeId">
              <h2>
                #{tempId < 100 ? (tempId < 10 ? `00${99}` : `0${100}`) : 1000}
              </h2>
            </div>
          </div>
          <ul>
            <li id={currentPokemon.type1}>{currentPokemon.type1}</li>
            <li id={currentPokemon.type2}>{currentPokemon.type2}</li>
          </ul>
          <img
            id="thumbnail"
            src={`${currentPokemon.sprites?.other?.showdown?.front_default === null || undefined ? currentPokemon.sprites?.front_default : currentPokemon.sprites?.other?.showdown?.[isShiny ? 'front_shiny' : 'front_default']}`}
            alt={`${currentPokemon.name} Thumbnail`}
          ></img>
          <img
            id="pokeimage"
            src={`${currentPokemon.sprites?.other?.['official-artwork']?.[isShiny ? 'front_shiny' : 'front_default'] === null || undefined ? currentPokemon.sprites?.front_default : currentPokemon.sprites?.other?.['official-artwork']?.[isShiny ? 'front_shiny' : 'front_default']}`}
            alt={`${currentPokemon.name} Large`}
          ></img>
          <div className="about">
            <div className="navbar">
              <h2>About</h2>
              <label>
                Level:
                <input
                  type="number"
                  name="level"
                  value={updatedLevel === null ? '' : updatedLevel} // Handle null value
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1" // Optional: step value for better UX
                />
              </label>
              <label className="switch">
                Shiny:
                <input
                  type="checkbox"
                  checked={isShiny}
                  onChange={handleCheckboxChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            {/* <section>
            <Species pokeid={pokemon.id} />
            <p>Height: {pokemon.height * 10} cm</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
          </section> */}
            <Nature
              initialNature={currentPokemon.nature.name}
              onNatureSelect={async (natureName: string) => {
                const token = await getAccessTokenSilently().catch(() => {
                  console.error('Login Required')
                  return 'undefined'
                })
                pokemon.updateNature.mutate(
                  {
                    id: pokemonId.id,
                    name: natureName,
                    token: token,
                    teamId: pokemon.data.pokemonTeam,
                  },
                  mutationOptions,
                )
              }}
            />
            <Abilities
              currentPokemon={currentPokemon}
              onUpdate={async (event: React.ChangeEvent<HTMLSelectElement>) => {
                const token = await getAccessTokenSilently().catch(() => {
                  console.error('Login Required')
                  return 'undefined'
                })
                pokemon.updateAbility.mutate(
                  {
                    id: pokemonId.id,
                    name: event.target.value,
                    token: token,
                    teamId: pokemon.data.pokemonTeam,
                  },
                  mutationOptions,
                )
              }}
            />
            <AllMoves
              pokeId={currentPokemon.name}
              allMoves={
                currentPokemon.moves.length === 0
                  ? pokemonId.moves.map((move) => {
                      return {
                        id: move.id,
                        pokemonId: pokemonId.id,
                        name: '',
                        damageClass: null,
                        power: null,
                        accuracy: null,
                        pp: null,
                        type: null,
                      }
                    })
                  : currentPokemon.moves
              }
              onMoveSelect={async (moveDetails) => {
                const token = await getAccessTokenSilently().catch(() => {
                  console.error('Login Required')
                  return 'undefined'
                })
                pokemon.updateMove.mutate(
                  {
                    id: moveDetails.id,
                    name: moveDetails.name,
                    token: token,
                    teamId: pokemon.data.pokemonTeam,
                  },
                  mutationOptions,
                )
              }}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </div>
        <div className="eiv-stats">
          <h3>Effort Values (EVs)</h3>
          {[
            'hp',
            'attack',
            'defense',
            'specialAttack',
            'specialDefense',
            'speed',
          ].map((evType: string) => (
            <div key={evType} className="ev-group">
              <label className="ev-label">
                {capitalizeFirstLetter(evType)}:
                <input
                  type="number"
                  name={evType}
                  value={updatedEv[evType as EvNames] || ''}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="255"
                  className="ev-input"
                />
              </label>
              <input
                type="range"
                name={evType}
                value={updatedEv[evType as EvNames] || 0}
                onChange={handleSliderChange}
                min="0"
                max="255"
                step="1"
                className={`ev-slider ${evType}`} // Apply specific class
              />
            </div>
          ))}
        </div>
      </form>
    </>
  ) : (
    <>
      <SearchBar
        currentPokemon={pokemonId}
        pokemonId={form.selectedPokemon.id}
        onSubmit={handleSearchSubmit}
      />
      <form onSubmit={handleSubmit} className="stat-wrapper">
        <section className="stat-wrapper">
          <div className="pokecard">
            <div className="title">
              <h1>{capitalizeFirstLetter(form.selectedPokemon?.name)}</h1>
              <div className="PokeId">
                <h4>
                  #
                  {form.selectedPokemon?.id < 100
                    ? form.selectedPokemon?.id < 10
                      ? `00${form.selectedPokemon?.id}`
                      : `0${form.selectedPokemon?.id}`
                    : form.selectedPokemon?.id}
                </h4>
              </div>
            </div>
            <ul>
              <li id={form.selectedPokemon?.type1}>
                {form.selectedPokemon?.type1}
              </li>
              {form.selectedPokemon?.type2 && (
                <li id={form.selectedPokemon?.type2}>
                  {form.selectedPokemon?.type2}
                </li>
              )}
            </ul>
            <img
              id="thumbnail"
              src={`${form.selectedSprites?.other?.showdown[isShiny ? 'front_shiny' : 'front_default']}`}
              alt={`${form.selectedPokemon?.name} Thumbnail`}
            />
            <img
              id="pokeimage"
              src={`${form.selectedSprites?.other?.['official-artwork'][isShiny ? 'front_shiny' : 'front_default']}`}
              alt={`${form.selectedPokemon?.name} Large`}
            />
            <div className="about">
              <div className="navbar">
                <h2>About</h2>
                <label>
                  Level:
                  <input
                    type="number"
                    name="level"
                    value={updatedLevel || 0}
                    onChange={(e) =>
                      setUpdatedLevel(
                        Number(e.target.value) < 0
                          ? 0
                          : Number(e.target.value) > 100
                            ? 100
                            : Number(e.target.value),
                      )
                    }
                  />
                </label>
                <label className="switch">
                  Shiny:
                  <input
                    type="checkbox"
                    checked={isShiny}
                    onChange={handleCheckboxChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <Nature
                initialNature={form.selectedPokemon.nature.name || ''}
                onNatureSelect={async (natureName: string) => {
                  const token = await getAccessTokenSilently().catch(() => {
                    console.error('Login Required')
                    return 'undefined'
                  })
                  pokemon.updateNature.mutate(
                    {
                      id: pokemonId.id,
                      name: natureName,
                      token: token,
                      teamId: pokemon.data.pokemonTeam,
                    },
                    mutationOptions,
                  )
                }}
              />
              <Abilities
                currentPokemon={form.selectedPokemon}
                onUpdate={async (
                  event: React.ChangeEvent<HTMLSelectElement>,
                ) => {
                  const token = await getAccessTokenSilently().catch(() => {
                    console.error('Login Required')
                    return 'undefined'
                  })
                  pokemon.updateAbility.mutate(
                    {
                      id: pokemonId.id,
                      name: event.target.value,
                      token: token,
                      teamId: pokemon.data.pokemonTeam,
                    },
                    mutationOptions,
                  )
                }}
              />
              <AllMoves
                pokeId={form.selectedPokemon.name}
                allMoves={
                  form.selectedPokemon.moves.length === 0
                    ? pokemonId.moves.map((move) => {
                        return {
                          id: move.id,
                          pokemonId: pokemonId.id,
                          name: '',
                          damageClass: null,
                          power: null,
                          accuracy: null,
                          pp: null,
                          type: null,
                        }
                      })
                    : form.selectedPokemon.moves
                }
                onMoveSelect={async (moveDetails) => {
                  const token = await getAccessTokenSilently().catch(() => {
                    console.error('Login Required')
                    return 'undefined'
                  })
                  pokemon.updateMove.mutate(
                    {
                      id: moveDetails.id,
                      name: moveDetails.name,
                      token: token,
                      teamId: pokemon.data.pokemonTeam,
                    },
                    mutationOptions,
                  )
                }}
              />
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </div>
        </section>
        <div className="eiv-stats">
          <h3>Effort Values (EVs)</h3>
          {[
            'hp',
            'attack',
            'defense',
            'specialAttack',
            'specialDefense',
            'speed',
          ].map((evType: string) => (
            <div key={evType} className="ev-group">
              <label className="ev-label">
                {capitalizeFirstLetter(evType)}:
                <input
                  type="number"
                  name={evType}
                  value={updatedEv[evType as EvNames] || ''}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="255"
                  className="ev-input"
                />
              </label>
              <input
                type="range"
                name={evType}
                value={updatedEv[evType as EvNames] || 0}
                onChange={handleSliderChange}
                min="0"
                max="255"
                step="1"
                className={`ev-slider ${evType}`} // Apply specific class
              />
            </div>
          ))}
        </div>
      </form>
    </>
  )
}

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string) => {
  return (
    string.charAt(0).toUpperCase() +
    (string.slice(1).split(/-/g).length < 3
      ? string.slice(1).split(/-/g).join(' ')
      : string.slice(1).split(/-/g)[0])
  )
}

import { useState } from 'react'
import { usePokemonById } from '../hooks/usePokemon.ts'

interface Props {
  id: number
}

type EvNames =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

export default function PokemonDetails({ id }: Props) {
  const [isShiny, setShiny] = useState(false)
  const { data: pokemon, isPending, isError, error } = usePokemonById(id)
  const tempId = 99
  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }
  return (
    <section className="stat-wrapper">
      <div className="pokecard">
        <div className="title">
          <h1>
            {pokemon.name.charAt(0).toUpperCase() +
              (pokemon.name.slice(1).split(/-/g).length < 3
                ? pokemon.name.slice(1).split(/-/g).join(' ')
                : pokemon.name.slice(1).split(/-/g)[0])}
          </h1>
          <div className="PokeId">
            <h2>
              #{tempId < 100 ? (tempId < 10 ? `00${99}` : `0${100}`) : 1000}
            </h2>
          </div>
        </div>
        <ul>
          <li id={pokemon.type1}>{pokemon.type1}</li>
          <li id={pokemon.type2}>{pokemon.type2}</li>
        </ul>
        <img
          id="thumbnail"
          src={`${pokemon.sprites?.other?.showdown?.front_default === null || undefined ? pokemon.sprites?.front_default : pokemon.sprites?.other?.showdown?.[isShiny ? 'front_shiny' : 'front_default']}`}
          alt={`${pokemon.name} Thumbnail`}
        ></img>
        <img
          id="pokeimage"
          src={`${pokemon.sprites?.other?.['official-artwork']?.[isShiny ? 'front_shiny' : 'front_default'] === null || undefined ? pokemon.sprites?.front_default : pokemon.sprites?.other?.['official-artwork']?.[isShiny ? 'front_shiny' : 'front_default']}`}
          alt={`${pokemon.name} Large`}
        ></img>
        <div className="about">
          <div className="navbar">
            <h2>About</h2>
            <label>Level: {pokemon.level}</label>
            <label className="switch">
              Shiny:
              <input
                type="checkbox"
                checked={isShiny}
                onChange={() => setShiny((prev) => !prev)}
              />
              <span className="slider"></span>
            </label>
          </div>
          {/* <section>
            <Species pokeid={pokemon.id} />
            <p>Height: {pokemon.height * 10} cm</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
          </section> */}
          <label className="stats">
            <p>Nature:</p>
            <select value="" disabled>
              <option value="" disabled>
                {capitalizeFirstLetter(pokemon.nature.name)}
              </option>
            </select>
          </label>
          <label className="stats">
            <p>Ability:</p>
            <select value="" disabled>
              <option value="" disabled>
                {capitalizeFirstLetter(pokemon.ability.name)}
              </option>
            </select>
          </label>
          <section className="stats">
            <p>Moves:</p>
            <div className="moves">
              {pokemon.moves.map((move, index) => (
                <p key={index} id={move.type === null ? 'normal' : move.type}>
                  {move.name}
                </p>
              ))}
            </div>
          </section>
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
                value={pokemon.ev[evType as EvNames] || ''}
                placeholder="0"
                min="0"
                max="255"
                className="ev-input"
                disabled
              />
            </label>
            <input
              type="range"
              name={evType}
              value={pokemon.ev[evType as EvNames] || 0}
              min="0"
              max="255"
              step="1"
              disabled
              className={`ev-slider ${evType}`} // Apply specific class
            />
          </div>
        ))}
      </div>
    </section>
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

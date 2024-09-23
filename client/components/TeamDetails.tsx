import { Link } from 'react-router-dom'
import { usePokemonByTeam } from '../hooks/usePokemon'

interface Props {
  teamId: number
  canEdit: boolean
}

export default function TeamDetails({ teamId, canEdit }: Props) {
  const { data, isPending, isError, error } = usePokemonByTeam(teamId)
  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  return canEdit ? (
    <>
      <section className="details-display">
        {data.team.map((pokemon, i) => (
          <Link
            to={`/update/${pokemon.pokemonTeam}/${pokemon.id}`}
            key={pokemon.id}
          >
            <button id="pokemonCard">
              <p>
                {pokemon.name.charAt(0).toUpperCase() +
                  (pokemon.name.slice(1).split(/-/g).length < 3
                    ? pokemon.name.slice(1).split(/-/g).join(' ')
                    : pokemon.name.slice(1).split(/-/g)[0])}
              </p>
              <img
                src={`${pokemon.sprites?.other?.showdown?.front_default === null || undefined ? pokemon.sprites?.front_default : pokemon.sprites?.other?.showdown?.[pokemon.shiny ? 'front_shiny' : 'front_default']}`}
                alt={pokemon.name ? `${pokemon.name}${i}` : `TempName ${i}`}
                className="img-card"
              />
              <ul>
                <li id={pokemon.type1}>{pokemon.type1}</li>
                <li id={pokemon.type2}>{pokemon.type2}</li>
              </ul>
            </button>
          </Link>
        ))}
      </section>
    </>
  ) : (
    <>
      <section className="details-display">
        {data.team.map((pokemon, i) => (
          <Link
            to={`/details/${pokemon.pokemonTeam}/${pokemon.id}`}
            key={pokemon.id}
          >
            <button id="pokemonCard">
              <p>
                {pokemon.name.charAt(0).toUpperCase() +
                  (pokemon.name.slice(1).split(/-/g).length < 3
                    ? pokemon.name.slice(1).split(/-/g).join(' ')
                    : pokemon.name.slice(1).split(/-/g)[0])}
              </p>
              <img
                src={`${pokemon.sprites?.other?.showdown?.front_default === null || undefined ? pokemon.sprites?.front_default : pokemon.sprites?.other?.showdown?.[pokemon.shiny ? 'front_shiny' : 'front_default']}`}
                alt={pokemon.name ? `${pokemon.name}${i}` : `TempName ${i}`}
                className="img-card"
              />
              <ul>
                <li id={pokemon.type1}>{pokemon.type1}</li>
                <li id={pokemon.type2}>{pokemon.type2}</li>
              </ul>
            </button>
          </Link>
        ))}
      </section>
    </>
  )
}

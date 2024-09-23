import { Link } from 'react-router-dom'
import { UserProfile } from '../../models/pokemon'
import { usePokemonByTeam } from '../hooks/usePokemon'

interface Props {
  checkState: FormState
  onClose: (team: UserProfile) => void
}

type FormState = {
  selectedTeam: UserProfile
  canEdit: boolean
}
export default function TeamDislay({ checkState, onClose }: Props) {
  const { data, isPending, isError, error } = usePokemonByTeam(
    checkState.selectedTeam.id,
  )
  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  return checkState.canEdit === true ? (
    <>
      <section className="pokemon-section">
        {data.team.map((pokemon, i) => (
          <Link to={`/update/${pokemon.pokemonTeam}/${pokemon.id}`} key={i}>
            <button id="pokemonCard">
              <p>
                {pokemon.name.charAt(0).toUpperCase() +
                  (pokemon.name.slice(1).split(/-/g).length < 3
                    ? pokemon.name.slice(1).split(/-/g).join(' ')
                    : pokemon.name.slice(1).split(/-/g)[0])}
              </p>
              <img
                src={`${pokemon.sprites?.other?.showdown?.front_default === null || undefined ? pokemon.sprites?.front_default : pokemon.sprites?.other?.showdown?.[pokemon.shiny ? 'front_shiny' : 'front_default'] === '../../images/place-holder-plush.png' ? '../images/place-holder-plush.png' : pokemon.sprites?.other?.showdown?.[pokemon.shiny ? 'front_shiny' : 'front_default']}`}
                alt="pokemon sprite"
                className="img-card"
              />
              <ul>
                <li id={pokemon.type1}>{pokemon.type1}</li>
                <li id={pokemon.type2}>{pokemon.type2}</li>
              </ul>
            </button>
          </Link>
        ))}
        <div className="poke-display">
          {!(data.team.length === 0) && (
            <Link
              to={`/update/${checkState.selectedTeam.id}/${data.team[0].id}`}
            >
              <button>Edit</button>
            </Link>
          )}
          <button onClick={() => onClose(checkState.selectedTeam)}>
            Close
          </button>
        </div>
      </section>
    </>
  ) : (
    <>
      <section className="pokemon-section">
        {data.team.map((pokemon) => (
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
                src={`${pokemon.sprites?.other?.showdown?.front_default === null || undefined ? pokemon.sprites?.front_default : pokemon.sprites?.other?.showdown?.[pokemon.shiny ? 'front_shiny' : 'front_default'] === '../../images/place-holder-plush.png' ? '../images/place-holder-plush.png' : pokemon.sprites?.other?.showdown?.[pokemon.shiny ? 'front_shiny' : 'front_default']}`}
                alt="pokemon sprite"
                className="img-card"
              />
              <ul>
                <li id={pokemon.type1}>{pokemon.type1}</li>
                <li id={pokemon.type2}>{pokemon.type2}</li>
              </ul>
            </button>
          </Link>
        ))}
        <div className="poke-display">
          <button onClick={() => onClose(checkState.selectedTeam)}>
            Close
          </button>
        </div>
      </section>
    </>
  )
}

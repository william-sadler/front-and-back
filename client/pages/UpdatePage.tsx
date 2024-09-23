import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { usePokemonById } from '../hooks/usePokemon.ts'
import TeamDetails from '../components/TeamDetails.tsx'
import PokemonUpdateForm from '../components/PokemonUpdateForm.tsx'
import { useQueryClient } from '@tanstack/react-query'

export default function UpdatePage() {
  const navigate = useNavigate()
  const param = useParams()
  const id = Number(param.id)
  const teamId = Number(param.teamId)
  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const pokemon = usePokemonById(id)

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Unknown error')
    }
  }

  const handleUpdate = async () => {
    try {
      queryClient.invalidateQueries()
    } catch (error) {
      handleError(error)
    }
  }

  const hideError = () => {
    setError('')
  }

  if (pokemon.isPending || !pokemon.data) {
    let failures = ''
    if (pokemon.failureCount > 0) {
      failures = ` (failed ${pokemon.failureCount} times)`
    }
    if (pokemon.failureCount > 3) {
      navigate('/teams')
    }
    return <div>Loading... {failures}</div>
  }

  let fetchStatus = ''
  if (pokemon.updatePokemon.isPending) fetchStatus = 'Updating...'
  if (pokemon.isRefetching) fetchStatus = 'Refreshing...'

  if (pokemon.error instanceof Error) {
    return <div>Failed to load pokemon: {pokemon.error.message}</div>
  }

  return (
    <>
      {error !== '' && <button onClick={hideError}>Error: {error}</button>}
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <Link to="/teams">
        <button>Close</button>
      </Link>
      <TeamDetails teamId={teamId} canEdit={true} />
      {pokemon.isSuccess && pokemon.data !== undefined && (
        <PokemonUpdateForm
          key={pokemon.data.id}
          pokemonId={pokemon.data}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}

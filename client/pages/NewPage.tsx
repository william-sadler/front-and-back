import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTeamByName } from '../apis/pokemon'
import { useAuth0 } from '@auth0/auth0-react'
import { useAllTeams } from '../hooks/usePokemon'

export default function NewPage() {
  const navigate = useNavigate()
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0()
  const [userName, setUserName] = useState('')

  const handleMutationSuccess = () => {
    navigate('/teams')
  }
  const { data, isPending, isError, error } = useAllTeams()

  let fetchStatus = ''
  if (isPending) fetchStatus = 'Adding...'

  if (isError) {
    return <p>Failed to load teams: {error.message}</p>
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    const tokenId = await getIdTokenClaims()
    if (data?.find((team) => team.userToken === tokenId?.sub)) {
      navigate('/teams')
      console.error('Team already added')
      return 'Team already added'
    }
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })
    await addTeamByName({ id: 1, userName: userName, token: token })
      .then(() => handleMutationSuccess())
      .catch((err) => console.error(err))
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value)
  }
  return (
    <>
      {fetchStatus !== '' && <div>{fetchStatus}</div>}
      <h1>Your Profile Name: </h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="description" className="label">
            User Name:{' '}
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="User Name"
            value={userName}
            onChange={handleChange}
            className="shortend"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

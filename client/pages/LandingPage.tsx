import { useAuth0 } from '@auth0/auth0-react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const { user, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  const handleSignIn = () => {
    loginWithRedirect()
    navigate('/teams')
  }

  const handleStart = () => {
    navigate('/teams')
  }

  return (
    <section className="landing-page">
      <h1>Pokemon Team Builder!</h1>
      <IfAuthenticated>
        <button onClick={handleStart}>Start!</button>
        {user && <p>Signed in as: {user?.name}</p>}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleSignIn}>Login</button>
      </IfNotAuthenticated>
    </section>
  )
}

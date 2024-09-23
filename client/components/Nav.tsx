import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    !(`${window.location.origin}/` === window.location.href) && (
      <>
        <nav>
          <IfAuthenticated>
            <button onClick={handleSignOut}>Log Out</button>
            {user && <p>Signed in as: {user?.name}</p>}
          </IfAuthenticated>
          <IfNotAuthenticated>
            <button onClick={handleSignIn}>Login</button>
          </IfNotAuthenticated>
        </nav>
      </>
    )
  )
}

export default Nav

import { Link } from 'react-router-dom'
import { UserProfile } from '../../models/pokemon'
import { useAllTeams } from '../hooks/usePokemon'

interface Props {
  onSelect: (team: UserProfile) => void
  onDelete: (teamId: number) => void
  checkState: FormState
}

type FormState =
  | {
      selectedTeam: UserProfile
      show: 'selected'
      canEdit: boolean
      token: string
    }
  | {
      selectedTeam: null
      show: 'add' | 'none'
      token: string
    }

export default function TabList({ onSelect, onDelete, checkState }: Props) {
  const { data, isPending, isError, error } = useAllTeams()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  return (
    <>
      <section className="team-section">
        <div
          className={`team-card`} // Conditionally add the class
        >
          {checkState?.show === 'add' && (
            <Link to="/add">
              <button className="delete-button">Create Your Team</button>
            </Link>
          )}
        </div>
        {data.map((team) => {
          return (
            <div
              key={team.id}
              className={`team-card`} // Conditionally add the class
            >
              <button onClick={() => onSelect(team)} className="main-card">
                <h2>{team.userName}</h2>
                <p>
                  Wins: {team.wins === 0 ? 'Just Getting Started!' : team.wins}
                </p>
                <ul>
                  {team.badges.map((badge, indx) => (
                    <li key={indx}>
                      <img
                        src={badge.badgeSprite}
                        alt=""
                        className="badge-img"
                      />
                      {badge.name}
                    </li>
                  ))}
                </ul>
              </button>
              {checkState?.show === 'selected' &&
                team.userToken === checkState.token &&
                checkState.selectedTeam.id === team.id && (
                  <button
                    onClick={() => onDelete(team.id)}
                    className="delete-button"
                  >
                    Delete My Team
                  </button>
                )}
            </div>
          )
        })}
      </section>
    </>
  )
}

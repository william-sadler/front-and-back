import { Link, useParams } from 'react-router-dom'
import PokemonDetails from '../components/PokemonDetails.tsx'
import TeamDetails from '../components/TeamDetails.tsx'

export default function DetailsPage() {
  const param = useParams()
  const id = Number(param.id)
  const teamId = Number(param.teamId)
  return (
    <>
      <Link to="/teams">
        <button>Close</button>
      </Link>
      <TeamDetails teamId={teamId} canEdit={false} />
      <PokemonDetails id={id} />
    </>
  )
}

import { useState, useEffect } from 'react'
import { UserProfile } from '../../models/pokemon'
import TabList from '../components/TabList'
import TeamDisplay from '../components/TeamDisplay'
import { deleteMyTeamById } from '../apis/pokemon'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { useAllTeams } from '../hooks/usePokemon'

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

export default function TeamPage() {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0()
  const [form, setForm] = useState<FormState>({
    selectedTeam: null,
    show: 'add',
    token: '',
  })
  const { data: teams } = useAllTeams()
  const queryClient = useQueryClient()

  useEffect(() => {
    const checkUserToken = async () => {
      const tokenid = await getIdTokenClaims()
      if (tokenid?.sub) {
        if (teams?.find((team) => team.userToken === tokenid?.sub)) {
          setForm({
            selectedTeam: null,
            show: 'none',
            token: tokenid.sub,
          })
        } else {
          setForm({
            selectedTeam: null,
            show: 'add',
            token: tokenid?.sub,
          })
        }
      }
    }

    checkUserToken()
  }, [getIdTokenClaims, teams])

  const handleSelectTeam = async (team: UserProfile) => {
    const tokenid = await getIdTokenClaims()
    setForm({
      canEdit: team.userToken === tokenid?.sub ? true : false,
      show: 'selected',
      selectedTeam: team,
      token: tokenid?.sub,
    })
  }

  const handleClose = async (team: UserProfile) => {
    const tokenid = await getIdTokenClaims()
    setForm({
      selectedTeam: null,
      show: team.userToken === tokenid?.sub ? 'none' : 'add',
      token: tokenid?.sub,
    })
  }

  const handleDelete = async (teamId: number) => {
    const token = await getAccessTokenSilently().catch(() => {
      console.error('Login Required')
      return 'undefined'
    })

    await deleteMyTeamById({ id: teamId, userName: '', token: token })
    queryClient.invalidateQueries()
    setForm({
      selectedTeam: null,
      show: 'add',
      token: form.token,
    })
  }

  return (
    <>
      <header className="header">
        <h1>My Team</h1>
      </header>
      <section className="team-wrapper">
        <TabList
          onDelete={handleDelete}
          onSelect={handleSelectTeam}
          checkState={form}
        />
        {form.show === 'selected' && (
          <TeamDisplay onClose={handleClose} checkState={form} />
        )}
      </section>
    </>
  )
}

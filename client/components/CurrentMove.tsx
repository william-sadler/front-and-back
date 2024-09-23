import { useState } from 'react'
import { Moves } from '../../models/pokemon'
import { useAllMoveNames } from '../hooks/usePokemon'
import { NewMove } from '../../models/pokeAPI'

interface Props {
  pokeId: string
  currentMove: Moves
  onUpdate: (moveDetails: Moves) => void
}

export default function CurrentMove({ currentMove, pokeId, onUpdate }: Props) {
  const [selectedMove, setSelectedMove] = useState<string>(currentMove.name)
  const {
    data: moveNames = [],
    isPending,
    isError,
    error,
  } = useAllMoveNames(pokeId || '1')

  if (!pokeId) {
    return (
      <>
        <select id="moveSelect" value={selectedMove} disabled>
          <option value="" disabled>
            Select a Move
          </option>
        </select>
      </>
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMoveName = event.target.value
    setSelectedMove(newMoveName)
    onUpdate({
      id: currentMove.id,
      pokemonId: currentMove.pokemonId,
      name: newMoveName,
      damageClass: null,
      power: null,
      accuracy: null,
      pp: null,
      type: null,
    })
  }

  if (isPending) {
    return (
      <>
        <select id="moveSelect" value={selectedMove} onChange={handleChange}>
          <option value="" disabled>
            Select a Move
          </option>
          <option>Loading...</option>
        </select>
      </>
    )
  }

  if (isError) {
    return <span>Error fetching move names: {error?.message}</span>
  }

  const getMoveTag = (move: NewMove) => {
    const lastVersionGroupDetail =
      move.version_group_details?.[move.version_group_details.length - 1]
    const learnMethod = lastVersionGroupDetail?.move_learn_method.name
    if (learnMethod === 'machine') {
      return '(TM)'
    }
    if (learnMethod === 'tutor') {
      return '(HM)'
    }
    return ''
  }

  const sortedMoves = moveNames.reduce(
    (acc, move) => {
      const moveTag = getMoveTag(move)
      if (moveTag) {
        acc.tms.push({ ...move, tag: moveTag })
      } else {
        acc.regular.push(move)
      }
      return acc
    },
    { regular: [], tms: [] } as { regular: NewMove[]; tms: NewMove[] },
  )

  return (
    <>
      <select id="moveSelect" value={selectedMove} onChange={handleChange}>
        <option value="" disabled>
          Select a Move
        </option>
        {sortedMoves.regular.map((move) => (
          <option key={move.move.name} value={move.move.name}>
            {move.move.name.charAt(0).toUpperCase() +
              move.move.name.slice(1).split(/-/g).join(' ')}{' '}
            {getMoveTag(move)}
          </option>
        ))}
        {sortedMoves.tms.map((move) => (
          <option key={move.move.name} value={move.move.name}>
            {move.move.name.charAt(0).toUpperCase() +
              move.move.name.slice(1).split(/-/g).join(' ')}{' '}
            {getMoveTag(move)}
          </option>
        ))}
      </select>
    </>
  )
}

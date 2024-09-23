import { Moves } from '../../models/pokemon'
import CurrentMove from './CurrentMove'

interface Props {
  pokeId: string
  allMoves: Moves[]
  onMoveSelect: (moveDetails: Moves) => void
}

export default function AllMoves({ allMoves, pokeId, onMoveSelect }: Props) {
  return (
    <label htmlFor="moveSelect" className="stats">
      <p>Moves:</p>
      <div className="moves">
        {allMoves.map((move, index) => (
          <CurrentMove
            key={index}
            pokeId={pokeId}
            currentMove={move}
            onUpdate={onMoveSelect}
          />
        ))}
      </div>
    </label>
  )
}

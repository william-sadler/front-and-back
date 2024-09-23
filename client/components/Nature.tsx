import { useState } from 'react'
import { useAllNatureNames } from '../hooks/usePokemon'

interface Props {
  onNatureSelect: (natureName: string) => void
  initialNature?: string // Optional prop for the initial nature
}

export default function Natures({ onNatureSelect, initialNature }: Props) {
  const [selectedNature, setSelectedNature] = useState<string>(
    initialNature || '',
  )

  // Fetch all nature names
  const {
    data: natureNames = [],
    isPending: namesPending,
    isError: namesError,
    error: namesFetchError,
  } = useAllNatureNames()

  if (namesPending) {
    return (
      <label className="stats">
        <p>Nature:</p>
        <select value={selectedNature} disabled>
          <option>Loading...</option>
        </select>
      </label>
    )
  }

  if (namesError) {
    return <span>Error fetching nature names: {namesFetchError?.message}</span>
  }

  // Handle dropdown change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const natureName = event.target.value
    setSelectedNature(natureName)
    onNatureSelect(natureName)
  }

  return (
    <label className="stats">
      <p>Nature:</p>
      <select value={selectedNature} onChange={handleChange}>
        <option value="" disabled>
          Select a Nature
        </option>
        {natureNames.map((nature) => (
          <option key={nature.name} value={nature.name}>
            {nature.name.charAt(0).toUpperCase() +
              nature.name.slice(1).split(/-/g).join(' ')}
          </option>
        ))}
      </select>
    </label>
  )
}

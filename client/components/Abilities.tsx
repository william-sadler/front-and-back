import { useState } from 'react'
import { Pokemon } from '../../models/pokemon'
import { useAllAbilityNames } from '../hooks/usePokemon'

interface Props {
  currentPokemon: Pokemon
  onUpdate: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Abilities({ currentPokemon, onUpdate }: Props) {
  const [selectedAbility, setSelectedAbility] = useState<string>(
    currentPokemon.ability.name,
  )

  const {
    data: abilityNames = [],
    isPending: namesPending,
    isError: namesError,
    error: namesFetchError,
  } = useAllAbilityNames(currentPokemon.name || '1')

  if (!currentPokemon.name) {
    return (
      <label className="stats">
        <p>Ability:</p>
        <select value={selectedAbility} disabled></select>
      </label>
    )
  }

  if (namesPending)
    return (
      <label className="stats">
        <p>Ability:</p>
        <select value={selectedAbility} disabled>
          {abilityNames.map((ability) => (
            <option key={ability.ability.name} value={ability.ability.name}>
              Loading...
            </option>
          ))}
        </select>
      </label>
    )
  if (namesError) {
    return <span>Error fetching nature names: {namesFetchError.message}</span>
  }

  // Handle dropdown change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAbility(event.target.value)
    onUpdate(event)
  }

  return (
    <label className="stats">
      <p>Ability:</p>
      <select value={selectedAbility} onChange={handleChange}>
        <option value="" disabled>
          Select a Ability
        </option>
        {abilityNames.map((ability) => (
          <option key={ability.ability.name} value={ability.ability.name}>
            {ability.ability.name.charAt(0).toUpperCase() +
              ability.ability.name.slice(1).split(/-/g).join(' ')}
          </option>
        ))}
      </select>
    </label>
  )
}

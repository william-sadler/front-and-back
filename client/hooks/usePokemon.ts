import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import * as API from '../apis/pokemon'

export function usePokemonByTeam(teamId: number) {
  const query = useQuery({
    queryKey: ['pokemons', teamId],
    queryFn: () => API.getPokemonByTeam(teamId),
  })
  return query
}

export function usePokemonById(id: number) {
  const query = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => API.getPokemonById(id),
  })
  return {
    ...query,
    updatePokemon: useUpdatePokemon(),
    updateSubmit: useUpdateSubmit(),
    updateNature: useUpdateNature(),
    updateAbility: useUpdateAbility(),
    updateMove: useUpdateMoves(),
    updateSprites: useUpdateSprites(),
    // delete: useDeletePokemon(),
  }
}
export function usePokemonDataById(id: number) {
  const query = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => API.getPokemonDataById(id),
  })
  return {
    ...query,
  }
}

export function useAllTeams() {
  const query = useQuery({
    queryKey: ['teams'],
    queryFn: () => API.getAllTeams(),
  })
  return query
}
export function useAllPokemonNames() {
  const query = useQuery({
    queryKey: ['names'],
    queryFn: () => API.fetchAllPokemonNames(),
  })
  return {
    ...query,
  }
}

export function usePokemonByName(name: string) {
  const query = useQuery({
    queryKey: ['name', name],
    queryFn: () =>
      API.fetchPokemonByName(
        typeof name === 'undefined' ? '1' : name.toLocaleLowerCase(),
      ),
  })
  return {
    ...query,
  }
}

export function useAllAbilityNames(name: string) {
  const query = useQuery({
    queryKey: ['abilities', name],
    queryFn: () => API.fetchAllAbilityNames(name),
  })
  return {
    ...query,
  }
}

export function useAllNatureNames() {
  const query = useQuery({
    queryKey: ['natures'],
    queryFn: () => API.fetchAllNatureNames(),
  })
  return {
    ...query,
  }
}

export function useAllMoveNames(name: string) {
  const query = useQuery({
    queryKey: ['moves', name],
    queryFn: () =>
      API.fetchAllMovesNames(
        name === 'undefined' ? '1' : name.toLocaleLowerCase(),
      ),
  })
  return {
    ...query,
  }
}

export function useMoveByName(name: string) {
  const query = useQuery({
    queryKey: ['moves', name],
    queryFn: () =>
      API.fetchMoveByName(
        name === 'undefined' ? '1' : name.toLocaleLowerCase(),
      ),
  })
  return {
    ...query,
  }
}

export function useNatureByName(name: string) {
  const query = useQuery({
    queryKey: ['nature', name],
    queryFn: () =>
      API.fetchNatureByName(
        typeof name === 'undefined' ? 'hardy' : name.toLocaleLowerCase(),
      ),
  })
  return {
    ...query,
  }
}

export function usePokemonMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'pokemons',
          'pokemon',
          'names',
          'name',
          'teams',
          'team',
          'abilities',
          'natures',
          'nature',
          'moves',
          'move',
          'ability',
          'effort',
          'sprites',
          'sprite',
        ],
      })
    },
  })

  return mutation
}

// Update Mutation Hooks
export function useUpdatePokemon() {
  return usePokemonMutation(API.updatePokemonById)
}

export function useUpdateSubmit() {
  return usePokemonMutation(API.updateSubmitById)
}

export function useUpdateAbility() {
  return usePokemonMutation(API.updateAbilityById)
}

export function useUpdateNature() {
  return usePokemonMutation(API.updateNatureById)
}

export function useUpdateMoves() {
  return usePokemonMutation(API.updateMovesById)
}

export function useUpdateSprites() {
  return usePokemonMutation(API.updateSpritesById)
}

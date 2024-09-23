import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/db.ts'
import { Pokemon } from '../../models/pokemon.ts'

const router = Router()
export default router

// GET '/api/v1/pokemon/:teamId'
router.get('/:teamId', async (req, res) => {
  try {
    const teamId = Number(req.params.teamId)
    const pokemon = await db.getMyPokemon(teamId)
    res.json({ team: pokemon })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET '/api/v1/pokemon/details/:id'
router.get('/details/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const pokemon = await db.getMyPokemonById(id)
    if (!pokemon) {
      res.status(404).json({ status: 'No Such Pokemon Exists' })
    }
    res.json(pokemon)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET '/api/v1/pokemon/data/:id'
router.get('/data/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const pokemon = await db.getMyPokemonDataById(id)
    if (!pokemon) {
      res.status(404).json({ status: 'No Such Pokemon Exists' })
    }
    res.json(pokemon)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// --------------------------- //
//                             //
//    AUTHENTICATION CHECK!    //
//                             //
// --------------------------- //

// PATCH '/api/v1/pokemon/update/:id'
router.patch('/update/:teamId/:id', checkJwt, async (req: JwtRequest, res) => {
  const data = req.body
  const auth0Id = req.auth?.sub
  const id = Number(req.params.id)
  const teamId = Number(req.params.teamId)

  if (!data || !id || !teamId) {
    console.error('No Pokemon')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(teamId, auth0Id)
    await db.updatePokemonById(id, data)
    res.status(200).json({ message: 'Pokemon partially updated successfully!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// PUT '/api/v1/pokemon/update/effort/:id'
router.put(
  '/update/effort/:teamId/:id',
  checkJwt,
  async (req: JwtRequest, res) => {
    const data = req.body
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)
    const teamId = Number(req.params.teamId)

    if (!data || !id || !teamId) {
      console.error('No Effort')
      return res.status(400).send('Bad request')
    }

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }

    try {
      await db.userCanEdit(teamId, auth0Id)
      await db.updateEffortById(id, data)
      res.status(200).json({ message: 'Effort values updated successfully!' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

// PUT '/api/v1/pokemon/update/ability/:id'
router.put(
  '/update/ability/:teamId/:id',
  checkJwt,
  async (req: JwtRequest, res) => {
    const data = req.body
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)
    const teamId = Number(req.params.teamId)

    if (!data || !id || !teamId) {
      console.error('No Effort')
      return res.status(400).send('Bad request')
    }

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    try {
      await db.userCanEdit(teamId, auth0Id)
      await db.updateAbilityById(id, data)
      res.json({ message: 'Ability updated successfully!' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

// PUT '/api/v1/pokemon/update/nature/:id'
router.put(
  '/update/nature/:teamId/:id',
  checkJwt,
  async (req: JwtRequest, res) => {
    const data = req.body
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)
    const teamId = Number(req.params.teamId)

    if (!data || !id || !teamId) {
      console.error('No Effort')
      return res.status(400).send('Bad request')
    }

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    try {
      await db.userCanEdit(teamId, auth0Id)
      await db.updateNatureById(id, data)
      res.json({ message: 'Nature updated successfully!' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

// PUT '/api/v1/pokemon/update/moves/:id'
router.put(
  '/update/moves/:teamId/:id',
  checkJwt,
  async (req: JwtRequest, res) => {
    const data = req.body
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)
    const teamId = Number(req.params.teamId)

    if (!data || !id || !teamId) {
      console.error('No Effort')
      return res.status(400).send('Bad request')
    }

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    try {
      await db.userCanEdit(teamId, auth0Id)
      await db.updateMovesById(id, data)
      res.json({ message: 'Moves updated successfully!' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

// PUT '/api/v1/pokemon/update/sprites/:id'
router.put(
  '/update/sprites/:teamId/:id',
  checkJwt,
  async (req: JwtRequest, res) => {
    const { sprites }: Pokemon = req.body
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)
    const teamId = Number(req.params.teamId)

    if (!sprites || !id || !teamId) {
      console.error('No Sprites')
      return res.status(400).send('Bad request')
    }

    if (!auth0Id || auth0Id === 'undefined') {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    try {
      await db.userCanEdit(teamId, auth0Id)
      // Update the main sprites data
      const spriteData = {
        front_default: sprites?.front_default,
        front_shiny: sprites?.front_shiny,
        back_default: sprites?.back_default,
        back_shiny: sprites?.back_shiny,
      }
      await db.updateSpritesById(id, spriteData)

      // Update the official artwork data
      if (sprites?.other && sprites.other['official-artwork']) {
        const officialData = {
          front_default: sprites.other['official-artwork'].front_default,
          front_shiny: sprites.other['official-artwork'].front_shiny,
        }
        await db.updateOfficialById(id, officialData)
      }

      // Update the showdown sprites data
      if (sprites?.other && sprites.other.showdown) {
        const showdownData = {
          front_default: sprites.other.showdown.front_default,
          front_shiny: sprites.other.showdown.front_shiny,
          back_default: sprites.other.showdown.back_default,
          back_shiny: sprites.other.showdown.back_shiny,
        }
        await db.updateShowdownById(id, showdownData)
      }

      res.status(201).json({
        message:
          'Sprites, official artwork, and showdown sprites updated successfully!',
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

// POST '/api/v1/pokemon/team'
router.post('/team', checkJwt, async (req: JwtRequest, res) => {
  const { userName } = req.body
  const auth0Id = req.auth?.sub

  if (!userName) {
    console.error('No fruit')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    await db.AddMyTeam(userName, auth0Id)
    res.status(201).json({ message: 'Team added successfully!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// DELETE '/api/v1/pokemon/:teamId'
router.delete('/team/:teamId', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const teamId = Number(req.params.teamId)
  if (!teamId) {
    console.error('No Team')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id || auth0Id === 'undefined') {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  try {
    await db.userCanEdit(teamId, auth0Id)
    await db.deleteMyTeam(teamId)
    res.status(201).json({ message: 'Pokemon deleted successfully!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

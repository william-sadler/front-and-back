import { Router } from 'express'

import * as db from '../db/db.ts'

const router = Router()
export default router

// GET '/api/v1/users'
router.get('/', async (req, res) => {
  try {
    const teams = await db.getAllTeams()
    res.json(teams)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

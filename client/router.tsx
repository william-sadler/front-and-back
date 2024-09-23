/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import TeamPage from './pages/TeamPage'
import DetailsPage from './pages/DetailsPage'
import UpdatePage from './pages/UpdatePage'
import NewPage from './pages/NewPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="/teams" element={<TeamPage />} />
      <Route path="/details/:teamId/:id" element={<DetailsPage />} />
      <Route path="/update/:teamId/:id" element={<UpdatePage />} />
      <Route path="/add" element={<NewPage />} />
    </Route>,
  ),
)

export default router

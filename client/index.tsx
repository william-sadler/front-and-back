import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'

import router from './router.tsx'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('layout') as HTMLElement).render(
    <Auth0Provider
      domain="kotare-2024-william.au.auth0.com"
      clientId="38WjWPmirhM0VHrpoyBAl3I6UxLzY5Fu"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/teams`,
        audience: 'https://teambuilder/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})

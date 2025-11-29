import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { router } from './Routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import AuthProvider from './providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router} />
        <Toaster />
        </div>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)

import React from 'react'
import './app.scss'
import { Approuter } from './router/Approuter.jsx'
import { AuthProvider } from './auth/auth.context.jsx'
import { RouterProvider } from 'react-router'
import { NotesProvider } from './notes/notes.context.jsx'


const App = () => {
  return (
     <AuthProvider>
      <NotesProvider>
        <RouterProvider router={Approuter}/>
      </NotesProvider>
      </AuthProvider>
  )
}

export default App
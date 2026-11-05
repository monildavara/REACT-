
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/Auth'
import {login, logout} from './Store/authSlice'
import { Footer, Heder } from './Components/Index'
import {Outlet} from 'react-router-dom'


function App() {  
  const [loding , setLoding] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoding(false))
  }, [])

  return !loding ? (
    <div className='min-h-screen flex flew-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Heder />
        <main>
        Todo :  <Outlet />
        </main>
        <Footer />
        
      </div>
    </div>
  ) : (null)
}

export default App

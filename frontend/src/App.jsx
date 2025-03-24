import { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { UserContextProvider } from './context/UserContext';
import {Toaster} from 'react-hot-toast';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';



function App() {
  const [baseURL, setBaseURL] = useState('https://authenticator-app-5mss.onrender.com/');

  return (
    <UserContextProvider baseURI={baseURL}>
      <div className='app-container'>
      <Header/>
      <Toaster position='bottom-right' toastOptions={
        {
          duration: 4000, 
          style: {
            backgroundColor: 'rgb(20, 20, 20)',
            boxShadow: '0px 0px 8px 8px var(--color-2)',
            padding: '20px',
            color: 'var(--color-3)',
          },
        }
    }></Toaster>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register baseURI={baseURL}/>}/>
        <Route path='/login' element={<Login baseURI={baseURL}/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
      </div>
    </UserContextProvider>
  )
}

export default App

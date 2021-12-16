import { useState } from 'react';
import { Route } from "wouter";
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Data from './Data/data'
import axios from 'axios';

const API = process.env.REACT_APP_API;

function App() {
  const [projectList, setProjectList] = useState(Data.projectList)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const saveToken = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
  }

  const getUser = (token) => {
    axios.get(`${API}/auth/${token}`)
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((e) => {
        setUser(null)
        setToken(null)
        setLoading(false)
      })
  }

  const logOut = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  useState(() => {
    // check if jwt token exist in localstorage
    let token = localStorage.getItem("token")
    if (!token) setLoading(false)
    setToken(token)
    getUser(token)
  }, [])

  return (
    <div className="App">
      {
        loading 
        ?
        <>
          <h1>Loading</h1>
        </>
        :
        (
          token 
          ?
          <>
            <Navbar
              logOut={logOut}
              />
            <h1>FYP Selection Platform</h1>
            <Route path="/admin">
              <Admin></Admin>
            </Route>
            <Route path="/">
              <Home
                token={token}
                />
            </Route>
          </>
          :
          <Login
            saveToken={saveToken}
            />
        )
      }
    </div>
  );
}

export default App;

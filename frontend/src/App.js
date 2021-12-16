import { useState } from 'react';
import { Route } from "wouter";
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Data from './Data/data'

function App() {
  const [projectList, setProjectList] = useState(Data.projectList)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  const saveToken = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
  }

  useState(() => {
    // check if jwt token exist in localstorage
    let token = localStorage.getItem("token")
    if (token) {
      setToken(token)
    }
    setLoading(false)
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
            <Navbar></Navbar>
            <h1>FYP Selection Platform</h1>
            <Route path="/admin">
              <Admin></Admin>
            </Route>
            <Route path="/">
              <Home></Home>
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

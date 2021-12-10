import { useState } from 'react';
import { Link, Route } from "wouter";
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Data from './Data/data'

function App() {
  const [projectList, setProjectList] = useState(Data.projectList)

  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>FYP Selection Platform</h1>
      <Route path="/admin">
        <Admin></Admin>
      </Route>
      <Route path="/">
        <Home></Home>
      </Route>
    </div>
  );
}

export default App;

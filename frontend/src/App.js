import { useState } from 'react';
import './App.css';
import ProjectList from './Components/ProjectList'
import GlobalContext from './GlobalContext';
import Data from './data'

function App() {
  const [state, setState] = useState({
    projectList: Data.projectList
  })

  return (
    <div className="App">
      <GlobalContext.Provider value={{
        ...state,
        setState
      }}>
        <ProjectList/>
        <span className="material-icons md-18">face</span>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
